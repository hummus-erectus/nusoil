/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, FormCard, Text } from '@/components/ui';
import colors from '@/components/ui/colors';
import { useNotifications } from '@/features/notifications/notifications-context';
import { useUserStore } from '@/stores/user-store';

const MINIMUM_LOADING_TIME = 2000; // 2 seconds

const UpgradeScreen = () => {
  const { setSubscriptionPlan, subscriptionPlan } = useUserStore();
  const isNavigatingRef = useRef(false);
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const loadingStartTimeRef = useRef(0);
  const { addNotification } = useNotifications();

  const handlePlanChange = useCallback(
    (newPlan: 'Seed' | 'Mature' | 'Harvest') => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;
      loadingStartTimeRef.current = Date.now();

      // Start fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setIsChangingPlan(true);
        setSubscriptionPlan(newPlan);

        // Calculate remaining time to meet minimum loading duration
        const elapsedTime = Date.now() - loadingStartTimeRef.current;
        const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

        // Navigate after minimum loading time
        setTimeout(() => {
          requestAnimationFrame(() => {
            router.dismissAll();
            router.push('/');
          });
        }, remainingTime);

        addNotification({
          title: 'Subscription Updated',
          message:
            newPlan === 'Seed'
              ? 'You have reverted to the Seed plan. Basic features are now active.'
              : newPlan === 'Mature'
                ? "Congratulations! You've upgraded to the Mature plan with advanced features."
                : "You've upgraded to the Harvest plan - unlock the full potential of your soil analysis!",
          type: 'success',
          read: false,
          action: {
            label: 'View subscription details',
            onPress: () => {
              router.push('/settings');
            },
          },
        });
      });
    },
    [addNotification, fadeAnim, setSubscriptionPlan]
  );

  // If we're changing plan, render a loading state with spinner
  if (isChangingPlan) {
    return (
      <View className="flex-1 items-center justify-center">
        <View className="items-center gap-4">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="font-poppins text-base text-neutral-600">
            Updating your plan...
          </Text>
        </View>
      </View>
    );
  }

  const getTitle = () => {
    switch (subscriptionPlan) {
      case 'Seed':
        return 'Upgrade';
      case 'Mature':
        return 'Change Plan';
      case 'Harvest':
        return 'Change Plan';
      default:
        return 'Select Plan';
    }
  };

  const getDescription = () => {
    switch (subscriptionPlan) {
      case 'Seed':
        return 'Would you like to Upgrade to the Mature or Harvesting Plan?';
      case 'Mature':
        return 'Would you like to upgrade to Harvesting or downgrade to Seed?';
      case 'Harvest':
        return 'Would you like to downgrade to the Mature or Seed Plan?';
      default:
        return 'Select your preferred plan:';
    }
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Animated.View
        className="flex-1 justify-center p-6"
        style={{ opacity: fadeAnim }}
      >
        <FormCard>
          <View className="my-8 gap-10">
            <Text className="text-center font-lora text-4xl text-primary">
              {getTitle()}
            </Text>
            <Text className="font-poppins text-center text-base text-neutral-600">
              {getDescription()}
            </Text>
            <View className="items-center gap-6">
              {subscriptionPlan !== 'Mature' && (
                <>
                  <Button
                    variant={
                      subscriptionPlan === 'Harvest' ? 'secondary' : 'default'
                    }
                    onPress={() => handlePlanChange('Mature')}
                    label="Mature Plan"
                    className="w-52"
                  />
                  {subscriptionPlan !== 'Harvest' && (
                    <Text className="font-poppins my-2 text-center text-base text-neutral-500">
                      OR
                    </Text>
                  )}
                </>
              )}

              {subscriptionPlan !== 'Harvest' && (
                <Button
                  variant="default"
                  onPress={() => handlePlanChange('Harvest')}
                  label="Harvesting Plan"
                  className="w-52"
                />
              )}

              {subscriptionPlan !== 'Seed' && (
                <>
                  {(subscriptionPlan === 'Harvest' ||
                    subscriptionPlan === 'Mature') && (
                    <Text className="font-poppins my-2 text-center text-base text-neutral-500">
                      OR
                    </Text>
                  )}
                  <Button
                    variant="secondary"
                    onPress={() => handlePlanChange('Seed')}
                    label="Seed Plan"
                    className="w-52"
                  />
                </>
              )}
            </View>
          </View>
        </FormCard>
      </Animated.View>
    </KeyboardAwareScrollView>
  );
};

export default UpgradeScreen;
