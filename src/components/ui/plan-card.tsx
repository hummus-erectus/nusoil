import React from 'react';
import { Pressable, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { PlanDetailsModal } from '../plan-details-modal';
import { FormCard } from './form-card';
import { useModal } from './modal';
import { Text } from './text';

interface PlanCardProps {
  planName: string;
  icon: React.ComponentType<SvgProps>;
  backgroundColor?: string;
  features: string[];
  price?: string;
  currentPlan?: boolean;
  onSelectPlan?: () => void;
}

export function PlanCard({
  planName,
  icon: Icon,
  backgroundColor = '#767676',
  features,
  price = 'Free!',
  currentPlan = false,
  onSelectPlan = () => {},
}: PlanCardProps) {
  const {
    ref: modalRef,
    present: presentModal,
    dismiss: dismissModal,
  } = useModal();

  const handleSelectPlan = () => {
    dismissModal();
    onSelectPlan();
  };

  return (
    <>
      <Pressable onPress={presentModal}>
        <FormCard className="gap-4">
          {currentPlan && (
            <Text className="font-poppins-bold text-primary">Current Plan</Text>
          )}
          <View
            className="flex-row items-center gap-4 rounded-full p-2"
            style={{ backgroundColor }}
          >
            <View className="rounded-full bg-white p-2">
              <Icon width={32} height={32} color={backgroundColor} />
            </View>
            <View className="mr-4 flex-1 flex-row items-center justify-between">
              <Text className="font-lora text-xl text-white">{planName}</Text>
              <Text className="font-poppins-bold text-white">{price}</Text>
            </View>
          </View>
          <View className="gap-2">
            <Text className="font-poppins text-neutral-600">
              What's included:
            </Text>
            <View className="ml-4">
              {features.map((feature, index) => (
                <Text key={index} className="font-poppins-semibold">
                  {`\u2022 ${feature}`}
                </Text>
              ))}
            </View>
          </View>
        </FormCard>
      </Pressable>

      <PlanDetailsModal
        planName={planName}
        icon={Icon}
        backgroundColor={backgroundColor}
        features={features}
        price={price}
        currentPlan={currentPlan}
        onSelectPlan={handleSelectPlan}
        modalRef={modalRef}
        showRenewalText={planName !== 'Seed Plan'}
      />
    </>
  );
}
