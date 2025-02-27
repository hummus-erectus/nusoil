/* eslint-disable import/no-unresolved */
/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import {
  Button,
  colors,
  FormCard,
  Input,
  Radio,
  Select,
  Text,
} from '@/components/ui';
import {
  ArrowLeftFull as ArrowLeftFullIcon,
  CircleTick as CircleTickIcon,
} from '@/components/ui/icons';
import { type SoilTest } from '@/stores/user-store';
import { useUserStore } from '@/stores/user-store';

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

interface SoilTestFormData {
  id: string;
  testingType: 'value' | 'range';
  createdAt: string;
  // Value-based inputs
  phValue?: string;
  ecValue?: string;
  ocValue?: string;
  nValue?: string;
  pValue?: string;
  kValue?: string;
  znValue?: string;
  bValue?: string;
  feValue?: string;
  mnValue?: string;
  moValue?: string;
  cuValue?: string;
  clValue?: string;
  niValue?: string;
  // Range-based inputs
  phRange?: string;
  ecRange?: string;
  ocRange?: string;
  nRange?: string;
  pRange?: string;
  kRange?: string;
  znRange?: string;
  bRange?: string;
  feRange?: string;
  mnRange?: string;
  moRange?: string;
  cuRange?: string;
  clRange?: string;
  niRange?: string;
}

const ValueBasedForm = ({
  soilTestData,
  setSoilTestData,
}: {
  soilTestData: SoilTestFormData;
  setSoilTestData: React.Dispatch<React.SetStateAction<SoilTestFormData>>;
}) => (
  <FormCard>
    <View className="gap-4">
      <Input
        label="pH Value"
        value={soilTestData.phValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            phValue: value,
          }))
        }
        placeholder="Enter pH value"
        keyboardType="numeric"
      />
      <Input
        label="EC Value (dS/m)"
        value={soilTestData.ecValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            ecValue: value,
          }))
        }
        placeholder="Enter EC value"
        keyboardType="numeric"
      />
      <Input
        label="OC Value (%)"
        value={soilTestData.ocValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            ocValue: value,
          }))
        }
        placeholder="Enter OC value"
        keyboardType="numeric"
      />

      <Text className="font-lora text-secondary">MACRO Nutrients</Text>
      <Input
        label="N Value"
        value={soilTestData.nValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            nValue: value,
          }))
        }
        placeholder="Enter N value"
        keyboardType="numeric"
      />
      <Input
        label="P Value"
        value={soilTestData.pValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            pValue: value,
          }))
        }
        placeholder="Enter P value"
        keyboardType="numeric"
      />
      <Input
        label="K Value"
        value={soilTestData.kValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            kValue: value,
          }))
        }
        placeholder="Enter K value"
        keyboardType="numeric"
      />

      <Text className="font-lora text-secondary">MICRO Nutrients</Text>
      <Input
        label="Zn Value"
        value={soilTestData.znValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            znValue: value,
          }))
        }
        placeholder="Enter Zn value"
        keyboardType="numeric"
      />
      <Input
        label="B Value"
        value={soilTestData.bValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            bValue: value,
          }))
        }
        placeholder="Enter B value"
        keyboardType="numeric"
      />
      <Input
        label="Fe Value"
        value={soilTestData.feValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            feValue: value,
          }))
        }
        placeholder="Enter Fe value"
        keyboardType="numeric"
      />
      <Input
        label="Mn Value"
        value={soilTestData.mnValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            mnValue: value,
          }))
        }
        placeholder="Enter Mn value"
        keyboardType="numeric"
      />
      <Input
        label="Mo Value"
        value={soilTestData.moValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            moValue: value,
          }))
        }
        placeholder="Enter Mo value"
        keyboardType="numeric"
      />
      <Input
        label="Cu Value"
        value={soilTestData.cuValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            cuValue: value,
          }))
        }
        placeholder="Enter Cu value"
        keyboardType="numeric"
      />
      <Input
        label="Cl Value"
        value={soilTestData.clValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            clValue: value,
          }))
        }
        placeholder="Enter Cl value"
        keyboardType="numeric"
      />
      <Input
        label="Ni Value"
        value={soilTestData.niValue}
        onChangeText={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            niValue: value,
          }))
        }
        placeholder="Enter Ni value"
        keyboardType="numeric"
      />
    </View>
  </FormCard>
);

