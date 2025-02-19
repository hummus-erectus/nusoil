/* eslint-disable max-lines-per-function */
import React from 'react';
import { View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { useUserStore } from '@/stores/user-store';

import { Button } from './ui/button';
import { Profile } from './ui/icons';
import { Modal } from './ui/modal';
import { Text } from './ui/text';

interface PlanDetailsModalProps {
  planName: string;
  icon: React.ComponentType<SvgProps>;
  backgroundColor: string;
  features: string[];
  price: string;
  currentPlan: boolean;
  onSelectPlan: () => void;
  modalRef: React.RefObject<any>;
  showRenewalText?: boolean;
}

export function PlanDetailsModal({
  planName,
  icon: Icon,
  backgroundColor,
  features,
  price,
  currentPlan,
  onSelectPlan,
  modalRef,
  showRenewalText = false,
}: PlanDetailsModalProps) {
  const email = useUserStore((state) => state.email);

  return (
    // TODO: Make modal dynamically sized
    <Modal ref={modalRef} snapPoints={['70%']} title={'Plan Overview'}>
      <View className="flex-1 gap-4 p-6">
        <View>
          <View className="mb-8 items-center">
            <View className="mb-4 rounded-full p-4" style={{ backgroundColor }}>
              <Icon width={48} height={48} color="white" />
            </View>
            <Text className="font-lora text-2xl">{planName}</Text>
            <Text className="font-poppins-bold text-xl">{price}</Text>
          </View>

          <View className="gap-2">
            <Text className="font-poppins-semibold text-neutral-600">
              What's included:
            </Text>
            <View className="ml-4">
              {features.map((feature, index) => (
                <Text key={index} className="font-poppins">
                  {`\u2022 ${feature}`}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View className="h-px w-full bg-neutral-200" />

        {showRenewalText && (
          <>
            <View>
              <Text className="text-center font-poppins-light text-sm text-neutral-300">
                No commitment, cancel at any time at least 24 hours before the
                renewal date. Plan automatically renews every month unless
                canceled.
              </Text>
            </View>
            <View className="h-px w-full bg-neutral-200" />
          </>
        )}

        <View className="flex-row items-center gap-4">
          <Profile width={24} height={24} />
          <View>
            <Text className="font-poppins-semibold">Account</Text>
            <Text className="font-poppins">{email}</Text>
          </View>
        </View>
        <View className="h-px w-full bg-neutral-200" />

        <View className="mt-auto">
          <Button
            variant={currentPlan ? 'secondary' : 'default'}
            label={currentPlan ? 'Current Plan' : 'Select Plan'}
            onPress={onSelectPlan}
            disabled={currentPlan}
          />
        </View>
      </View>
    </Modal>
  );
}
