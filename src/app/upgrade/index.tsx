/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, FormCard, Text } from '@/components/ui';
import { useUserStore } from '@/stores/user-store';

const UpgradeScreen = () => {
  const { setSubscriptionPlan } = useUserStore();
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
};

export default UpgradeScreen;
