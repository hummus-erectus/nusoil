/* eslint-disable max-lines-per-function */
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { Alert, BackHandler, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { LandForm, type LandFormSchema } from '@/components/land-form';
import { landFormSchema } from '@/components/land-form';
import { Button, colors, Text } from '@/components/ui';
import { ArrowLeftFull as ArrowLeftFullIcon } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

export default function EditLand() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { lands, updateLand } = useUserStore();
  const [hasChanges, setHasChanges] = useState(false);

  const land = lands.find((land) => land.id === id);

  useEffect(() => {
    if (!land) {
      router.back();
    }
  }, [land, router]);

  useEffect(() => {
    const backAction = () => {
      if (hasChanges) {
        showUnsavedChangesAlert(() => router.back());
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

  const handleSave: SubmitHandler<LandFormSchema> = async (data) => {
    if (!land) return;
    try {
      const validatedData = landFormSchema.parse(data);
      updateLand(land.id, {
        ...land,
        ...validatedData,
      });
      setHasChanges(false);
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to save land. Please try again.');
    }
  };

  const handleBack = () => {
    if (hasChanges) {
      showUnsavedChangesAlert(() => router.back());
    } else {
      router.back();
    }
  };

  const showUnsavedChangesAlert = (onDiscard: () => void) => {
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
          onPress: onDiscard,
        },
      ]
    );
  };

  if (!land) return null;

  return (
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
          landId={land.id}
          defaultValues={land}
          onSubmit={handleSave}
          onDirtyChange={setHasChanges}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
