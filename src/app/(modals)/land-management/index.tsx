/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, FormCard, Input, Text } from '@/components/ui';
import { Trash as TrashIcon } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

// const irrigationOptions = [
//   { label: 'Drip', value: 'Drip' },
//   { label: 'Sprinkler', value: 'Sprinkler' },
//   { label: 'Misting', value: 'Misting' },
//   { label: 'Manual', value: 'Manual' },
// ];

export default function LandManagementScreen() {
  const { userLands, setUserLands } = useUserStore();
  const { control } = useForm({
    defaultValues: {
      lands: userLands,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lands',
  });

  const handleSave = () => {
    router.back();
  };

  const handleAddLand = () => {
    const newLand = {
      id: `land_${Date.now()}`,
      farmLocationName: '',
      farmCity: '',
      size: 0,
      irrigationType: '',
    };
    append(newLand);
    setUserLands([...userLands, newLand]);
  };

  const handleRemoveLand = (index: number) => {
    remove(index);
    setUserLands(userLands.filter((_, i) => i !== index));
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1 bg-white p-6"
    >
      <View className="flex-row items-center justify-between p-6">
        <Text className="font-lora text-2xl text-primary">Manage Land</Text>
        <Button variant="link" label="Done" onPress={handleSave} />
      </View>

      {fields.map((field, index) => (
        <FormCard key={field.id} className="mb-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-lora text-lg">Land {index + 1}</Text>
            <Button
              variant="ghost"
              onPress={() => handleRemoveLand(index)}
              label={<TrashIcon />}
            />
          </View>

          <Input
            placeholder="Location name"
            value={field.farmLocationName}
            onChangeText={(text) => {
              const updated = [...fields];
              updated[index].farmLocationName = text;
              setUserLands(updated);
            }}
          />

          <Input
            placeholder="City"
            value={field.farmCity}
            onChangeText={(text) => {
              const updated = [...fields];
              updated[index].farmCity = text;
              setUserLands(updated);
            }}
          />

          {/* <Select
            options={irrigationOptions}
            placeholder="Select irrigation type"
            onValueChange={(value) => {
              const updated = [...fields];
              updated[index].irrigationType = value;
              setUserLands(updated);
            }}
            value={field.irrigationType}
          /> */}
        </FormCard>
      ))}

      <Button
        variant="default"
        label="Add New Land"
        onPress={handleAddLand}
        className="mt-4"
      />
    </KeyboardAwareScrollView>
  );
}
