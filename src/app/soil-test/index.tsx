/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, colors, Select, Text } from '@/components/ui';
import { ArrowLeftFull as ArrowLeftFullIcon } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

export default function SoilTest() {
  const router = useRouter();
  const { lands, selectedLandId, setSelectedLandId } = useUserStore();

  const accountOptions =
    lands?.map((land) => ({
      label: land.farmLocationName || 'Unnamed Land',
      value: land.id,
    })) || [];

  const handleBack = () => {
    router.back();
  };

  const handleAddSoilTest = () => {
    if (selectedLandId) {
      router.push({
        pathname: '/soil-test/form',
        params: { landId: selectedLandId },
      });
    }
  };

  const handleOrderSoilTest = () => {
    if (selectedLandId) {
      router.push({
        pathname: '/soil-test/order',
        params: { landId: selectedLandId },
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 gap-6 bg-neutral-100 p-6">
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
        <Text className="text-center font-lora text-3xl text-primary">
          Soil Test
        </Text>

        <Select
          options={accountOptions}
          label="Select Land"
          value={selectedLandId || ''}
          onSelect={(value) => setSelectedLandId(value.toString())}
        />

        <Button
          variant="secondary"
          onPress={handleAddSoilTest}
          disabled={!selectedLandId}
          label="Add Soil Test Results"
        />
        <Button
          onPress={handleOrderSoilTest}
          disabled={!selectedLandId}
          label="Order Soil Test"
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
