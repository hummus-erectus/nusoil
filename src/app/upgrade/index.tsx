/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, FormCard, Text } from '@/components/ui';
import { useUserStore } from '@/stores/user-store';

const UpgradeScreen = () => {
  const { setSubscriptionPlan, subscriptionPlan } = useUserStore();

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
      <View className="flex-1 justify-center p-6">
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
                    onPress={() => {
                      setSubscriptionPlan('Mature');
                      router.replace('/');
                    }}
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
                  onPress={() => {
                    setSubscriptionPlan('Harvest');
                    router.replace('/');
                  }}
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
                    onPress={() => {
                      setSubscriptionPlan('Seed');
                      router.replace('/');
                    }}
                    label="Seed Plan"
                    className="w-52"
                  />
                </>
              )}
            </View>
          </View>
        </FormCard>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default UpgradeScreen;
