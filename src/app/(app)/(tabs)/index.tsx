/* eslint-disable max-lines-per-function */
import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, BackHandler, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, colors, FormCard, Text } from '@/components/ui';
import { CircleTick as CircleTickIcon } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

const WelcomeScreen = () => {
  const { userName, subscriptionPlan } = useUserStore();
  const navigation = useNavigation();

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

  // const handleAskLater = () => {
  //   router.replace('/nutrient-management');
  // };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 justify-center p-6">
        <FormCard>
          <View className="my-8 items-center gap-4">
            <Text className="text-center font-lora text-4xl text-primary">
              Welcome
            </Text>
            <Text className="text-center font-lora text-2xl text-neutral-700">
              {userName}!
            </Text>
            <CircleTickIcon
              width={40}
              height={40}
              color={colors.secondary}
              className="my-6"
            />
            <Text className="mb-10 text-center font-lora text-lg text-secondary">
              You have enrolled in the {subscriptionPlan} Plan!
            </Text>
            <Text className="font-poppins mb-6 text-center text-base text-neutral-600">
              {subscriptionPlan === 'Seed'
                ? 'Would you like to Upgrade to the Mature or Harvesting Plan?'
                : subscriptionPlan === 'Mature'
                  ? 'Would you like to change your plan? You can upgrade to Harvesting or downgrade to Seed.'
                  : 'Would you like to change your plan? You can downgrade to Mature or Seed.'}
            </Text>
            <View className="gap-6">
              <Button
                variant="default"
                onPress={handleUpgrade}
                label={subscriptionPlan === 'Seed' ? 'Upgrade!' : 'Change Plan'}
                className="w-52"
              />
              {/* <Button
                variant="secondary"
                onPress={handleAskLater}
                label="Ask me later"
                className="w-52"
              /> */}
            </View>
          </View>
        </FormCard>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default WelcomeScreen;
