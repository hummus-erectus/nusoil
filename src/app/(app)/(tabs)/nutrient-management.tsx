/* eslint-disable max-lines-per-function */
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { HarvestPlan, MaturePlan, SeedPlan } from '@/components/nutrient-plans';
import { FocusAwareStatusBar, Text, View } from '@/components/ui';
import { useUserStore } from '@/stores/user-store';

export default function NutrientsManagement() {
  const { subscriptionPlan, userName } = useUserStore();

  const renderPlanContent = () => {
    switch (subscriptionPlan) {
      case 'Mature':
        return <MaturePlan />;
      case 'Harvest':
        return <HarvestPlan />;
      default:
        return <SeedPlan />;
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 p-6">
          <View className="mb-6">
            <Text className="font-poppins-semibold text-lg text-neutral-700">
              Welcome back, {userName}!
            </Text>
            <Text className="text-neutral-500">
              Here is your {subscriptionPlan} Plan
            </Text>
          </View>
          {renderPlanContent()}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
