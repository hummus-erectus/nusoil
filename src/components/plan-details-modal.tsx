/* eslint-disable max-lines-per-function */
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Modal as RNModal } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { useNotifications } from '@/features/notifications/notifications-context';
import { useUserStore } from '@/stores/user-store';

import { Button } from './ui/button';
import colors from './ui/colors';
import { CircleTick, Profile } from './ui/icons';
import { Modal } from './ui/modal';
import { Text } from './ui/text';

interface PlanDetailsModalProps {
  planName: string;
  icon: React.ComponentType<SvgProps>;
  backgroundColor: string;
  features: string[];
  price: string;
  currentPlan: boolean;
  modalRef: React.RefObject<BottomSheetModal>;
  showRenewalText?: boolean;
  onSelectPlan: () => void;
}

interface UpgradeOverlayProps {
  state: 'loading' | 'success';
  planName: string;
  currentPlan: boolean;
  onSuccessDismiss: () => void;
}

function UpgradeOverlay({
  state,
  planName,
  onSuccessDismiss,
}: UpgradeOverlayProps) {
  return (
    <RNModal transparent visible animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-4/5 items-center rounded-2xl bg-white p-6 shadow-lg">
          {state === 'loading' ? (
            <View className="items-center gap-4">
              <ActivityIndicator size="large" color={colors.primary} />
              <Text className="font-poppins text-center text-base text-neutral-600">
                Switching to the {planName}...
              </Text>
            </View>
          ) : (
            <View className="items-center gap-6">
              <View className="rounded-full bg-green-100 p-4">
                <CircleTick color={'green'} width={64} height={64} />
              </View>
              <Text className="text-center font-poppins-semibold text-lg">
                Successfully switched to the {'\n'} {planName}!
              </Text>
              <Button
                fullWidth={false}
                onPress={onSuccessDismiss}
                label="Continue to Home"
              />
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
}

export function PlanDetailsModal({
  planName,
  price,
  features,
  backgroundColor,
  icon: Icon,
  currentPlan,
  modalRef,
  showRenewalText = false,
  onSelectPlan,
}: PlanDetailsModalProps) {
  const email = useUserStore((state) => state.email);
  const { setSubscriptionPlan } = useUserStore();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [modalState, setModalState] = useState<
    'initial' | 'loading' | 'success'
  >('initial');

  const handlePlanChange = useCallback(async () => {
    try {
      // Call onSelectPlan first
      onSelectPlan();

      // Close the bottom sheet first
      modalRef.current?.close();

      // Wait for bottom sheet animation to complete
      await new Promise((resolve) => setTimeout(resolve, 200));

      setModalState('loading');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Update subscription
      setSubscriptionPlan(
        planName.split(' ')[0] as 'Seed' | 'Mature' | 'Harvest'
      );

      addNotification({
        title: 'Subscription Updated',
        message:
          planName === 'Seed Plan'
            ? 'You have reverted to the Seed plan. Basic features are now active.'
            : planName === 'Mature Plan'
              ? "Congratulations! You've upgraded to the Mature plan with advanced features."
              : "You've upgraded to the Harvest plan - unlock the full potential of your soil analysis!",
        type: 'success',
        read: false,
      });

      setModalState('success');
    } catch (error) {
      addNotification({
        title: 'Error',
        message: 'Failed to update subscription. Please try again.',
        type: 'error',
        read: false,
      });
      setModalState('initial');
    }
  }, [addNotification, modalRef, planName, setSubscriptionPlan, onSelectPlan]);

  const handleSuccessDismiss = useCallback(() => {
    router.dismissAll();
    router.push('/');
  }, [router]);

  return (
    <>
      <Modal ref={modalRef} snapPoints={['70%']} title={'Plan Overview'}>
        <View className="flex-1 gap-4 p-6">
          <View>
            <View className="mb-8 items-center">
              <View
                className="mb-4 rounded-full p-4"
                style={{ backgroundColor }}
              >
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
              fullWidth={false}
              variant={currentPlan ? 'secondary' : 'default'}
              label={currentPlan ? 'Current Plan' : 'Select Plan'}
              onPress={handlePlanChange}
              disabled={currentPlan}
            />
          </View>
        </View>
      </Modal>

      {modalState !== 'initial' && (
        <UpgradeOverlay
          state={modalState as 'loading' | 'success'}
          planName={planName}
          currentPlan={currentPlan}
          onSuccessDismiss={handleSuccessDismiss}
        />
      )}
    </>
  );
}
