import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { SignupProgress } from '@/components/signup-progress';
import { Button, colors, Text } from '@/components/ui';
import { ArrowLeftFull as ArrowLeftFullIcon } from '@/components/ui/icons';

interface SignupHeaderProps {
  currentStep: 'farmer' | 'farm' | 'nutrient';
}

export function SignupHeader({ currentStep }: SignupHeaderProps) {
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
        Sign Up
      </Text>
      <SignupProgress currentStep={currentStep} />
    </View>
  );
}
