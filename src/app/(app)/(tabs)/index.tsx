/* eslint-disable max-lines-per-function */
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, colors, FormCard, Text } from '@/components/ui';
import { CircleTick as CircleTickIcon } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

const WelcomeScreen = () => {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { userName, setSubscriptionPlan } = useUserStore();
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
    setShowUpgrade(true);
  };

  const handleAskLater = () => {
    router.replace('/nutrient-management');
  };

  if (showUpgrade) {
    return (
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center p-6">
          <FormCard>
            <View className="my-8 gap-10">
              <Text className="text-center font-lora text-4xl text-primary">
                Upgrade
              </Text>
              <Text className="font-poppins text-center text-base text-neutral-600">
                Would you like to Upgrade to the Mature or Harvesting Plan?
              </Text>
              <Text className="font-poppins text-left text-base text-neutral-500">
                Choose an Upgrade Plan:
              </Text>
              <View className="items-center gap-6">
                <Button
                  variant="default"
                  onPress={() => {
                    setSubscriptionPlan('Mature');
                    router.replace('/nutrient-management');
                  }}
                  label="Mature Plan"
                  className="w-52"
                />
                <Text className="font-poppins text-center text-base text-neutral-500">
                  OR
                </Text>
                <Button
                  variant="default"
                  onPress={() => {
                    setSubscriptionPlan('Harvest');
                    router.replace('/nutrient-management');
                  }}
                  label="Harvesting Plan"
                  className="w-52"
                />
                {/* TODO: Remove seed plan button */}
                <Button
                  variant="ghost"
                  onPress={() => {
                    setSubscriptionPlan('Seed');
                    router.replace('/nutrient-management');
                  }}
                  label="Revert to Seed Plan"
                />
              </View>
            </View>
          </FormCard>
        </View>
      </KeyboardAwareScrollView>
    );
  }

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
              You have enrolled in the Seed Plan!
            </Text>
            <Text className="font-poppins mb-6 text-center text-base text-neutral-600">
              Would you like to Upgrade to the Mature or Harvesting Plan?
            </Text>
            <View className="gap-6">
              <Button
                variant="default"
                onPress={handleUpgrade}
                label="Upgrade!"
                className="w-52"
              />
              <Button
                variant="secondary"
                onPress={handleAskLater}
                label="Ask me later"
                className="w-52"
              />
            </View>
          </View>
        </FormCard>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default WelcomeScreen;
