/* eslint-disable max-lines-per-function */
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, Text } from '@/components/ui';
import { FocusAwareStatusBar } from '@/components/ui';
import { useOnboarding } from '@/features/onboarding';

export default function OnboardingScreen() {
  const { skipOnboarding, navigateToAddLand } = useOnboarding();

  const handleAddLand = () => {
    navigateToAddLand();
  };

  const handleSkip = () => {
    // The skipOnboarding function will handle navigation to home screen and persist the skipped state
    skipOnboarding();
  };

  return (
    <>
      <FocusAwareStatusBar />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-between p-6">
          <View className="mt-10 items-center">
            <Text className="mb-4 text-center font-lora text-3xl text-primary">
              Welcome to NuSoil!
            </Text>
            <View className="my-6 rounded-full bg-primary/10 p-10">
              <Text className="text-center font-lora text-4xl text-primary">
                🌱
              </Text>
            </View>
            <Text className="mb-6 text-center text-lg text-neutral-700">
              Your journey to better soil management starts here
            </Text>
          </View>

          <View className="mb-6 rounded-lg bg-neutral-50 p-6">
            <Text className="mb-4 font-poppins-semibold text-xl text-primary">
              Let's set up your first land account
            </Text>

            <Text className="mb-2 text-neutral-700">
              • Track soil nutrients for each of your lands
            </Text>

            <Text className="mb-2 text-neutral-700">
              • Get personalized recommendations
            </Text>

            <Text className="mb-2 text-neutral-700">
              • Monitor soil health over time
            </Text>

            <Text className="mb-2 text-neutral-700">
              • Improve crop yields with data-driven insights
            </Text>
          </View>

          <View className="mb-10 gap-4">
            <Button label="Add My First Land" onPress={handleAddLand} />
            <Button
              variant="secondary"
              label="I'll Do This Later"
              onPress={handleSkip}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
