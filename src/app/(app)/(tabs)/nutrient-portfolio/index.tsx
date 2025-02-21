/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import * as React from 'react';
// import { Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, colors, FormCard, Select, Text, View } from '@/components/ui';
import { ArrowRightFull as ArrowRightFullIcon } from '@/components/ui/icons';
import { useLandStore } from '@/stores/land-store';

// interface Location {
//   latitude: number;
//   longitude: number;
//   name: string;
// }

// interface NutrientData {
//   parameters: {
//     ph: number;
//     ec: number;
//     oc: number;
//   };
//   macroNutrients: {
//     n: number;
//     p: number;
//     k: number;
//   };
//   microNutrients: {
//     zn: number;
//     b: number;
//     fe: number;
//     mn: number;
//     mo: number;
//     cu: number;
//   };
// }

export default function NutrientPortfolio() {
  const { lands, selectedLandId, setSelectedLandId } = useLandStore();
  const accountOptions = lands.map((land) => ({
    label: land.farmLocationName || 'Unnamed Land',
    value: land.id,
  }));

  const selectedLand = lands.find((land) => land.id === selectedLandId);

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

          <Button
            variant="link"
            label={
              <View className="flex-row items-center gap-2">
                <Text className="text-primary">Go to Nutrient Management</Text>
                <ArrowRightFullIcon color={colors.primary} />
              </View>
            }
            onPress={handleNutrientManagementClick}
          />

          <Select
            options={accountOptions}
            label="Select Account"
            value={selectedLandId || ''}
            onSelect={(value) => setSelectedLandId(value.toString())}
          />

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

          <View className="gap-4">
            <Text className="font-lora text-xl text-primary">
              Major Nutrient Availability
            </Text>
            <FormCard>
              {selectedLand?.nutrientData && (
                <View className="gap-6">
                  <View className="gap-2">
                    <Text className="font-poppins-semibold">Parameters</Text>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">pH</Text>
                      <Text>{selectedLand.nutrientData.parameters.ph}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">EC</Text>
                      <Text>{selectedLand.nutrientData.parameters.ec}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">OC</Text>
                      <Text>{selectedLand.nutrientData.parameters.oc}</Text>
                    </View>
                  </View>

                  <View className="gap-2">
                    <Text className="font-poppins-semibold">
                      Macro Nutrients
                    </Text>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">N</Text>
                      <Text>{selectedLand.nutrientData.macroNutrients.n}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">P</Text>
                      <Text>{selectedLand.nutrientData.macroNutrients.p}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">K</Text>
                      <Text>{selectedLand.nutrientData.macroNutrients.k}</Text>
                    </View>
                  </View>

                  <View className="gap-2">
                    <Text className="font-poppins-semibold">
                      Micro Nutrients
                    </Text>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">Zn</Text>
                      <Text>{selectedLand.nutrientData.microNutrients.zn}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">B</Text>
                      <Text>{selectedLand.nutrientData.microNutrients.b}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">Fe</Text>
                      <Text>{selectedLand.nutrientData.microNutrients.fe}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">Mn</Text>
                      <Text>{selectedLand.nutrientData.microNutrients.mn}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">Mo</Text>
                      <Text>{selectedLand.nutrientData.microNutrients.mo}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-light">Cu</Text>
                      <Text>{selectedLand.nutrientData.microNutrients.cu}</Text>
                    </View>
                  </View>
                </View>
              )}
            </FormCard>
          </View>
          <View>
            <Button
              onPress={handleNutrientManagementClick}
              fullWidth={false}
              label="Manage Nutrients"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
