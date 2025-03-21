/* eslint-disable max-lines-per-function */
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Modal, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, FormCard, Text } from '@/components/ui';
import { NutrientPortfolio } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

export function OnboardingModal() {
  const { setHasCompletedOnboarding } = useUserStore();

  const handleAddLand = () => {
    router.replace('/land-management/add');
    // Avoid showing user the main index screen
    setTimeout(() => setHasCompletedOnboarding(true), 0);
  };

  const handleSkip = () => {
    setHasCompletedOnboarding(true);
  };

  return (
    <Modal
      visible={true}
      animationType="fade"
      transparent={true}
      statusBarTranslucent
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-between bg-neutral-100 p-6">
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

            <FormCard className="mb-6">
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
            </FormCard>
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
    </Modal>
  );
}
