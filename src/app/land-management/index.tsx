/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { BackButton } from '@/components/back-button';
import { Button, FormCard, Text, View } from '@/components/ui';
import { Edit as EditIcon, Trash as TrashIcon } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

export default function LandManagementScreen() {
  const { lands, setSelectedLandId, deleteLand } = useUserStore();
  const navigation = useRouter();

  const handleRemoveLand = (id: string) => {
    deleteLand(id);
  };

  const handleViewNutrients = (id: string) => {
    setSelectedLandId(id);
    navigation.navigate('/(app)/(tabs)/nutrient-portfolio');
  };

  const handleDeleteLand = (landId: string) => {
    const land = lands?.find((l) => l.id === landId);
    if (!land) return;

    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${land.farmLocationName || 'this land account'}? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleRemoveLand(landId),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 gap-6 bg-neutral-100 p-6">
        <View className="-ml-10 mt-6 self-start">
          <BackButton />
        </View>
        <Text className="text-center font-lora text-3xl text-primary">
          Land Management
        </Text>

        {lands?.map((land) => (
          <FormCard className="gap-4" key={land.id}>
            <View className="flex-row items-center justify-between">
              <Text className="font-poppins-semibold text-lg">
                {land.farmLocationName || 'Unnamed Land'}
              </Text>
              <View className="flex-row gap-4">
                <Button
                  variant="icon"
                  label={<EditIcon />}
                  onPress={() =>
                    navigation.push(`/land-management/edit?id=${land.id}`)
                  }
                />
                <Button
                  variant="icon"
                  label={<TrashIcon />}
                  onPress={() => handleDeleteLand(land.id)}
                />
              </View>
            </View>

            <Text className="font-poppins mb-2 text-neutral-600">
              {land.farmCity}
            </Text>

            <Button
              variant="link"
              label="View Nutrient Data"
              onPress={() => handleViewNutrients(land.id)}
            />
          </FormCard>
        ))}
        <Button
          variant="default"
          label="Add Land"
          onPress={() => navigation.push('/land-management/add')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
