import React from 'react';
import { View } from 'react-native';

import { SoilTestProgress } from '@/components/soil-test-progress';
import { Text } from '@/components/ui';

import { BackButton } from './back-button';
import type { SoilTestStep } from './soil-test-progress';

interface SoilTestHeaderProps {
  currentStep: SoilTestStep;
}

export function SoilTestHeader({ currentStep }: SoilTestHeaderProps) {
  return (
    <View className="relative mb-6 gap-4">
      <View className="-ml-10 self-start">
        <BackButton />
      </View>
      <Text className="mb-6 text-center font-lora text-3xl text-primary">
        Soil Test Tracking
      </Text>
      <SoilTestProgress currentStep={currentStep} />
    </View>
  );
}
