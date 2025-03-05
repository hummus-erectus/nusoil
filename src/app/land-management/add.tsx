/* eslint-disable max-lines-per-function */
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler, Modal, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { LandForm } from '@/components/land-form';
import { type PolygonCoordinate } from '@/components/polygon-map';
import { Button, colors, Text } from '@/components/ui';
import { ArrowLeftFull as ArrowLeftFullIcon } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

export default function AddLand() {
  const router = useRouter();
  const { addLand, setHasCompletedOnboarding } = useUserStore();
  const [form, setForm] = useState({
    id: `land_${Date.now()}`,
    farmLocationName: '',
    farmCity: '',
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
    coordinates: [] as PolygonCoordinate[],
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [saveState, setSaveState] = useState<'loading' | 'success'>('loading');

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

  // Listen for updates to coordinates when returning from polygon map screen
  useFocusEffect(
    useCallback(() => {
      // Check if we have land coordinates in the store
      const { lands } = useUserStore.getState();
      const land = lands.find((l) => l.id === form.id);

      if (land && land.coordinates && land.coordinates.length > 0) {
        setForm((prev) => ({
          ...prev,
          coordinates: land.coordinates || [],
          latLong: land.latLong || prev.latLong,
        }));
        setHasChanges(true);
      }
    }, [form.id])
  );

  const handleSave = () => {
    setModalVisible(true);
    setSaveState('loading');

    // Simulate API call
    setTimeout(() => {
      // Add land to store
      addLand(form);

      // Mark onboarding as complete
      setHasCompletedOnboarding(true);

      // Show success state
      setSaveState('success');
    }, 2000);
  };

  const handleGoToSoilTestForm = useCallback(() => {
    setModalVisible(false);
    router.replace({
      pathname: '/soil-test/form',
      params: { landId: form.id },
    });
  }, [form.id, router]);

  const handleGoToLandManagement = useCallback(() => {
    setModalVisible(false);
    router.replace({
      pathname: '/land-management',
    });
  }, [router]);

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
    <>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 gap-6 bg-neutral-100 p-6 pb-28">
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
            Add Land
          </Text>
          <LandForm
            form={form}
            onFieldChange={(field, value) => {
              setForm((prev) => ({ ...prev, [field]: value }));
              setHasChanges(true);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      <View className="absolute bottom-6 w-full flex-row items-center justify-center gap-2 px-6">
        <View className="flex-1">
          <Button
            variant="secondary"
            className="bg-white"
            label="Cancel"
            onPress={() => router.back()}
          />
        </View>
        <View className="flex-1">
          <Button variant="default" label="Save" onPress={handleSave} />
        </View>
      </View>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-[90%] rounded-xl bg-white p-6">
            <View className="items-center justify-center">
              {saveState === 'loading' ? (
                <View className="py-4">
                  <Text className="text-center text-lg font-medium">
                    Saving your land...
                  </Text>
                </View>
              ) : (
                <View className="gap-6 py-4">
                  <Text className="text-center text-lg font-medium">
                    Land Added Successfully!
                  </Text>
                  <Text className="text-center text-neutral-600">
                    Would you like to add a soil test for this land now?
                  </Text>
                  <View className="flex-row gap-4">
                    <View className="flex-1">
                      <Button
                        variant="secondary"
                        label="Skip"
                        onPress={handleGoToLandManagement}
                      />
                    </View>
                    <View className="flex-1">
                      <Button
                        variant="default"
                        label="Add Soil Test"
                        onPress={handleGoToSoilTestForm}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
