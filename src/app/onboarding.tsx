/* eslint-disable max-lines-per-function */
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { BackHandler, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, Text } from '@/components/ui';
import { FocusAwareStatusBar } from '@/components/ui';
import { NutrientPortfolio } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

export default function OnboardingScreen() {
  const { setHasCompletedOnboarding } = useUserStore();

  // Prevent going back to login screen
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Prevent going back - user must either add land or skip
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  const handleAddLand = () => {
    setHasCompletedOnboarding(true);
    router.push('/land-management/add');
  };

  const handleSkip = () => {
    setHasCompletedOnboarding(true);
    // Just navigate to home screen
    router.replace('/(app)');
  };

  return (
    <>
      <FocusAwareStatusBar />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-between p-6">
          <View className="flex-1 justify-center gap-6">
            <View className="mt-10 items-center">
              <Text className="mb-4 text-center font-lora text-3xl text-primary">
                Welcome to NuSoil!
              </Text>
              <View className="mb-4 rounded-full p-4">
                <LinearGradient
                  colors={['#003161', '#456483']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={{ borderRadius: 999, padding: 8 }}
                >
                  <NutrientPortfolio width={62} height={62} color="white" />
                </LinearGradient>
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
