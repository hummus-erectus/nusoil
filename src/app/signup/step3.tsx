/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { SignupHeader } from '@/components/signup-header';
import { Button, FormCard, Input, Radio, Select, Text } from '@/components/ui';
import { CircleTick as CircleTickIcon } from '@/components/ui/icons';
import { useSignupStore } from '@/stores/signup-store';

const MONTH_OPTIONS = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => ({
    label: `${currentYear - i}`,
    value: `${currentYear - i}`,
  }));
};

const DATE_PICKER_OPTIONS = {
  month: {
    label: 'Month',
    options: MONTH_OPTIONS,
    placeholder: 'Select Month',
    testID: 'testing-month',
  },
  year: {
    label: 'Year',
    options: getYearOptions(),
    placeholder: 'Select Year',
    testID: 'testing-year',
  },
};

const soilTestingFrequencyOptions = [
  { label: 'Once a year', value: 'Once a year' },
  { label: 'Twice a year', value: 'Twice a year' },
  { label: 'Three times a year', value: 'Three times a year' },
  // Add more options as needed
];

// Soil test range options
const SOIL_TEST_RANGES = {
  ph: [
    { label: 'Very Acidic (<5.5)', value: '<5.5' },
    { label: 'Acidic (5.5-6.5)', value: '5.5-6.5' },
    { label: 'Neutral (6.5-7.5)', value: '6.5-7.5' },
    { label: 'Alkaline (>7.5)', value: '>7.5' },
  ],
  ec: [
    { label: 'Low (<0.8 dS/m)', value: '<0.8' },
    { label: 'Medium (0.8-1.6 dS/m)', value: '0.8-1.6' },
    { label: 'High (>1.6 dS/m)', value: '>1.6' },
  ],
  oc: [
    { label: 'Low (<0.5%)', value: '<0.5' },
    { label: 'Medium (0.5-0.75%)', value: '0.5-0.75' },
    { label: 'High (>0.75%)', value: '>0.75' },
  ],
  macro: [
    { label: 'Very Low', value: 'very_low' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Very High', value: 'very_high' },
  ],
  micro: [
    { label: 'Deficient', value: 'deficient' },
    { label: 'Adequate', value: 'adequate' },
    { label: 'Surplus', value: 'surplus' },
  ],
};

const ValueBasedForm = ({
  nutrientData,
  setNutrientData,
}: {
  nutrientData: any;
  setNutrientData: (data: any) => void;
}) => (
  <FormCard>
    <View className="gap-4">
      <Input
        label="pH Value"
        value={nutrientData.phValue}
        onChangeText={(value) => setNutrientData({ phValue: value })}
        placeholder="Enter pH value"
        keyboardType="numeric"
      />
      <Input
        label="EC Value (dS/m)"
        value={nutrientData.ecValue}
        onChangeText={(value) => setNutrientData({ ecValue: value })}
        placeholder="Enter EC value"
        keyboardType="numeric"
      />
      <Input
        label="OC Value (%)"
        value={nutrientData.ocValue}
        onChangeText={(value) => setNutrientData({ ocValue: value })}
        placeholder="Enter OC value"
        keyboardType="numeric"
      />

      <Text className="font-lora text-secondary">MACRO Nutrients</Text>
      <Input
        label="N Value"
        value={nutrientData.nValue}
        onChangeText={(value) => setNutrientData({ nValue: value })}
        placeholder="Enter N value"
        keyboardType="numeric"
      />
      <Input
        label="P Value"
        value={nutrientData.pValue}
        onChangeText={(value) => setNutrientData({ pValue: value })}
        placeholder="Enter P value"
        keyboardType="numeric"
      />
      <Input
        label="K Value"
        value={nutrientData.kValue}
        onChangeText={(value) => setNutrientData({ kValue: value })}
        placeholder="Enter K value"
        keyboardType="numeric"
      />

      <Text className="font-lora text-secondary">MICRO Nutrients</Text>
      <Input
        label="Zn Value"
        value={nutrientData.znValue}
        onChangeText={(value) => setNutrientData({ znValue: value })}
        placeholder="Enter Zn value"
        keyboardType="numeric"
      />
      <Input
        label="B Value"
        value={nutrientData.bValue}
        onChangeText={(value) => setNutrientData({ bValue: value })}
        placeholder="Enter B value"
        keyboardType="numeric"
      />
      <Input
        label="Fe Value"
        value={nutrientData.feValue}
        onChangeText={(value) => setNutrientData({ feValue: value })}
        placeholder="Enter Fe value"
        keyboardType="numeric"
      />
      <Input
        label="Mn Value"
        value={nutrientData.mnValue}
        onChangeText={(value) => setNutrientData({ mnValue: value })}
        placeholder="Enter Mn value"
        keyboardType="numeric"
      />
      <Input
        label="Mo Value"
        value={nutrientData.moValue}
        onChangeText={(value) => setNutrientData({ moValue: value })}
        placeholder="Enter Mo value"
        keyboardType="numeric"
      />
      <Input
        label="Cu Value"
        value={nutrientData.cuValue}
        onChangeText={(value) => setNutrientData({ cuValue: value })}
        placeholder="Enter Cu value"
        keyboardType="numeric"
      />
      <Input
        label="Cl Value"
        value={nutrientData.clValue}
        onChangeText={(value) => setNutrientData({ clValue: value })}
        placeholder="Enter Cl value"
        keyboardType="numeric"
      />
      <Input
        label="Ni Value"
        value={nutrientData.niValue}
        onChangeText={(value) => setNutrientData({ niValue: value })}
        placeholder="Enter Ni value"
        keyboardType="numeric"
      />
    </View>
  </FormCard>
);

const RangeBasedForm = ({
  nutrientData,
  setNutrientData,
}: {
  nutrientData: any;
  setNutrientData: (data: any) => void;
}) => (
  <FormCard>
    <View className="gap-4">
      <Text className="font-lora text-secondary">Parameters</Text>
      <Select
        label="pH Range"
        value={nutrientData.phRange || ''}
        onSelect={(value) => setNutrientData({ phRange: value.toString() })}
        options={SOIL_TEST_RANGES.ph}
        placeholder="Select..."
      />
      <Select
        label="EC Range"
        value={nutrientData.ecRange || ''}
        onSelect={(value) => setNutrientData({ ecRange: value.toString() })}
        options={SOIL_TEST_RANGES.ec}
        placeholder="Select..."
      />
      <Select
        label="OC Range"
        value={nutrientData.ocRange || ''}
        onSelect={(value) => setNutrientData({ ocRange: value.toString() })}
        options={SOIL_TEST_RANGES.oc}
        placeholder="Select..."
      />

      <Text className="font-lora text-secondary">Macro Nutrients</Text>
      <Select
        label="N Range"
        value={nutrientData.nRange || ''}
        onSelect={(value) => setNutrientData({ nRange: value.toString() })}
        options={SOIL_TEST_RANGES.macro}
        placeholder="Select..."
      />
      <Select
        label="P Range"
        value={nutrientData.pRange || ''}
        onSelect={(value) => setNutrientData({ pRange: value.toString() })}
        options={SOIL_TEST_RANGES.macro}
        placeholder="Select..."
      />
      <Select
        label="K Range"
        value={nutrientData.kRange || ''}
        onSelect={(value) => setNutrientData({ kRange: value.toString() })}
        options={SOIL_TEST_RANGES.macro}
        placeholder="Select..."
      />

      <Text className="font-lora text-secondary">Micro Nutrients</Text>
      <Select
        label="Zn Range"
        value={nutrientData.znRange || ''}
        onSelect={(value) => setNutrientData({ znRange: value.toString() })}
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="B Range"
        value={nutrientData.bRange || ''}
        onSelect={(value) => setNutrientData({ bRange: value.toString() })}
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Fe Range"
        value={nutrientData.feRange || ''}
        onSelect={(value) => setNutrientData({ feRange: value.toString() })}
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Mn Range"
        value={nutrientData.mnRange || ''}
        onSelect={(value) => setNutrientData({ mnRange: value.toString() })}
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Mo Range"
        value={nutrientData.moRange || ''}
        onSelect={(value) => setNutrientData({ moRange: value.toString() })}
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Cu Range"
        value={nutrientData.cuRange || ''}
        onSelect={(value) => setNutrientData({ cuRange: value.toString() })}
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Cl Range"
        value={nutrientData.clRange || ''}
        onSelect={(value) => setNutrientData({ clRange: value.toString() })}
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Ni Range"
        value={nutrientData.niRange || ''}
        onSelect={(value) => setNutrientData({ niRange: value.toString() })}
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
    </View>
  </FormCard>
);

export default function NutrientStep() {
  const { nutrientData, setNutrientData, resetSignupForm } = useSignupStore();
  const [soilTestInputType, setSoilTestInputType] = React.useState<
    'value' | 'range'
  >('value');

  const handleSubmit = () => {
    // TODO: Implement signup submission
    console.log('Submit signup data');

    // Reset form data after successful submission
    resetSignupForm();

    // Navigate to appropriate screen after signup
    router.push('/');
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 bg-neutral-100 p-6">
        <SignupHeader currentStep="nutrient" />

        <Text className="mb-6 text-center font-lora text-3xl text-neutral-700">
          Nutrients
        </Text>

        <View className="gap-6">
          <View className="gap-4">
            <Text className="text-secondary">
              Have you done nutrient testing?
            </Text>
            <FormCard>
              <View className="flex-row justify-between gap-4">
                <View className="flex-1">
                  <Radio
                    checked={nutrientData.nutrientTestingDone === true}
                    onChange={() =>
                      setNutrientData({ nutrientTestingDone: true })
                    }
                    label="Yes"
                    testID="testing-done-yes"
                    accessibilityLabel="Yes, nutrient testing is done"
                  />
                </View>
                <View className="flex-1">
                  <Radio
                    checked={nutrientData.nutrientTestingDone === false}
                    onChange={() =>
                      setNutrientData({ nutrientTestingDone: false })
                    }
                    label="No"
                    testID="testing-done-no"
                    accessibilityLabel="No, nutrient testing is not done"
                  />
                </View>
              </View>
            </FormCard>
          </View>

          <View className="gap-4">
            <Text className="text-secondary">How was the testing done?</Text>
            <FormCard>
              <View className="gap-4">
                <View className="flex-row justify-between gap-4">
                  <View className="flex-1">
                    <Radio
                      checked={nutrientData.testingType === 'soil'}
                      onChange={() => setNutrientData({ testingType: 'soil' })}
                      label="Soil based"
                      testID="testing-type-soil"
                      accessibilityLabel="Soil based nutrient testing"
                    />
                  </View>
                  <View className="flex-1">
                    <Radio
                      checked={nutrientData.testingType === 'water'}
                      onChange={() => setNutrientData({ testingType: 'water' })}
                      label="Water based"
                      testID="testing-type-water"
                      accessibilityLabel="Water based nutrient testing"
                    />
                  </View>
                </View>
                <View className="mt-2 flex-row gap-4">
                  <View className="flex-1">
                    <Radio
                      checked={nutrientData.testingType === 'plant'}
                      onChange={() => setNutrientData({ testingType: 'plant' })}
                      label="Plant based"
                      testID="testing-type-plant"
                      accessibilityLabel="Plant based nutrient testing"
                    />
                  </View>
                  <View className="flex-1" />
                </View>
              </View>
            </FormCard>
          </View>

          <View className="gap-4">
            <Text className="font-lora text-secondary">
              When was the last nutrient testing done?
            </Text>
            <FormCard>
              <View className="flex-row justify-between gap-4">
                <View className="flex-1">
                  <Select
                    label={DATE_PICKER_OPTIONS.month.label}
                    value={nutrientData.nutrientTestingMonth || ''}
                    onSelect={(value) =>
                      setNutrientData({
                        nutrientTestingMonth: value.toString(),
                      })
                    }
                    options={DATE_PICKER_OPTIONS.month.options}
                    placeholder={DATE_PICKER_OPTIONS.month.placeholder}
                    testID={DATE_PICKER_OPTIONS.month.testID}
                  />
                </View>
                <View className="flex-1">
                  <Select
                    label={DATE_PICKER_OPTIONS.year.label}
                    value={nutrientData.nutrientTestingYear || ''}
                    onSelect={(value) =>
                      setNutrientData({ nutrientTestingYear: value.toString() })
                    }
                    options={DATE_PICKER_OPTIONS.year.options}
                    placeholder={DATE_PICKER_OPTIONS.year.placeholder}
                    testID={DATE_PICKER_OPTIONS.year.testID}
                  />
                </View>
              </View>
            </FormCard>
          </View>

          <View className="my-8 h-px bg-neutral-300" />

          <View className="gap-4">
            <Text className="font-lora text-secondary">
              Have you done soil testing?
            </Text>
            <FormCard>
              <View className="flex-row justify-between gap-4">
                <View className="flex-1">
                  <Radio
                    checked={nutrientData.soilTestingDone === true}
                    onChange={() => setNutrientData({ soilTestingDone: true })}
                    label="Yes"
                    testID="testing-done-yes"
                    accessibilityLabel="Yes, soil testing is done"
                  />
                </View>
                <View className="flex-1">
                  <Radio
                    checked={nutrientData.soilTestingDone === false}
                    onChange={() => setNutrientData({ soilTestingDone: false })}
                    label="No"
                    testID="testing-done-no"
                    accessibilityLabel="No, soil testing is not done"
                  />
                </View>
              </View>
            </FormCard>
          </View>

          <View className="py-4">
            <Button
              // TODO: Check - should the option be disabled (as in Figma doc) if the soil test is done? Can't farmers book anyway?
              onPress={() => {
                // TODO: Implement booking a soil test functionality
                console.log('Booking a soil test');
              }}
              fullWidth={false}
              label="Book a Soil Test"
              disabled={nutrientData.soilTestingDone === true}
            />
          </View>

          <View className="gap-4">
            <Text className="font-lora text-secondary">
              When was the last soil testing done?
            </Text>
            <FormCard>
              {/* TODO: Check: Figma has this as a date picker but for now this matches the nutrient testing date select format */}
              <View className="flex-row justify-between gap-4">
                <View className="flex-1">
                  <Select
                    label={DATE_PICKER_OPTIONS.month.label}
                    value={nutrientData.soilTestingMonth || ''}
                    onSelect={(value) =>
                      setNutrientData({ soilTestingMonth: value.toString() })
                    }
                    options={DATE_PICKER_OPTIONS.month.options}
                    placeholder={DATE_PICKER_OPTIONS.month.placeholder}
                    testID={DATE_PICKER_OPTIONS.month.testID}
                  />
                </View>
                <View className="flex-1">
                  <Select
                    label={DATE_PICKER_OPTIONS.year.label}
                    value={nutrientData.soilTestingYear || ''}
                    onSelect={(value) =>
                      setNutrientData({ soilTestingYear: value.toString() })
                    }
                    options={DATE_PICKER_OPTIONS.year.options}
                    placeholder={DATE_PICKER_OPTIONS.year.placeholder}
                    testID={DATE_PICKER_OPTIONS.year.testID}
                  />
                </View>
              </View>
            </FormCard>
          </View>

          <View className="gap-4">
            <Text className="font-lora text-secondary">
              How Frequently Do You Do Soil Testing?
            </Text>
            <FormCard>
              <Select
                value={nutrientData.soilTestingFrequency || ''}
                onSelect={(value) =>
                  setNutrientData({ soilTestingFrequency: value.toString() })
                }
                options={soilTestingFrequencyOptions}
                label="Gap Between Soil Tests"
              />
            </FormCard>
          </View>

          <View className="gap-4">
            <Text className="font-lora text-xl text-secondary">
              Soil Test Results
            </Text>

            <View className="gap-2">
              <Text>Parameters</Text>
              <View className="width-[80%] mt-2 flex-row justify-between gap-4">
                <View className="flex-1">
                  <Radio
                    checked={soilTestInputType === 'value'}
                    onChange={() => setSoilTestInputType('value')}
                    label="Enter Value"
                    testID="soil-test-input-value"
                    accessibilityLabel="Enter specific soil test value"
                  />
                </View>
                <View className="flex-1">
                  <Radio
                    checked={soilTestInputType === 'range'}
                    onChange={() => setSoilTestInputType('range')}
                    label="Select Range"
                    testID="soil-test-input-range"
                    accessibilityLabel="Select a range for soil test value"
                  />
                </View>
              </View>
            </View>

            <FormCard>
              {soilTestInputType === 'value' ? (
                <ValueBasedForm
                  nutrientData={nutrientData}
                  setNutrientData={setNutrientData}
                />
              ) : (
                <RangeBasedForm
                  nutrientData={nutrientData}
                  setNutrientData={setNutrientData}
                />
              )}
            </FormCard>
          </View>

          <View className="mb-8 mt-4">
            <Button
              onPress={handleSubmit}
              fullWidth={false}
              label={
                <View className="flex-row items-center justify-center">
                  <Text className="mr-4 text-white">Save</Text>
                  <CircleTickIcon color="white" />
                </View>
              }
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
