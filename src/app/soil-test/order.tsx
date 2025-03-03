/* eslint-disable max-lines-per-function */
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Modal as RNModal, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { BackButton } from '@/components/back-button';
import { Button, colors, FocusAwareStatusBar, Text } from '@/components/ui';
import { CircleTick } from '@/components/ui/icons';
import { useNotifications } from '@/features/notifications/notifications-context';
import { useUserStore } from '@/stores/user-store';

export default function SoilTestOrderPage() {
  const { landId } = useLocalSearchParams<{ landId: string }>();
  const { lands, updateLand } = useUserStore();
  const { addNotification } = useNotifications();
  const [modalVisible, setModalVisible] = useState(false);
  const [orderState, setOrderState] = useState<'loading' | 'success'>(
    'loading'
  );

  const land = lands?.find((land) => land.id === landId);
  const hasSoilTestInProgress =
    land?.soilTestStatus && land.soilTestStatus !== 'report';

  // Redirect to progress page if a soil test is already in progress
  useEffect(() => {
    if (hasSoilTestInProgress && landId) {
      router.replace({
        pathname: '/soil-test/progress',
        params: { landId },
      });
    }
  }, [hasSoilTestInProgress, landId]);

  const handleOrderSoilTest = useCallback(() => {
    setModalVisible(true);

    // Simulate API call with a timeout, but don't update land status yet
    setTimeout(() => {
      setOrderState('success');
    }, 2000);
  }, []);

  const handleDismiss = useCallback(() => {
    // First update the land status
    updateLand(landId, {
      soilTestStatus: 'agent', // First stage of soil test process
    });

    // Close the modal
    setModalVisible(false);

    // Add notification
    addNotification({
      title: 'Soil Test Ordered',
      message: `Your soil test for ${land?.farmLocationName} has been successfully ordered. You will be notified when the soil sample is collected.`,
      type: 'success',
      read: false,
      action: {
        label: 'View Progress',
        onPress: () => {
          router.replace({
            pathname: '/soil-test/progress',
            params: { landId },
          });
        },
      },
    });

    // Replace the current route with progress page
    // This prevents going back to the order page
    router.replace({
      pathname: '/soil-test/progress',
      params: { landId },
    });
  }, [landId, land, updateLand, addNotification]);

  if (!landId || !land) {
    return (
      <>
        <FocusAwareStatusBar />
        <View className="flex-1 items-center justify-center p-6">
          <Text className="font-poppins text-center text-lg text-neutral-600">
            No land account selected. Please select a land account to order a
            soil test.
          </Text>
          <Button
            label="Go Back"
            onPress={() => router.back()}
            className="mt-4"
          />
        </View>
      </>
    );
  }

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 gap-6 p-6">
        <View className="-ml-10 self-start">
          <BackButton />
        </View>
        <Text className="text-center font-lora text-3xl text-primary">
          Order Soil Test
        </Text>

        <View className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <Text className="mb-4 text-center font-poppins-semibold text-xl text-primary">
            {land.farmLocationName}
          </Text>
          <Text className="font-poppins mb-6 text-center text-base text-neutral-600">
            Would you like to order a soil test for this land account? Our team
            will collect soil samples and provide a comprehensive analysis to
            help you optimize your farming practices.
          </Text>

          <Button
            label="Order Soil Test"
            onPress={handleOrderSoilTest}
            fullWidth
          />
        </View>

        {/* Order Modal */}
        <RNModal transparent visible={modalVisible} animationType="fade">
          <View className="flex-1 items-center justify-center bg-black/50">
            <View className="w-4/5 items-center rounded-2xl bg-white p-6 shadow-lg">
              {orderState === 'loading' ? (
                <View className="items-center gap-4">
                  <ActivityIndicator size="large" color={colors.primary} />
                  <Text className="font-poppins text-center text-base text-neutral-600">
                    Sending your soil test request...
                  </Text>
                </View>
              ) : (
                <View className="items-center gap-6">
                  <View className="rounded-full bg-green-100 p-4">
                    <CircleTick color={'green'} width={64} height={64} />
                  </View>
                  <Text className="text-center font-poppins-semibold text-lg">
                    Your soil test request has been received!
                  </Text>
                  <Button
                    fullWidth={false}
                    onPress={handleDismiss}
                    label="View Progress"
                  />
                </View>
              )}
            </View>
          </View>
        </RNModal>
      </View>
    </KeyboardAwareScrollView>
  );
}
