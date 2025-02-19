/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, PlanCard, Text } from '@/components/ui';
import colors from '@/components/ui/colors';
import {
  ArrowLeftFull,
  NutrientPortfolio,
  Shop,
  Wallet,
} from '@/components/ui/icons';
import { useNotifications } from '@/features/notifications/notifications-context';
import { useUserStore } from '@/stores/user-store';

const MINIMUM_LOADING_TIME = 2000; // 2 seconds

export default function UpgradeScreen() {
  const { subscriptionPlan, setSubscriptionPlan } = useUserStore();
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePlanChange = useCallback(
    async (newPlan: string) => {
      try {
        setIsLoading(true);
        // Start fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }).start(() => {
          setSubscriptionPlan(newPlan as 'Seed' | 'Mature' | 'Harvest');

          // Calculate remaining time to meet minimum loading duration
          const elapsedTime = Date.now() - Date.now();
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
      } catch (error) {
        addNotification({
          title: 'Error',
          message: 'Failed to change plan. Please try again.',
          type: 'error',
          read: false,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addNotification, fadeAnim, setSubscriptionPlan]
  );

  const handleBack = () => {
    router.back();
  };

  return (
    <KeyboardAwareScrollView
      className="bg-background"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <View className="items-center gap-4">
            <ActivityIndicator size="large" color={colors.primary} />
            <Text className="font-poppins text-neutral-600">
              Updating your plan...
            </Text>
          </View>
        </View>
      ) : (
        <Animated.View
          className="justify-center gap-6 p-6"
          style={{ opacity: fadeAnim }}
        >
          <View className="-ml-10 mt-6 self-start">
            <Button
              variant="ghost"
              onPress={handleBack}
              fullWidth={false}
              label={
                <View className="flex-row items-center justify-center">
                  <ArrowLeftFull color={colors.neutral[600]} />
                  <Text className="ml-4 text-neutral-600">Back</Text>
                </View>
              }
            />
          </View>

          <Text className="text-center font-lora text-3xl text-primary">
            Subscription Plans
          </Text>

          <PlanCard
            planName="Seed Plan"
            currentPlan={subscriptionPlan === 'Seed'}
            icon={NutrientPortfolio}
            features={[
              'Register unlimited land accounts',
              'Track your nutrient portfolio',
            ]}
            onSelectPlan={() => handlePlanChange('Seed')}
          />
          <PlanCard
            planName="Mature Plan"
            currentPlan={subscriptionPlan === 'Mature'}
            backgroundColor="#1900ff"
            price="$xx.xx /mo"
            icon={Shop}
            features={[
              'All the features of the Seed Plan',
              'Apply for initiatives via the Marketplace!',
              'Cancel any time',
            ]}
            onSelectPlan={() => handlePlanChange('Mature')}
          />
          <PlanCard
            planName="Harvest Plan"
            currentPlan={subscriptionPlan === 'Harvest'}
            backgroundColor="#76008b"
            price="$xx.xx /mo"
            icon={Wallet}
            features={[
              'All the features of the Mature Plan',
              'Invest in your land with Land Wallet!',
              'Cancel any time',
            ]}
            onSelectPlan={() => handlePlanChange('Harvest')}
          />
        </Animated.View>
      )}
    </KeyboardAwareScrollView>
  );
}
