// TODO: This page is currently only accessible from the signup step 3 page by clicking the 'Book Soil Test' button.
// User should be able to check progress from elsewhere in the app.

import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { SoilTestHeader } from '@/components/soil-test-header';
import type { SoilTestStep } from '@/components/soil-test-progress';
import { Text } from '@/components/ui';
import { useUserStore } from '@/stores/user-store';

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
  const { landId } = useLocalSearchParams<{ landId: string }>();
  const { lands } = useUserStore();

  // Find the land with the given ID, or use the first land with a soil test status if no ID is provided
  const land = landId
    ? lands?.find((l) => l.id === landId)
    : lands?.find((l) => l.soilTestStatus);

  // Get the current step from the land's soil test status, or default to 'agent'
  const currentStep = (land?.soilTestStatus || 'agent') as SoilTestStep;

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

        {land && (
          <Text className="my-4 text-center font-lora text-xl text-primary">
            Land Account:{' '}
            <Text className="font-poppins-bold text-xl">
              {land.farmLocationName}
            </Text>
          </Text>
        )}

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
