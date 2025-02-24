/* eslint-disable max-lines-per-function */
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { LandForm } from '@/components/land-form';
import { Button, colors, Text } from '@/components/ui';
import { ArrowLeftFull as ArrowLeftFullIcon } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

export default function EditLand() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { lands, updateLand } = useUserStore();
  const [form, setForm] = useState(lands.find((land) => land.id === id));
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!form) {
      router.back();
    }
  }, [form, router]);

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
    if (!form) return;
    updateLand(form.id, {
      ...form,
    });
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

  if (!form) return null;

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
            Edit Land
          </Text>
          <LandForm
            form={form}
            onFieldChange={(field, value) => {
              setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
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
    </>
  );
}
