/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import * as React from 'react';
// import { Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, FormCard, Select, Text, View } from '@/components/ui';
import { Plus as PlusIcon } from '@/components/ui/icons';
import { useUserStore } from '@/stores/user-store';

export default function NutrientPortfolio() {
  const { lands, selectedLandId, setSelectedLandId } = useUserStore();
  const accountOptions =
    lands?.map((land) => ({
      label: land.farmLocationName || 'Unnamed Land',
      value: land.id,
    })) || [];

  const selectedLand = lands?.find((land) => land.id === selectedLandId);

  // const openInMaps = (lat: number, lng: number) => {
  //   const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  //   Linking.openURL(url);
  // };

  const handleNutrientManagementClick = () => {
    router.push('/(app)/(tabs)/nutrient-portfolio/nutrient-management');
  };

  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 gap-6 p-6">
          <Text className="text-center font-lora text-3xl text-primary">
            Nutrient Portfolio
          </Text>

          {lands && lands.length > 0 ? (
            <>
              <Select
                options={accountOptions}
                label="Select Account"
                value={selectedLandId || ''}
                onSelect={(value) => setSelectedLandId(value.toString())}
              />
              {selectedLand && (
                <>
                  <FormCard>
                    <View className="gap-2">
                      <Text className="font-poppins-semibold text-lg">
                        Land Location
                      </Text>
                      {selectedLand && (
                        <>
                          <Text>{selectedLand.farmLocationName}</Text>
                          <Text className="font-poppins-light text-sm">
                            {selectedLand.farmCity}
                          </Text>
                          {/* TODO: Add actual coordinates to land data model */}
                          {/* <Text
                        className="text-right text-primary underline"
                        onPress={() =>
                          openInMaps(location.latitude, location.longitude)
                        }
                      >
                        Open in Maps
                      </Text> */}
                        </>
                      )}
                    </View>
                  </FormCard>

                  <View className="gap-4 pb-20">
                    <Text className="font-lora text-xl text-primary">
                      Major Nutrient Availability
                    </Text>
                    <FormCard>
                      <View className="gap-6">
                        <View className="gap-2">
                          <Text className="font-poppins-semibold">
                            Parameters
                          </Text>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">pH</Text>
                            <Text>
                              {selectedLand.nutrientData?.parameters?.ph ||
                                'n/a'}
                            </Text>
                          </View>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">EC</Text>
                            <Text>
                              {selectedLand.nutrientData?.parameters?.ec ||
                                'n/a'}
                            </Text>
                          </View>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">OC</Text>
                            <Text>
                              {selectedLand.nutrientData?.parameters?.oc ||
                                'n/a'}
                            </Text>
                          </View>
                        </View>

                        <View className="gap-2">
                          <Text className="font-poppins-semibold">
                            Macro Nutrients
                          </Text>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">N</Text>
                            <Text>
                              {selectedLand.nutrientData?.macroNutrients?.n ||
                                'n/a'}
                            </Text>
                          </View>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">P</Text>
                            <Text>
                              {selectedLand.nutrientData?.macroNutrients?.p ||
                                'n/a'}
                            </Text>
                          </View>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">K</Text>
                            <Text>
                              {selectedLand.nutrientData?.macroNutrients?.k ||
                                'n/a'}
                            </Text>
                          </View>
                        </View>

                        <View className="gap-2">
                          <Text className="font-poppins-semibold">
                            Micro Nutrients
                          </Text>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">Zn</Text>
                            <Text>
                              {selectedLand.nutrientData?.microNutrients?.zn ||
                                'n/a'}
                            </Text>
                          </View>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">B</Text>
                            <Text>
                              {selectedLand.nutrientData?.microNutrients?.b ||
                                'n/a'}
                            </Text>
                          </View>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">Fe</Text>
                            <Text>
                              {selectedLand.nutrientData?.microNutrients?.fe ||
                                'n/a'}
                            </Text>
                          </View>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">Mn</Text>
                            <Text>
                              {selectedLand.nutrientData?.microNutrients?.mn ||
                                'n/a'}
                            </Text>
                          </View>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">Mo</Text>
                            <Text>
                              {selectedLand.nutrientData?.microNutrients?.mo ||
                                'n/a'}
                            </Text>
                          </View>
                          <View className="flex-row justify-between">
                            <Text className="font-poppins-light">Cu</Text>
                            <Text>
                              {selectedLand.nutrientData?.microNutrients?.cu ||
                                'n/a'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </FormCard>
                  </View>
                </>
              )}
            </>
          ) : (
            <View className="items-center gap-4">
              <Text className="text-center">
                No land accounts found. Please add a land account to view its
                nutrient portfolio.
              </Text>
              <Button
                onPress={() => router.push('/land-management')}
                label="Add Land Account"
                fullWidth={false}
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      {selectedLand && (
        <View className="absolute bottom-6 right-6">
          <Button
            onPress={handleNutrientManagementClick}
            variant="default"
            className="shadow-lg"
            label={
              <View className="flex-row items-center gap-2">
                <Text className="text-white">Update nutrients</Text>
                <PlusIcon className="-mr-2 mb-0.5" color="white" />
              </View>
            }
          />
        </View>
      )}
    </>
  );
}
