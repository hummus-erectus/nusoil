/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Modal as RNModal,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { LandForm } from '@/components/land-form';
import { Button, colors, Text } from '@/components/ui';
import {
  ArrowLeftFull as ArrowLeftFullIcon,
  CircleTick,
} from '@/components/ui/icons';
import { useNotifications } from '@/features/notifications/notifications-context';
import { useUserStore } from '@/stores/user-store';

export default function AddLand() {
  const { addLand } = useUserStore();
  const { addNotification } = useNotifications();
  const [hasChanges, setHasChanges] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [saveState, setSaveState] = useState<'loading' | 'success'>('loading');
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
  }, [hasChanges]);

  const handleSave = useCallback(() => {
    // Show loading modal
    setModalVisible(true);

    // Log the form data
    console.log('Land management form data:', form);

    // Simulate API call with a timeout
    setTimeout(() => {
      const newLand = {
        ...form,
      };
      addLand(newLand);
      setHasChanges(false);

      // Show success state
      setSaveState('success');

      // Add notification
      addNotification({
        title: 'Land Added',
        message: `Your land account for ${form.farmLocationName} has been successfully added.`,
        type: 'success',
        read: false,
        action: {
          label: 'Manage Land Accounts',
          onPress: () => {
            router.replace({
              pathname: '/land-management',
            });
          },
        },
      });
    }, 2000);
  }, [form, addLand, addNotification]);

  const handleGoToSoilTestForm = useCallback(() => {
    setModalVisible(false);
    router.replace({
      pathname: '/soil-test/form',
      params: { landId: form.id },
    });
  }, [form.id]);

  const handleGoToSoilTestOrder = useCallback(() => {
    setModalVisible(false);
    router.replace({
      pathname: '/soil-test/order',
      params: { landId: form.id },
    });
  }, [form.id]);

  const handleNotNow = useCallback(() => {
    setModalVisible(false);
    router.replace('/');
  }, []);

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
        <RNModal visible={modalVisible} transparent={true} animationType="fade">
          <View className="flex-1 items-center justify-center bg-black/50">
            <View className="w-4/5 items-center rounded-2xl bg-white p-6 shadow-lg">
              {saveState === 'loading' ? (
                <View className="items-center gap-4">
                  <ActivityIndicator size="large" color={colors.primary} />
                  <Text className="font-poppins text-center text-base text-neutral-600">
                    Saving your land account...
                  </Text>
                </View>
              ) : (
                <View className="items-center gap-6">
                  <View className="rounded-full bg-green-100 p-4">
                    <CircleTick color={'green'} width={64} height={64} />
                  </View>
                  <Text className="text-center font-poppins-semibold text-lg">
                    Your land account has been successfully added!
                  </Text>
                  <Text className="font-poppins text-center text-base text-neutral-600">
                    Would you like to add nutrient information for this land?
                  </Text>
                  <View className="w-full gap-2">
                    <Button
                      fullWidth
                      variant="default"
                      label="Order Soil Test"
                      onPress={handleGoToSoilTestOrder}
                    />
                    <Button
                      fullWidth
                      variant="secondary"
                      label="Add Soil Test Results"
                      onPress={handleGoToSoilTestForm}
                    />
                    <Button
                      fullWidth
                      variant="ghost"
                      label="Not Now"
                      onPress={handleNotNow}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </RNModal>
      </View>
    </KeyboardAwareScrollView>
  );
}
