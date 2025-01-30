/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { SignupHeader } from '@/components/signup-header';
import { Button, colors, FormCard, Input, Select, Text } from '@/components/ui';
import {
  ArrowRightFull as ArrowRightFullIcon,
  Upload as UploadIcon,
} from '@/components/ui/icons';
import { useSignupStore } from '@/stores/signup-store';

const irrigationOptions = [
  { label: 'Drip', value: 'Drip' },
  { label: 'Sprinkler', value: 'Sprinkler' },
  { label: 'Misting', value: 'Misting' },
  { label: 'Manual', value: 'Manual' },
  // Add more options as needed
];

const ownershipOptions = [
  { label: 'Leased Land', value: 'Leased Land' },
  { label: 'Owned Land', value: 'Owned Land' },
  // Add more options as needed
];

const rainWaterOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const groundWaterOptions = [
  { label: 'Dug Well', value: 'Dug Well' },
  { label: 'Spring', value: 'Spring' },
  // Add more options as needed
];

const waterIrrigationTypeOptions = [
  { label: 'Major Irrigation', value: 'Major Irrigation' },
  { label: 'Minor Irrigation', value: 'Minor Irrigation' },
  // Add more options as needed
];

const waterPumpOptions = [
  { label: 'Solar', value: 'Solar' },
  { label: 'Manual', value: 'Manual' },
  // Add more options as needed
];

const tillageOptions = [
  { label: 'No Tillage', value: 'No Tillage' },
  { label: 'Subsoiling', value: 'Subsoiling' },
  { label: 'Deep Ploughing', value: 'Deep Ploughing' },
  // Add more options as needed
];

const cropsPerYearOptions = [
  { label: 'One', value: 'One' },
  { label: 'Two', value: 'Two' },
  { label: 'More than Two', value: 'More than Two' },
  // Add more options as needed. Make numeric?
];

const cropTypeOptions = [
  { label: 'Mono Crop', value: 'Mono Crop' },
  { label: 'Multi Crop', value: 'Multi Crop' },
  // Add more options as needed
];

