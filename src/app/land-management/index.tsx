/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import * as React from 'react';
import { Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { LandForm } from '@/components/land-form';
import { Button, colors, FormCard, Text } from '@/components/ui';
import {
  ArrowLeftFull as ArrowLeftFullIcon,
  Edit as EditIcon,
  Trash as TrashIcon,
} from '@/components/ui/icons';
import type { Land } from '@/stores/user-store';
import { useUserStore } from '@/stores/user-store';

interface LandFormData extends Omit<Land, 'size'> {
  size: string;
}

interface UpdateFormParams {
  form: LandFormData | null;
  setForm: (form: LandFormData) => void;
  field: keyof LandFormData;
  value: string;
}

export default function LandManagementScreen() {
  const { lands, setSelectedLandId, addLand, deleteLand, updateLand } =
    useUserStore();
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<LandFormData | null>(null);
  const [newForm, setNewForm] = React.useState<LandFormData | null>(null);

  const handleAddLand = () => {
    const newLand = {
      id: `land_${Date.now()}`,
      farmLocationName: '',
      farmCity: '',
      size: '',
      irrigationType: '',
      ownershipType: '',
      yearsOperated: '',
      leasedAmount: '',
      rainWaterHarvesting: '',
      groundWaterSource: '',
      waterIrrigationType: '',
      waterDays: '',
      waterPumpType: '',
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
    };
    setNewForm(newLand);
  };

  const handleRemoveLand = (id: string) => {
    deleteLand(id);

    // Clear any editing state
    if (editingId === id) {
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleStartEdit = (land: Land) => {
    setEditingId(land.id);
    setEditForm({
      ...land,
      size: land.size.toString(),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleUpdateForm = (params: UpdateFormParams) => {
    const { form, setForm, field, value } = params;
    if (!form) return;
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleSubmitNew = () => {
    if (!newForm) return;

    const newLand: Land = {
      ...newForm,
      size: parseFloat(newForm.size) || 0,
    };

    addLand(newLand);
    setNewForm(null);
  };

  const handleSubmitEdit = () => {
    if (!editForm || !editingId) return;

    const updatedLand: Land = {
      ...editForm,
      size: parseFloat(editForm.size) || 0,
    };

    updateLand(editingId, updatedLand);

    // Clear edit state
    setEditingId(null);
    setEditForm(null);
  };

  const handleViewNutrients = (id: string) => {
    setSelectedLandId(id);
    router.navigate('/(app)/(tabs)/nutrient-portfolio');
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

  const handleBack = () => {
    router.back();
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
          Land Management
        </Text>

        {newForm && (
          <FormCard>
            <View className="flex-row items-center justify-between">
              <Text className="font-poppins-semibold text-lg">New Land</Text>
            </View>

            <LandForm
              form={newForm}
              onFieldChange={(field, value) =>
                handleUpdateForm({
                  form: newForm,
                  setForm: setNewForm,
                  field,
                  value,
                })
              }
            />

            <View className="flex-row justify-center gap-2">
              <Button
                variant="secondary"
                label="Cancel"
                onPress={() => setNewForm(null)}
              />
              <Button
                variant="default"
                label="Save"
                onPress={handleSubmitNew}
              />
            </View>
          </FormCard>
        )}

        {lands?.map((land) => (
          <FormCard className="gap-4" key={land.id}>
            {editingId === land.id && editForm ? (
              <>
                <View className="flex-row items-center justify-between">
                  <Text className="font-poppins-semibold text-lg">
                    Edit Land
                  </Text>
                </View>

                <LandForm
                  form={editForm}
                  onFieldChange={(field, value) =>
                    handleUpdateForm({
                      form: editForm,
                      setForm: setEditForm,
                      field,
                      value,
                    })
                  }
                />

                <View className="flex-row justify-center gap-2">
                  <Button
                    variant="secondary"
                    label="Cancel"
                    onPress={handleCancelEdit}
                    className="w-32"
                  />
                  <Button
                    variant="default"
                    label="Save"
                    onPress={handleSubmitEdit}
                    className="w-32"
                  />
                </View>
              </>
            ) : (
              <>
                <View className="flex-row items-center justify-between">
                  <Text className="font-poppins-semibold text-lg">
                    {land.farmLocationName || 'Unnamed Land'}
                  </Text>
                  <View className="flex-row gap-4">
                    <Button
                      variant="icon"
                      label={<EditIcon />}
                      onPress={() => handleStartEdit(land)}
                    />
                    <Button
                      variant="icon"
                      label={<TrashIcon />}
                      onPress={() => handleDeleteLand(land.id)}
                    />
                  </View>
                </View>

                <Text className="font-poppins mb-2 text-neutral-600">
                  {land.farmCity} • {land.size} acres
                </Text>

                <Button
                  variant="link"
                  label="View Nutrient Data"
                  onPress={() => handleViewNutrients(land.id)}
                />
              </>
            )}
          </FormCard>
        ))}
        {!newForm && (
          <Button
            variant="secondary"
            label="Add New Land"
            onPress={handleAddLand}
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}
