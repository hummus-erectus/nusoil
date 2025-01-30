import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { SoilTestProgress } from '@/components/soil-test-progress';
import { Button, colors, Text } from '@/components/ui';
import { ArrowLeftFull as ArrowLeftFullIcon } from '@/components/ui/icons';

import type { SoilTestStep } from './soil-test-progress';

interface SoilTestHeaderProps {
  currentStep: SoilTestStep;
}

export function SoilTestHeader({ currentStep }: SoilTestHeaderProps) {
  const handleBack = () => {
    router.back();
  };

  return (
    <View className="relative mb-6 gap-4">
      <View className="-ml-10 self-start">
        <Button
          variant="ghost"
          onPress={handleBack}
          fullWidth={false}
          label={
            <View className="flex-row items-center justify-center">
              <ArrowLeftFullIcon color={colors.neutral[600]} />
              <Text className="ml-4 text-neutral-600">Back</Text>
            </View>
          }
        />
      </View>
      <Text className="mb-6 text-center font-lora text-3xl text-primary">
        Soil Test Tracking
      </Text>
      <SoilTestProgress currentStep={currentStep} />
    </View>
  );
}
