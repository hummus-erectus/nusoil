/* eslint-disable max-lines-per-function */
import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, BackHandler, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { LandAccountsCard } from '@/components/land-accounts-card';
import { OnboardingModal } from '@/components/onboarding-modal';
import { Button, FormCard, Text } from '@/components/ui';
import { useUserStore } from '@/stores/user-store';

const WelcomeScreen = () => {
  const { userName, subscriptionPlan, lands, hasCompletedOnboarding } =
    useUserStore();
  const navigation = useNavigation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Only show exit confirmation if we're at the root level
        // (i.e., in the main tabs with no other screens in the stack)
        if (!navigation.canGoBack()) {
          Alert.alert(
            'Exit App',
            'Are you sure you want to exit?',
            [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              { text: 'Yes', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
          );
          return true;
        }
        // Let the default back behavior happen for normal navigation
        return false;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleUpgrade = () => {
    router.push('/upgrade');
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 gap-6 p-6">
        <View>
          <View className="flex-row">
            <Text className="text-center font-poppins-bold text-lg">
              {getGreeting()},{' '}
            </Text>
            <Text className="text-center font-poppins-bold text-lg">
              {userName}!
            </Text>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row">
              <Text className="font-poppins-regular text-neutral-600">
                You are enrolled in the{' '}
              </Text>
              <Text className="font-poppins-semibold text-neutral-600">
                {subscriptionPlan} Plan
              </Text>
            </View>
            <Button
              variant="link"
              fullWidth={false}
              label={subscriptionPlan === 'Harvest' ? 'Manage' : 'Upgrade'}
              onPress={handleUpgrade}
            />
          </View>
        </View>

        <FormCard>
          <LandAccountsCard lands={lands} />
        </FormCard>
      </View>
      {!hasCompletedOnboarding && <OnboardingModal />}
    </KeyboardAwareScrollView>
  );
};

export default WelcomeScreen;
