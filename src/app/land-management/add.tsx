/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { LandForm } from '@/components/land-form';
import { Button, colors, Text } from '@/components/ui';
import { ArrowLeftFull as ArrowLeftFullIcon } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

export default function AddLand() {
  const router = useRouter();
  const { addLand } = useUserStore();
  const [hasChanges, setHasChanges] = useState(false);
  const [form, setForm] = useState({
    id: `land_${Date.now()}`,
    farmLocationName: '',
    farmCity: '',
    size: '',
    irrigationType: '',
    latLong: '',
    ownershipType: '',
    yearsOperated: '',
    leasedAmount: '',
    rainWater: '',
    groundWater: '',
    waterIrrigationType: '',
    waterDays: '',
    waterPump: '',
    tillageType: '',
    cropsPerYear: '',
    cropDuration: '',
    cropType: '',
    leasedLandCost: '',
    tillageCost: '',
    fertilizerCost: '',
    pestDiseaseCost: '',
    cropYieldAverage: '',
    income: '',
  });

  useEffect(() => {
    const backAction = () => {
      if (hasChanges) {
        Alert.alert(
          'Unsaved Changes',
          'You have unsaved changes. Are you sure you want to go back?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Discard',
              style: 'destructive',
              onPress: () => router.back(),
            },
          ]
        );
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [hasChanges, router]);

  const handleSave = () => {
    const newLand = {
      ...form,
    };
    addLand(newLand);
    setHasChanges(false);
    router.back();
  };

  const handleBack = () => {
    if (hasChanges) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to go back?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
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
          Add New Land
        </Text>
        <LandForm
          form={form}
          onFieldChange={(field, value) => {
            setForm((prev) => ({ ...prev, [field]: value }));
            setHasChanges(true);
          }}
        />
        <View className="flex-row gap-2">
          <View className="flex-1">
            <Button
              variant="secondary"
              label="Cancel"
              onPress={() => router.back()}
            />
          </View>
          <View className="flex-1">
            <Button variant="default" label="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
