/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { BackButton } from '@/components/back-button';
import { PlanCard, Text } from '@/components/ui';
import { NutrientPortfolio, Shop, Wallet } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

export default function UpgradeScreen() {
  const { subscriptionPlan } = useUserStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <KeyboardAwareScrollView
      className="bg-background"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Animated.View
        className="justify-center gap-6 p-6"
        style={{ opacity: fadeAnim }}
      >
        <View className="-ml-10 mt-6 self-start">
          <BackButton />
        </View>

        <Text className="text-center font-lora text-3xl text-primary">
          Subscription Plans
        </Text>

        <PlanCard
          planName="Seed Plan"
          currentPlan={subscriptionPlan === 'Seed'}
          mainColor="#515151"
          accentColor="#a4a4a4"
          icon={NutrientPortfolio}
          features={[
            'Register unlimited land accounts',
            'Track your nutrient portfolio',
          ]}
        />

        <PlanCard
          planName="Mature Plan"
          currentPlan={subscriptionPlan === 'Mature'}
          mainColor="#003161"
          accentColor="#456483"
          price="$xx.xx /mo"
          icon={Shop}
          features={[
            'All the features of the Seed Plan',
            'Apply for initiatives via the Marketplace!',
            'Cancel any time',
          ]}
        />

        <PlanCard
          planName="Harvest Plan"
          currentPlan={subscriptionPlan === 'Harvest'}
          mainColor="#6c017f"
          accentColor="#8b5486"
          price="$xx.xx /mo"
          icon={Wallet}
          features={[
            'All the features of the Mature Plan',
            'Invest in your land with Land Wallet!',
            'Cancel any time',
          ]}
        />
      </Animated.View>
    </KeyboardAwareScrollView>
  );
}
