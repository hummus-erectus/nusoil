import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

export type SoilTestStep = 'agent' | 'collected' | 'lab' | 'tested' | 'report';

interface SoilTestProgressProps {
  currentStep: SoilTestStep;
}

const steps = [
  { id: 'agent', label: 'Step 1', step: 1 },
  { id: 'collected', label: 'Step 2', step: 2 },
  { id: 'lab', label: 'Step 3', step: 3 },
  { id: 'tested', label: 'Step 4', step: 4 },
  { id: 'report', label: 'Step 5', step: 5 },
] as const;

export function SoilTestProgress({ currentStep }: SoilTestProgressProps) {
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <View className="w-full">
      <View className="mb-8 flex-row justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <View className="items-center">
              <View
                className={`size-2 rounded-full ${
                  index <= currentStepIndex ? 'bg-primary' : 'bg-neutral-200'
                }`}
              />
              <Text
                className={`mt-2 text-xs ${
                  index <= currentStepIndex
                    ? 'text-primary'
                    : 'text-neutral-400'
                }`}
              >
                {step.label}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View
                className={`mt-1 h-px flex-1 ${
                  index < currentStepIndex ? 'bg-primary' : 'bg-neutral-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}
