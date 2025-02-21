/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, FormCard, Input, Text } from '@/components/ui';
import { Key as EditIcon, Trash as TrashIcon } from '@/components/ui/icons';
import { useLandStore } from '@/stores/land-store';
import { useUserStore } from '@/stores/user-store';

interface LandForm {
  id: string;
  farmLocationName: string;
  farmCity: string;
  size: string;
  irrigationType: string;
}

interface UpdateFormParams {
  form: LandForm | null;
  setForm: (form: LandForm) => void;
  field: keyof LandForm;
  value: string;
}

export default function LandManagementScreen() {
  const { lands, setLands, setSelectedLandId } = useLandStore();
  const { userLands, setUserLands } = useUserStore();
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<LandForm | null>(null);
  const [newForm, setNewForm] = React.useState<LandForm | null>(null);

  const handleAddLand = () => {
    const form = {
      // TODO: handle on server with uuid?
      id: `land_${Date.now()}`,
      farmLocationName: '',
      farmCity: '',
      size: '',
      irrigationType: '',
    };
    setNewForm(form);
  };

  const handleRemoveLand = (id: string) => {
    // Remove from both stores
    setLands(lands.filter((land) => land.id !== id));
    setUserLands(userLands.filter((land) => land.id !== id));

    // Clear any editing state
    if (editingId === id) {
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleStartEdit = (land: (typeof lands)[0]) => {
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

    const newLand = {
      ...newForm,
      size: parseFloat(newForm.size) || 0,
    };

    // Update both stores
    setLands([...lands, newLand]);
    setUserLands([...userLands, newLand]);

    // Clear the form
    setNewForm(null);
  };

  const handleSubmitEdit = () => {
    if (!editForm || !editingId) return;

    const updatedLand = {
      ...editForm,
      size: parseFloat(editForm.size) || 0,
    };

    // Update both stores
    setLands(lands.map((land) => (land.id === editingId ? updatedLand : land)));
    setUserLands(
      userLands.map((land) => (land.id === editingId ? updatedLand : land))
    );

    // Clear edit state
    setEditingId(null);
    setEditForm(null);
  };

  const handleViewNutrients = (id: string) => {
    setSelectedLandId(id);
    router.push('/(app)/(tabs)/nutrient-portfolio');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1 bg-white p-6"
    >
      <View className="gap-6 p-6">
        <Text className="text-center font-lora text-3xl text-primary">
          Land Management
        </Text>

        {newForm && (
          <FormCard>
            <View className="flex-row items-center justify-between">
              <Text className="font-poppins-semibold text-lg">New Land</Text>
            </View>

            <Input
              label="Farm Location Name"
              placeholder="Enter farm location name"
              value={newForm.farmLocationName}
              onChangeText={(value) =>
                handleUpdateForm({
                  form: newForm,
                  setForm: setNewForm,
                  field: 'farmLocationName',
                  value,
                })
              }
            />

            <Input
              label="Farm City"
              placeholder="Enter farm city"
              value={newForm.farmCity}
              onChangeText={(value) =>
                handleUpdateForm({
                  form: newForm,
                  setForm: setNewForm,
                  field: 'farmCity',
                  value,
                })
              }
            />

            <Input
              label="Size (acres)"
              placeholder="Enter farm size"
              value={newForm.size}
              keyboardType="numeric"
              onChangeText={(value) =>
                handleUpdateForm({
                  form: newForm,
                  setForm: setNewForm,
                  field: 'size',
                  value,
                })
              }
            />

            <View className="flex-row justify-end gap-2">
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

        {lands.map((land) => (
          <FormCard key={land.id}>
            {editingId === land.id && editForm ? (
              <>
                <View className="flex-row items-center justify-between">
                  <Text className="font-poppins-semibold text-lg">
                    Edit Land
                  </Text>
                </View>

                <Input
                  label="Farm Location Name"
                  placeholder="Enter farm location name"
                  value={editForm.farmLocationName}
                  onChangeText={(value) =>
                    handleUpdateForm({
                      form: editForm,
                      setForm: setEditForm,
                      field: 'farmLocationName',
                      value,
                    })
                  }
                />

                <Input
                  label="Farm City"
                  placeholder="Enter farm city"
                  value={editForm.farmCity}
                  onChangeText={(value) =>
                    handleUpdateForm({
                      form: editForm,
                      setForm: setEditForm,
                      field: 'farmCity',
                      value,
                    })
                  }
                />

                <Input
                  label="Size (acres)"
                  placeholder="Enter farm size"
                  value={editForm.size}
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handleUpdateForm({
                      form: editForm,
                      setForm: setEditForm,
                      field: 'size',
                      value,
                    })
                  }
                />

                <View className="flex-row justify-end gap-2">
                  <Button
                    variant="secondary"
                    label="Cancel"
                    onPress={handleCancelEdit}
                  />
                  <Button
                    variant="default"
                    label="Save"
                    onPress={handleSubmitEdit}
                  />
                </View>
              </>
            ) : (
              <>
                <View className="flex-row items-center justify-between">
                  <Text className="font-poppins-semibold text-lg">
                    {land.farmLocationName || 'Unnamed Land'}
                  </Text>
                  <View className="flex-row gap-2">
                    <Button
                      variant="icon"
                      label={<EditIcon />}
                      onPress={() => handleStartEdit(land)}
                    />
                    <Button
                      variant="icon"
                      label={<TrashIcon />}
                      onPress={() => handleRemoveLand(land.id)}
                    />
                  </View>
                </View>

                <Text className="font-poppins text-neutral-600">
                  {land.farmCity} • {land.size} acres
                </Text>

                <Text className="font-poppins text-neutral-600">
                  Irrigation: {land.irrigationType || 'Not specified'}
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
