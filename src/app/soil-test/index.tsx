/* eslint-disable max-lines-per-function */
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, colors, Select, Text } from '@/components/ui';
import { ArrowLeftFull as ArrowLeftFullIcon } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

export default function SoilTest() {
  const router = useRouter();
  const { lands } = useUserStore();
  const { landId } = useLocalSearchParams<{ landId?: string }>();
  const [selectedLandId, setSelectedLandId] = useState<string | null>(
    landId || null
  );

  const accountOptions =
    lands?.map((land) => ({
      label: land.farmLocationName || 'Unnamed Land',
      value: land.id,
    })) || [];

  const selectedLand = lands?.find((land) => land.id === selectedLandId);
  const hasSoilTestInProgress =
    selectedLand?.soilTestStatus && selectedLand.soilTestStatus !== 'report';

  useEffect(() => {
    if (landId) {
      setSelectedLandId(landId);
    }
  }, [landId]);

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

  const handleViewProgress = () => {
    if (selectedLandId) {
      router.push({
        pathname: '/soil-test/progress',
        params: { landId: selectedLandId },
      });
    }
  };

  const handleSelectLand = (value: string | number) => {
    const valueAsString = value.toString();
    setSelectedLandId(valueAsString);

    // Use router.replace instead of setParams to maintain navigation context
    router.replace({
      pathname: '/soil-test',
      params: { landId: valueAsString },
    });
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
          onSelect={handleSelectLand}
        />

        <Button
          variant="secondary"
          onPress={handleAddSoilTest}
          disabled={!selectedLandId}
          label="Add Soil Test Results"
        />

        {hasSoilTestInProgress ? (
          <View className="rounded-xl bg-white p-6 shadow-sm">
            <Text className="mb-4 text-center font-poppins-semibold text-xl text-primary">
              Soil Test in Progress
            </Text>
            <Text className="font-poppins mb-6 text-center text-base text-neutral-600">
              Your soil test for {selectedLand?.farmLocationName} is currently
              being processed.
            </Text>
            <Button onPress={handleViewProgress} label="View Progress" />
          </View>
        ) : (
          <Button
            onPress={handleOrderSoilTest}
            disabled={!selectedLandId}
            label="Order Soil Test"
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}
