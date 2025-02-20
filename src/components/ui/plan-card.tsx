/* eslint-disable max-lines-per-function */
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { PlanDetailsModal } from '../plan-details-modal';
import { FormCard } from './form-card';
import { useModal } from './modal';
import { Text } from './text';

interface PlanCardProps {
  planName: string;
  price?: string;
  mainColor: string;
  accentColor: string;
  features: string[];
  icon: React.ComponentType<SvgProps>;
  currentPlan?: boolean;
  onSelectPlan?: () => void;
}

export function PlanCard({
  planName,
  icon: Icon,
  mainColor,
  accentColor,
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
          <View className="flex-row items-center gap-4 rounded-full p-2">
            <LinearGradient
              colors={[mainColor, accentColor]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{ borderRadius: 999, flex: 1, padding: 8 }}
            >
              <View className="flex-row items-center gap-4">
                <View className="rounded-full bg-white p-2">
                  <Icon width={32} height={32} color={mainColor} />
                </View>
                <View className="mr-4 flex-1 flex-row items-center justify-between">
                  <Text className="font-lora text-xl text-white">
                    {planName}
                  </Text>
                  <Text className="font-poppins-bold text-white">{price}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
          <View className="gap-2">
            <Text className="font-poppins text-neutral-600">
              What's included:
            </Text>
            <View className="ml-4">
              {[]?.map((feature, index) => (
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
        mainColor={mainColor}
        features={features}
        accentColor={accentColor}
        price={price}
        currentPlan={currentPlan}
        onSelectPlan={handleSelectPlan}
        modalRef={modalRef}
        showRenewalText={planName !== 'Seed Plan'}
      />
    </>
  );
}
