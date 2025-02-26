/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import * as React from 'react';
// import { Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, FormCard, Select, Text, View } from '@/components/ui';
import { Plus as PlusIcon } from '@/components/ui/icons';
import { type Land, type SoilTest, useUserStore } from '@/stores/user-store';

export default function NutrientPortfolio() {
  const { lands, selectedLandId, setSelectedLandId } = useUserStore();
  const accountOptions =
    lands?.map((land) => ({
      label: land.farmLocationName || 'Unnamed Land',
      value: land.id,
    })) || [];

  const selectedLand = lands?.find((land) => land.id === selectedLandId);
  const hasSoilTestInProgress =
    selectedLand?.soilTestStatus && selectedLand.soilTestStatus !== 'report';

  // Get the latest soil test data
  const getLatestSoilTest = (land: Land) => {
    if (!land.soilTests || land.soilTests.length === 0) return null;
    return land.soilTests.reduce(
      (latest, current) => {
        if (!latest) return current;
        return new Date(current.createdAt) > new Date(latest.createdAt)
          ? current
          : latest;
      },
      null as SoilTest | null
    );
  };

  const latestSoilTest = selectedLand ? getLatestSoilTest(selectedLand) : null;

  // const openInMaps = (lat: number, lng: number) => {
  //   const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  //   Linking.openURL(url);
  // };

  const handleNutrientManagementClick = () => {
    router.push('/(app)/(tabs)/nutrient-portfolio/nutrient-management');
  };

  const handleOrderSoilTest = () => {
    if (selectedLandId) {
      router.push({
        pathname: '/soil-test/order',
        params: { landId: selectedLandId },
      });
    }
  };

  const handleViewProgress = () => {
    if (selectedLandId) {
      router.push({
        pathname: '/soil-test/progress',
        params: { landId: selectedLandId },
      });
    }
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

                  {latestSoilTest ? (
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
                                {latestSoilTest?.parameters?.ph || 'n/a'}
                              </Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="font-poppins-light">EC</Text>
                              <Text>
                                {latestSoilTest?.parameters?.ec || 'n/a'}
                              </Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="font-poppins-light">OC</Text>
                              <Text>
                                {latestSoilTest?.parameters?.oc || 'n/a'}
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
                                {latestSoilTest?.macroNutrients?.n || 'n/a'}
                              </Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="font-poppins-light">P</Text>
                              <Text>
                                {latestSoilTest?.macroNutrients?.p || 'n/a'}
                              </Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="font-poppins-light">K</Text>
                              <Text>
                                {latestSoilTest?.macroNutrients?.k || 'n/a'}
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
                                {latestSoilTest?.microNutrients?.zn || 'n/a'}
                              </Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="font-poppins-light">B</Text>
                              <Text>
                                {latestSoilTest?.microNutrients?.b || 'n/a'}
                              </Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="font-poppins-light">Fe</Text>
                              <Text>
                                {latestSoilTest?.microNutrients?.fe || 'n/a'}
                              </Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="font-poppins-light">Mn</Text>
                              <Text>
                                {latestSoilTest?.microNutrients?.mn || 'n/a'}
                              </Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="font-poppins-light">Mo</Text>
                              <Text>
                                {latestSoilTest?.microNutrients?.mo || 'n/a'}
                              </Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="font-poppins-light">Cu</Text>
                              <Text>
                                {latestSoilTest?.microNutrients?.cu || 'n/a'}
                              </Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="font-poppins-light">Cl</Text>
                              <Text>
                                {latestSoilTest?.microNutrients?.cl || 'n/a'}
                              </Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="font-poppins-light">Ni</Text>
                              <Text>
                                {latestSoilTest?.microNutrients?.ni || 'n/a'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </FormCard>
                    </View>
                  ) : (
                    <View className="gap-4 pb-20">
                      {hasSoilTestInProgress ? (
                        <>
                          <View className="rounded-xl bg-white p-6 shadow-sm">
                            <Text className="mb-4 text-center font-poppins-semibold text-xl text-primary">
                              Soil Test in Progress
                            </Text>
                            <Text className="font-poppins mb-6 text-center text-base text-neutral-600">
                              Your soil test for{' '}
                              {selectedLand?.farmLocationName} is currently
                              being processed.
                            </Text>
                            <Button
                              onPress={handleViewProgress}
                              label="View Progress"
                            />
                          </View>
                          <View className="flex-row justify-center">
                            <Text>
                              You can also add soil test data manually{' '}
                            </Text>
                            <Button
                              variant="link"
                              onPress={() =>
                                router.push({
                                  pathname: '/soil-test/form',
                                  params: { landId: selectedLandId },
                                })
                              }
                              label="here"
                            />
                          </View>
                        </>
                      ) : (
                        <>
                          <Text className="text-center font-lora text-xl text-primary">
                            No Soil Test Data Available
                          </Text>
                          <Text className="text-center text-neutral-600">
                            To begin using the Nutrient Portfolio, please add
                            soil test data or order a soil test.
                          </Text>
                          <View className="gap-4">
                            <Button
                              variant="secondary"
                              onPress={() =>
                                router.push({
                                  pathname: '/soil-test/form',
                                  params: { landId: selectedLandId },
                                })
                              }
                              label="Add Soil Test Results"
                            />

                            <Button
                              onPress={handleOrderSoilTest}
                              disabled={!selectedLandId}
                              label="Order Soil Test"
                            />
                          </View>
                        </>
                      )}
                    </View>
                  )}
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
      {selectedLand && latestSoilTest && (
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