export default function FarmStep() {
  const { farmData, setFarmData } = useSignupStore();

  const handleNext = () => {
    router.push('/signup/step3');
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 p-6">
        <SignupHeader currentStep="farm" />

        <Text className="mb-6 text-center font-lora text-3xl text-neutral-700">
          Farm Land
        </Text>

        <View className="gap-6">
          <View className="gap-4">
            <Text className="font-lora text-secondary">
              Physical Location of Your Farm
            </Text>
            <FormCard className="gap-4">
              <Input
                value={farmData.farmLocationName}
                onChangeText={(text) => setFarmData({ farmLocationName: text })}
                placeholder="Location Place Name"
              />
              <Input
                value={farmData.farmCity}
                onChangeText={(text) => setFarmData({ farmCity: text })}
                placeholder="City (PIN /Zip Number)"
              />
            </FormCard>
            <FormCard>
              {/* TODO: Check input for latitude and longitude */}
              <Input
                value={farmData.latLong}
                onChangeText={(text) => setFarmData({ latLong: text })}
                placeholder="Lat/Long"
              />
            </FormCard>
            <FormCard className="gap-6">
              {/* TODO: Figure out upload */}
              <Text className="text-sm text-neutral-600">
                Create a Polygon Map
              </Text>
              <Button
                variant="secondary"
                fullWidth={false}
                label={
                  <View className="flex-row items-center justify-center">
                    <UploadIcon color={colors.primary} />
                    <Text className="ml-2 text-primary">Upload</Text>
                  </View>
                }
              />
            </FormCard>
          </View>

          <View className="gap-4">
            <Text className="font-lora text-secondary">Ownership</Text>
            <FormCard className="gap-4">
              <Select
                value={farmData.ownershipType}
                onSelect={(value) =>
                  setFarmData({ ownershipType: value.toString() })
                }
                options={ownershipOptions}
                label="Ownership Type"
              />
              {/* TODO: Clarify */}
              <Input
                value={farmData.yearsOperated}
                onChangeText={(text) => setFarmData({ yearsOperated: text })}
                placeholder="Number of Years Operated"
              />
              {/* TODO: Clarify - acres? Value? */}
              <Input
                value={farmData.leasedAmount}
                onChangeText={(text) => setFarmData({ leasedAmount: text })}
                placeholder="Leased Amount"
              />
            </FormCard>
          </View>

          <View className="gap-4">
            <Text className="font-lora text-secondary">Water Availability</Text>
            <FormCard className="gap-4">
              <Select
                value={farmData.rainWater}
                onSelect={(value) =>
                  setFarmData({ rainWater: value.toString() })
                }
                options={rainWaterOptions}
                label="Rain Water"
              />
              <Select
                value={farmData.groundWater}
                onSelect={(value) =>
                  setFarmData({ groundWater: value.toString() })
                }
                options={groundWaterOptions}
                label="Ground Water"
              />
              <Select
                value={farmData.waterIrrigationType}
                onSelect={(value) =>
                  setFarmData({ waterIrrigationType: value.toString() })
                }
                options={waterIrrigationTypeOptions}
                label="Water Irrigation Type"
              />
              {/* TODO: Clarify - Days per what? */}
              <Input
                value={farmData.waterDays}
                onChangeText={(number) => setFarmData({ waterDays: number })}
                placeholder="Number of Days"
                keyboardType="numeric"
              />
            </FormCard>
          </View>

          <View className="gap-4">
            <Text className="font-lora text-secondary">
              Irrigation Technology
            </Text>
            <FormCard className="gap-4">
              {/* TODO: Clarify - there is already a field for irrigation type above */}
              <Select
                value={farmData.irrigationType}
                onSelect={(value) =>
                  setFarmData({ irrigationType: value.toString() })
                }
                options={irrigationOptions}
                label="Irrigation Type"
              />
              <Select
                value={farmData.waterPump}
                onSelect={(value) =>
                  setFarmData({ waterPump: value.toString() })
                }
                options={waterPumpOptions}
                label="Water Pump"
              />
            </FormCard>
          </View>

          <View className="gap-4">
            <Text className="font-lora text-secondary">Tillage Practices</Text>
            <FormCard className="gap-4">
              <Select
                value={farmData.tillageType}
                onSelect={(value) =>
                  setFarmData({ tillageType: value.toString() })
                }
                options={tillageOptions}
                label="Tillage Practices"
              />
            </FormCard>
          </View>

          <View className="gap-4">
            <Text className="font-lora text-secondary">Land Use Intensity</Text>
            <FormCard className="gap-4">
              <Select
                value={farmData.cropsPerYear}
                onSelect={(value) =>
                  setFarmData({ cropsPerYear: value.toString() })
                }
                options={cropsPerYearOptions}
                label="Number of Crops per Calendar Year"
              />
              <Input
                value={farmData.cropDuration}
                onChangeText={(number) => setFarmData({ cropDuration: number })}
                placeholder="Crop Duration (Days Average)"
                keyboardType="numeric"
              />
              <Select
                value={farmData.cropType}
                onSelect={(value) =>
                  setFarmData({ cropType: value.toString() })
                }
                options={cropTypeOptions}
                label="Type"
              />
            </FormCard>
          </View>

          <View className="gap-4">
            <Text className="font-lora text-secondary">Cost</Text>
            <FormCard className="gap-4">
              {/* TODO: Validation for cost input */}
              <View className="flex w-full flex-row items-center">
                <View className="flex-1">
                  <Input
                    value={farmData.leasedLandCost}
                    onChangeText={(number) =>
                      setFarmData({ leasedLandCost: number })
                    }
                    placeholder="00.00"
                    label="Cost of Leased Land"
                    keyboardType="numeric"
                  />
                </View>
                <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
              </View>

              <View className="flex w-full flex-row items-center">
                <View className="flex-1">
                  <Input
                    value={farmData.tillageCost}
                    onChangeText={(number) =>
                      setFarmData({ tillageCost: number })
                    }
                    placeholder="00.00"
                    label="Tillage Cost"
                    keyboardType="numeric"
                  />
                </View>
                <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
              </View>

              <View className="flex w-full flex-row items-center">
                <View className="flex-1">
                  <Input
                    value={farmData.fertilizerCost}
                    onChangeText={(number) =>
                      setFarmData({ fertilizerCost: number })
                    }
                    placeholder="00.00"
                    label="Fertilizer Cost"
                    keyboardType="numeric"
                  />
                </View>
                <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
              </View>

              <View className="flex w-full flex-row items-center">
                <View className="flex-1">
                  <Input
                    value={farmData.pestDiseaseCost}
                    onChangeText={(number) =>
                      setFarmData({ pestDiseaseCost: number })
                    }
                    placeholder="00.00"
                    label="Pest and Disease Management Cost"
                    keyboardType="numeric"
                  />
                </View>
                <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
              </View>

              <View className="flex w-full flex-row items-center">
                <View className="flex-1">
                  <Input
                    value={farmData.cropYieldAverage}
                    onChangeText={(number) =>
                      setFarmData({ cropYieldAverage: number })
                    }
                    placeholder="00.00"
                    label="Yield Average from All Crops"
                    keyboardType="numeric"
                  />
                </View>
                <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
              </View>

              <View className="flex w-full flex-row items-center">
                <View className="flex-1">
                  <Input
                    value={farmData.income}
                    onChangeText={(number) => setFarmData({ income: number })}
                    placeholder="00.00"
                    label="Income per year"
                    keyboardType="numeric"
                  />
                </View>
                <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
              </View>
            </FormCard>
          </View>
        </View>
        <View className="my-8">
          <Button
            onPress={handleNext}
            fullWidth={false}
            label={
              <View className="flex-row items-center justify-center">
                <Text className="mr-4 text-white">Next</Text>
                <ArrowRightFullIcon color="white" />
              </View>
            }
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
