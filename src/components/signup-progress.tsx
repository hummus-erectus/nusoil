import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

export type SignupStep = 'intro' | 'farmer' | 'farm' | 'nutrient';

interface SignupProgressProps {
  currentStep: SignupStep;
}

const steps = [
  { id: 'farmer', label: 'Farmer', step: 1 },
  { id: 'farm', label: 'Farm Land', step: 2 },
  { id: 'nutrient', label: 'Nutrient', step: 3 },
] as const;

export function SignupProgress({ currentStep }: SignupProgressProps) {
  return (
    <View className="w-full">
      <View className="mb-8 flex-row justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <View className="items-center">
              <View
                className={`size-2 rounded-full ${
                  currentStep === step.id || currentStep === 'intro'
                    ? 'bg-primary'
                    : 'bg-neutral-200'
                }`}
              />
              <Text
                className={`mt-2 text-xs ${
                  currentStep === step.id ? 'text-primary' : 'text-neutral-400'
                }`}
              >
                Step {step.step}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View
                className={`mt-1 h-px flex-1 ${
                  currentStep === 'intro' ? 'bg-neutral-200' : 'bg-primary'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}