const RangeBasedForm = ({
  soilTestData,
  setSoilTestData,
}: {
  soilTestData: SoilTestFormData;
  setSoilTestData: React.Dispatch<React.SetStateAction<SoilTestFormData>>;
}) => (
  <FormCard>
    <View className="gap-4">
      <Select
        label="pH Range"
        value={soilTestData.phRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            phRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.ph}
        placeholder="Select..."
      />
      <Select
        label="EC Range"
        value={soilTestData.ecRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            ecRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.ec}
        placeholder="Select..."
      />
      <Select
        label="OC Range"
        value={soilTestData.ocRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            ocRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.oc}
        placeholder="Select..."
      />

      <Text className="font-lora text-secondary">MACRO Nutrients</Text>
      <Select
        label="N Range"
        value={soilTestData.nRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            nRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.macro}
        placeholder="Select..."
      />
      <Select
        label="P Range"
        value={soilTestData.pRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            pRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.macro}
        placeholder="Select..."
      />
      <Select
        label="K Range"
        value={soilTestData.kRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            kRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.macro}
        placeholder="Select..."
      />

      <Text className="font-lora text-secondary">MICRO Nutrients</Text>
      <Select
        label="Zn Range"
        value={soilTestData.znRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            znRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="B Range"
        value={soilTestData.bRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            bRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Fe Range"
        value={soilTestData.feRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            feRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Mn Range"
        value={soilTestData.mnRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            mnRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Mo Range"
        value={soilTestData.moRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            moRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Cu Range"
        value={soilTestData.cuRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            cuRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Cl Range"
        value={soilTestData.clRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            clRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
      <Select
        label="Ni Range"
        value={soilTestData.niRange}
        onSelect={(value) =>
          setSoilTestData((prev: SoilTestFormData) => ({
            ...prev,
            niRange: value.toString(),
          }))
        }
        options={SOIL_TEST_RANGES.micro}
        placeholder="Select..."
      />
    </View>
  </FormCard>
);

export default function SoilTestForm({ landId }: { landId: string }) {
  const { addSoilTest, lands } = useUserStore();
  const land = lands?.find((land) => land.id === landId);
  const [soilTestData, setSoilTestData] = React.useState<SoilTestFormData>({
    id: Date.now().toString(),
    testingType: 'value',
    createdAt: new Date().toISOString(),
  });

  const [testMonth, setTestMonth] = React.useState('');
  const [testYear, setTestYear] = React.useState('');
  const [frequency, setFrequency] = React.useState('');

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    console.log('handleSubmit called');
    if (!landId) {
      console.log('No landId found');
      return;
    }

    const completeTest: SoilTest = {
      id: soilTestData.id || Date.now().toString(),
      testMonth,
      testYear,
      frequency,
      testingType: soilTestData.testingType || 'value',
      parameters: {
        ph:
          soilTestData.testingType === 'value'
            ? soilTestData.phValue || ''
            : soilTestData.phRange || '',
        ec:
          soilTestData.testingType === 'value'
            ? soilTestData.ecValue || ''
            : soilTestData.ecRange || '',
        oc:
          soilTestData.testingType === 'value'
            ? soilTestData.ocValue || ''
            : soilTestData.ocRange || '',
      },
      macroNutrients: {
        n:
          soilTestData.testingType === 'value'
            ? soilTestData.nValue || ''
            : soilTestData.nRange || '',
        p:
          soilTestData.testingType === 'value'
            ? soilTestData.pValue || ''
            : soilTestData.pRange || '',
        k:
          soilTestData.testingType === 'value'
            ? soilTestData.kValue || ''
            : soilTestData.kRange || '',
      },
      microNutrients: {
        zn:
          soilTestData.testingType === 'value'
            ? soilTestData.znValue || ''
            : soilTestData.znRange || '',
        b:
          soilTestData.testingType === 'value'
            ? soilTestData.bValue || ''
            : soilTestData.bRange || '',
        fe:
          soilTestData.testingType === 'value'
            ? soilTestData.feValue || ''
            : soilTestData.feRange || '',
        mn:
          soilTestData.testingType === 'value'
            ? soilTestData.mnValue || ''
            : soilTestData.mnRange || '',
        mo:
          soilTestData.testingType === 'value'
            ? soilTestData.moValue || ''
            : soilTestData.moRange || '',
        cu:
          soilTestData.testingType === 'value'
            ? soilTestData.cuValue || ''
            : soilTestData.cuRange || '',
        cl:
          soilTestData.testingType === 'value'
            ? soilTestData.clValue || ''
            : soilTestData.clRange || '',
        ni:
          soilTestData.testingType === 'value'
            ? soilTestData.niValue || ''
            : soilTestData.niRange || '',
      },
      createdAt: new Date().toISOString(),
    };

    console.log('completeTest', completeTest);
    addSoilTest(landId, completeTest);
    router.replace({
      pathname: '/(app)/(tabs)/nutrient-portfolio',
      params: { landId },
    });
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 gap-6 p-6">
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
          Soil Test Details
        </Text>
        {land && (
          <Text className="text-center font-lora text-xl text-primary">
            Account:{' '}
            <Text className="font-poppins-bold text-xl">
              {land.farmLocationName}
            </Text>
          </Text>
        )}

        <View className="gap-6">
          <View className="gap-4">
            <Text className="font-lora text-secondary">
              When was the soil test performed?
            </Text>
            <FormCard>
              <View className="flex-row justify-between gap-4">
                <View className="flex-1">
                  <Select
                    label={DATE_PICKER_OPTIONS.month.label}
                    value={testMonth}
                    onSelect={(value) => setTestMonth(value.toString())}
                    options={DATE_PICKER_OPTIONS.month.options}
                    placeholder={DATE_PICKER_OPTIONS.month.placeholder}
                    testID={DATE_PICKER_OPTIONS.month.testID}
                  />
                </View>
                <View className="flex-1">
                  <Select
                    label={DATE_PICKER_OPTIONS.year.label}
                    value={testYear}
                    onSelect={(value) => setTestYear(value.toString())}
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
                value={frequency}
                onSelect={(value) => setFrequency(value.toString())}
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
                    checked={soilTestData.testingType === 'value'}
                    onChange={() =>
                      setSoilTestData((prev: SoilTestFormData) => ({
                        ...prev,
                        testingType: 'value',
                      }))
                    }
                    label="Enter Value"
                    testID="soil-test-input-value"
                    accessibilityLabel="Enter specific soil test value"
                  />
                </View>
                <View className="flex-1">
                  <Radio
                    checked={soilTestData.testingType === 'range'}
                    onChange={() =>
                      setSoilTestData((prev: SoilTestFormData) => ({
                        ...prev,
                        testingType: 'range',
                      }))
                    }
                    label="Select Range"
                    testID="soil-test-input-range"
                    accessibilityLabel="Select a range for soil test value"
                  />
                </View>
              </View>
            </View>

            <FormCard>
              {soilTestData.testingType === 'value' ? (
                <ValueBasedForm
                  soilTestData={soilTestData}
                  setSoilTestData={setSoilTestData}
                />
              ) : (
                <RangeBasedForm
                  soilTestData={soilTestData}
                  setSoilTestData={setSoilTestData}
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
