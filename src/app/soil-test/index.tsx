// TODO: This page is currently only accessible from the signup step 3 page by clicking the 'Book Soil Test' button.
// User should be able to check progress from elsewhere in the app.

import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { SoilTestHeader } from '@/components/soil-test-header';
import type { SoilTestStep } from '@/components/soil-test-progress';
import { Text } from '@/components/ui';

interface StepItemProps {
  label: string;
  isCompleted: boolean;
}

function StepItem({ label, isCompleted }: StepItemProps) {
  return (
    <View className="flex-row items-center gap-2 py-2">
      <View
        className={`size-3 rounded-full ${
          isCompleted ? 'bg-primary' : 'bg-neutral-200'
        }`}
      />
      <Text
        className={isCompleted ? 'text-primary' : 'text-neutral-400'}
        style={{ fontSize: 16 }}
      >
        {label}
      </Text>
    </View>
  );
}

const statusMessages: Record<SoilTestStep, string> = {
  // TODO: Replace with actual messages
  agent:
    'You will be notified when the soil sample is tested and the report uploaded!',
  collected:
    'Your soil sample has been collected and is on its way to our laboratory.',
  lab: 'Your soil sample has arrived at our laboratory and is awaiting analysis.',
  tested:
    'Your soil sample has been tested. Our experts are preparing your detailed report.',
  report:
    'Your soil test report is ready! You can view your results and recommendations.',
};

export default function SoilTestTracking() {
  // TODO: get current step from state
  const currentStep = 'agent';

  const steps = [
    { id: 'agent', label: 'Soil Test Agent Notified' },
    { id: 'collected', label: 'Soil Sample Collected' },
    { id: 'lab', label: 'Soil Lab Reached' },
    { id: 'tested', label: 'Soil Tested' },
    { id: 'report', label: 'Soil Report Uploaded' },
  ] as const;

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 p-6">
        <SoilTestHeader currentStep={currentStep as SoilTestStep} />

        <View className="mt-6 gap-6">
          {steps.map((step, index) => (
            <StepItem
              key={step.id}
              label={step.label}
              isCompleted={index <= currentStepIndex}
            />
          ))}
        </View>

        <Text className="mx-16 mt-16 text-center text-neutral-600">
          {statusMessages[currentStep as SoilTestStep]}
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
