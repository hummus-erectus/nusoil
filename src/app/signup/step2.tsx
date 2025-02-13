/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { SignupHeader } from '@/components/signup-header';
import { Button, colors, FormCard, Input, Select, Text } from '@/components/ui';
import {
  ArrowRightFull as ArrowRightFullIcon,
  Plus as PlusIcon,
  Trash as TrashIcon,
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
  const { control } = useForm({
    defaultValues: {
      lands: farmData.lands,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lands',
  });

  const handleNext = () => {
    router.push('/signup/step3');
  };

  const handleAddLand = () => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    const newId = `land_${timestamp}_${randomSuffix}`;

    const newLand = {
      id: newId,
      farmLocationName: '',
      farmCity: '',
      size: 0,
      irrigationType: '',
      latLong: '',
      ownershipType: '',
      yearsOperated: '',
      leasedAmount: '',
      rainWater: '',
      groundWater: '',
      waterIrrigationType: '',
      waterDays: '',
      waterPump: '',
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

    // Update both form fields and store
    append(newLand);
    setFarmData({ lands: [...farmData.lands, newLand] });
  };

  const handleRemoveLand = (index: number) => {
    remove(index);
    setFarmData({
      lands: farmData.lands.filter((_, i) => i !== index),
    });
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
          {fields.map((field, index) => (
            <View key={field.id} className="gap-6">
              <View className="flex-row items-center justify-between">
                <Text className="font-lora text-xl text-secondary">
                  Land {index + 1}
                </Text>
                {fields.length > 1 && (
                  <Button
                    variant="ghost"
                    fullWidth={false}
                    onPress={() => handleRemoveLand(index)}
                    label={
                      <View className="flex-row items-center justify-center">
                        <TrashIcon color={colors.danger} />
                        <Text className="ml-2 text-danger">Remove</Text>
                      </View>
                    }
                  />
                )}
              </View>

              <View className="gap-4">
                <Text className="font-lora text-secondary">
                  Physical Location of Your Farm
                </Text>
                <FormCard className="gap-4">
                  <Input
                    value={farmData.lands[index]?.farmLocationName || ''}
                    onChangeText={(text) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index
                            ? { ...land, farmLocationName: text }
                            : land
                        ),
                      })
                    }
                    placeholder="Location Place Name"
                  />
                  <Input
                    value={farmData.lands[index]?.farmCity || ''}
                    onChangeText={(text) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index ? { ...land, farmCity: text } : land
                        ),
                      })
                    }
                    placeholder="City (PIN /Zip Number)"
                  />
                </FormCard>
                <FormCard>
                  <Input
                    value={farmData.lands[index]?.latLong || ''}
                    onChangeText={(text) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index ? { ...land, latLong: text } : land
                        ),
                      })
                    }
                    placeholder="Lat/Long"
                  />
                </FormCard>
                <FormCard className="gap-6">
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
                    value={farmData.lands[index]?.ownershipType || ''}
                    onSelect={(value) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index
                            ? { ...land, ownershipType: value.toString() }
                            : land
                        ),
                      })
                    }
                    options={ownershipOptions}
                    label="Ownership Type"
                  />
                  <Input
                    value={farmData.lands[index]?.yearsOperated || ''}
                    onChangeText={(text) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index ? { ...land, yearsOperated: text } : land
                        ),
                      })
                    }
                    placeholder="Number of Years Operated"
                  />
                  <Input
                    value={farmData.lands[index]?.leasedAmount || ''}
                    onChangeText={(text) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index ? { ...land, leasedAmount: text } : land
                        ),
                      })
                    }
                    placeholder="Leased Amount"
                  />
                </FormCard>
              </View>

              <View className="gap-4">
                <Text className="font-lora text-secondary">
                  Water Availability
                </Text>
                <FormCard className="gap-4">
                  <Select
                    value={farmData.lands[index]?.rainWater || ''}
                    onSelect={(value) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index
                            ? { ...land, rainWater: value.toString() }
                            : land
                        ),
                      })
                    }
                    options={rainWaterOptions}
                    label="Rain Water"
                  />
                  <Select
                    value={farmData.lands[index]?.groundWater || ''}
                    onSelect={(value) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index
                            ? { ...land, groundWater: value.toString() }
                            : land
                        ),
                      })
                    }
                    options={groundWaterOptions}
                    label="Ground Water"
                  />
                  <Select
                    value={farmData.lands[index]?.waterIrrigationType || ''}
                    onSelect={(value) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index
                            ? { ...land, waterIrrigationType: value.toString() }
                            : land
                        ),
                      })
                    }
                    options={waterIrrigationTypeOptions}
                    label="Water Irrigation Type"
                  />
                  <Input
                    value={farmData.lands[index]?.waterDays || ''}
                    onChangeText={(number) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index ? { ...land, waterDays: number } : land
                        ),
                      })
                    }
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
                  <Select
                    value={farmData.lands[index]?.irrigationType || ''}
                    onSelect={(value) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index
                            ? { ...land, irrigationType: value.toString() }
                            : land
                        ),
                      })
                    }
                    options={irrigationOptions}
                    label="Irrigation Type"
                  />
                  <Select
                    value={farmData.lands[index]?.waterPump || ''}
                    onSelect={(value) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index
                            ? { ...land, waterPump: value.toString() }
                            : land
                        ),
                      })
                    }
                    options={waterPumpOptions}
                    label="Water Pump"
                  />
                </FormCard>
              </View>

              <View className="gap-4">
                <Text className="font-lora text-secondary">
                  Tillage Practices
                </Text>
                <FormCard className="gap-4">
                  <Select
                    value={farmData.lands[index]?.tillageType || ''}
                    onSelect={(value) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index
                            ? { ...land, tillageType: value.toString() }
                            : land
                        ),
                      })
                    }
                    options={tillageOptions}
                    label="Tillage Practices"
                  />
                </FormCard>
              </View>

              <View className="gap-4">
                <Text className="font-lora text-secondary">
                  Land Use Intensity
                </Text>
                <FormCard className="gap-4">
                  <Select
                    value={farmData.lands[index]?.cropsPerYear || ''}
                    onSelect={(value) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index
                            ? { ...land, cropsPerYear: value.toString() }
                            : land
                        ),
                      })
                    }
                    options={cropsPerYearOptions}
                    label="Number of Crops per Calendar Year"
                  />
                  <Input
                    value={farmData.lands[index]?.cropDuration || ''}
                    onChangeText={(number) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index ? { ...land, cropDuration: number } : land
                        ),
                      })
                    }
                    placeholder="Crop Duration (Days Average)"
                    keyboardType="numeric"
                  />
                  <Select
                    value={farmData.lands[index]?.cropType || ''}
                    onSelect={(value) =>
                      setFarmData({
                        lands: farmData.lands.map((land, i) =>
                          i === index
                            ? { ...land, cropType: value.toString() }
                            : land
                        ),
                      })
                    }
                    options={cropTypeOptions}
                    label="Type"
                  />
                </FormCard>
              </View>

              <View className="gap-4">
                <Text className="font-lora text-secondary">Cost</Text>
                <FormCard className="gap-4">
                  <View className="flex w-full flex-row items-center">
                    <View className="flex-1">
                      <Input
                        value={farmData.lands[index]?.leasedLandCost || ''}
                        onChangeText={(number) =>
                          setFarmData({
                            lands: farmData.lands.map((land, i) =>
                              i === index
                                ? { ...land, leasedLandCost: number }
                                : land
                            ),
                          })
                        }
                        placeholder="00.00"
                        label="Cost of Leased Land"
                        keyboardType="numeric"
                      />
                    </View>
                    <Text className="ml-4 pt-2 text-sm text-neutral-600">
                      EUR
                    </Text>
                  </View>

                  <View className="flex w-full flex-row items-center">
                    <View className="flex-1">
                      <Input
                        value={farmData.lands[index]?.tillageCost || ''}
                        onChangeText={(number) =>
                          setFarmData({
                            lands: farmData.lands.map((land, i) =>
                              i === index
                                ? { ...land, tillageCost: number }
                                : land
                            ),
                          })
                        }
                        placeholder="00.00"
                        label="Tillage Cost"
                        keyboardType="numeric"
                      />
                    </View>
                    <Text className="ml-4 pt-2 text-sm text-neutral-600">
                      EUR
                    </Text>
                  </View>

                  <View className="flex w-full flex-row items-center">
                    <View className="flex-1">
                      <Input
                        value={farmData.lands[index]?.fertilizerCost || ''}
                        onChangeText={(number) =>
                          setFarmData({
                            lands: farmData.lands.map((land, i) =>
                              i === index
                                ? { ...land, fertilizerCost: number }
                                : land
                            ),
                          })
                        }
                        placeholder="00.00"
                        label="Fertilizer Cost"
                        keyboardType="numeric"
                      />
                    </View>
                    <Text className="ml-4 pt-2 text-sm text-neutral-600">
                      EUR
                    </Text>
                  </View>

                  <View className="flex w-full flex-row items-center">
                    <View className="flex-1">
                      <Input
                        value={farmData.lands[index]?.pestDiseaseCost || ''}
                        onChangeText={(number) =>
                          setFarmData({
                            lands: farmData.lands.map((land, i) =>
                              i === index
                                ? { ...land, pestDiseaseCost: number }
                                : land
                            ),
                          })
                        }
                        placeholder="00.00"
                        label="Pest and Disease Management Cost"
                        keyboardType="numeric"
                      />
                    </View>
                    <Text className="ml-4 pt-2 text-sm text-neutral-600">
                      EUR
                    </Text>
                  </View>

                  <View className="flex w-full flex-row items-center">
                    <View className="flex-1">
                      <Input
                        value={farmData.lands[index]?.cropYieldAverage || ''}
                        onChangeText={(number) =>
                          setFarmData({
                            lands: farmData.lands.map((land, i) =>
                              i === index
                                ? { ...land, cropYieldAverage: number }
                                : land
                            ),
                          })
                        }
                        placeholder="00.00"
                        label="Yield Average from All Crops"
                        keyboardType="numeric"
                      />
                    </View>
                    <Text className="ml-4 pt-2 text-sm text-neutral-600">
                      EUR
                    </Text>
                  </View>

                  <View className="flex w-full flex-row items-center">
                    <View className="flex-1">
                      <Input
                        value={farmData.lands[index]?.income || ''}
                        onChangeText={(number) =>
                          setFarmData({
                            lands: farmData.lands.map((land, i) =>
                              i === index ? { ...land, income: number } : land
                            ),
                          })
                        }
                        placeholder="00.00"
                        label="Income per year"
                        keyboardType="numeric"
                      />
                    </View>
                    <Text className="ml-4 pt-2 text-sm text-neutral-600">
                      EUR
                    </Text>
                  </View>
                </FormCard>
              </View>
            </View>
          ))}

          <Button
            onPress={handleAddLand}
            variant="secondary"
            fullWidth={false}
            label={
              <View className="flex-row items-center justify-center">
                <PlusIcon color={colors.primary} />
                <Text className="ml-2 text-primary">Add Another Land</Text>
              </View>
            }
          />
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
