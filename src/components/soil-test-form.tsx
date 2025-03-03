/* eslint-disable import/no-unresolved */
/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, FormCard, Input, Radio, Select, Text } from '@/components/ui';
import { CircleTick as CircleTickIcon } from '@/components/ui/icons';
import { type SoilTest } from '@/stores/user-store';
import { useUserStore } from '@/stores/user-store';

import { BackButton } from './back-button';

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
}) => {
  // Local state for each input to improve responsiveness
  const [phValue, setPhValue] = React.useState(soilTestData.phValue || '');
  const [ecValue, setEcValue] = React.useState(soilTestData.ecValue || '');
  const [ocValue, setOcValue] = React.useState(soilTestData.ocValue || '');
  const [nValue, setNValue] = React.useState(soilTestData.nValue || '');
  const [pValue, setPValue] = React.useState(soilTestData.pValue || '');
  const [kValue, setKValue] = React.useState(soilTestData.kValue || '');
  const [znValue, setZnValue] = React.useState(soilTestData.znValue || '');
  const [bValue, setBValue] = React.useState(soilTestData.bValue || '');
  const [feValue, setFeValue] = React.useState(soilTestData.feValue || '');
  const [mnValue, setMnValue] = React.useState(soilTestData.mnValue || '');
  const [moValue, setMoValue] = React.useState(soilTestData.moValue || '');
  const [cuValue, setCuValue] = React.useState(soilTestData.cuValue || '');
  const [clValue, setClValue] = React.useState(soilTestData.clValue || '');
  const [niValue, setNiValue] = React.useState(soilTestData.niValue || '');

  // Update parent state when input is complete (on blur)
  const updateParentState = React.useCallback(() => {
    setSoilTestData((prev: SoilTestFormData) => ({
      ...prev,
      phValue,
      ecValue,
      ocValue,
      nValue,
      pValue,
      kValue,
      znValue,
      bValue,
      feValue,
      mnValue,
      moValue,
      cuValue,
      clValue,
      niValue,
    }));
  }, [
    phValue,
    ecValue,
    ocValue,
    nValue,
    pValue,
    kValue,
    znValue,
    bValue,
    feValue,
    mnValue,
    moValue,
    cuValue,
    clValue,
    niValue,
    setSoilTestData,
  ]);

  // Sync local state with parent state when parent state changes
  React.useEffect(() => {
    setPhValue(soilTestData.phValue || '');
    setEcValue(soilTestData.ecValue || '');
    setOcValue(soilTestData.ocValue || '');
    setNValue(soilTestData.nValue || '');
    setPValue(soilTestData.pValue || '');
    setKValue(soilTestData.kValue || '');
    setZnValue(soilTestData.znValue || '');
    setBValue(soilTestData.bValue || '');
    setFeValue(soilTestData.feValue || '');
    setMnValue(soilTestData.mnValue || '');
    setMoValue(soilTestData.moValue || '');
    setCuValue(soilTestData.cuValue || '');
    setClValue(soilTestData.clValue || '');
    setNiValue(soilTestData.niValue || '');
  }, [soilTestData]);

  return (
    <FormCard>
      <View className="gap-4">
        <Input
          label="pH Value"
          value={phValue}
          onChangeText={setPhValue}
          onBlur={updateParentState}
          placeholder="Enter pH value"
          keyboardType="numeric"
        />
        <Input
          label="EC Value (dS/m)"
          value={ecValue}
          onChangeText={setEcValue}
          onBlur={updateParentState}
          placeholder="Enter EC value"
          keyboardType="numeric"
        />
        <Input
          label="OC Value (%)"
          value={ocValue}
          onChangeText={setOcValue}
          onBlur={updateParentState}
          placeholder="Enter OC value"
          keyboardType="numeric"
        />

        <Text className="font-lora text-secondary">MACRO Nutrients</Text>
        <Input
          label="N Value"
          value={nValue}
          onChangeText={setNValue}
          onBlur={updateParentState}
          placeholder="Enter N value"
          keyboardType="numeric"
        />
        <Input
          label="P Value"
          value={pValue}
          onChangeText={setPValue}
          onBlur={updateParentState}
          placeholder="Enter P value"
          keyboardType="numeric"
        />
        <Input
          label="K Value"
          value={kValue}
          onChangeText={setKValue}
          onBlur={updateParentState}
          placeholder="Enter K value"
          keyboardType="numeric"
        />

        <Text className="font-lora text-secondary">MICRO Nutrients</Text>
        <Input
          label="Zn Value"
          value={znValue}
          onChangeText={setZnValue}
          onBlur={updateParentState}
          placeholder="Enter Zn value"
          keyboardType="numeric"
        />
        <Input
          label="B Value"
          value={bValue}
          onChangeText={setBValue}
          onBlur={updateParentState}
          placeholder="Enter B value"
          keyboardType="numeric"
        />
        <Input
          label="Fe Value"
          value={feValue}
          onChangeText={setFeValue}
          onBlur={updateParentState}
          placeholder="Enter Fe value"
          keyboardType="numeric"
        />
        <Input
          label="Mn Value"
          value={mnValue}
          onChangeText={setMnValue}
          onBlur={updateParentState}
          placeholder="Enter Mn value"
          keyboardType="numeric"
        />
        <Input
          label="Mo Value"
          value={moValue}
          onChangeText={setMoValue}
          onBlur={updateParentState}
          placeholder="Enter Mo value"
          keyboardType="numeric"
        />
        <Input
          label="Cu Value"
          value={cuValue}
          onChangeText={setCuValue}
          onBlur={updateParentState}
          placeholder="Enter Cu value"
          keyboardType="numeric"
        />
        <Input
          label="Cl Value"
          value={clValue}
          onChangeText={setClValue}
          onBlur={updateParentState}
          placeholder="Enter Cl value"
          keyboardType="numeric"
        />
        <Input
          label="Ni Value"
          value={niValue}
          onChangeText={setNiValue}
          onBlur={updateParentState}
          placeholder="Enter Ni value"
          keyboardType="numeric"
        />
      </View>
    </FormCard>
  );
};

const RangeBasedForm = ({
  soilTestData,
  setSoilTestData,
}: {
  soilTestData: SoilTestFormData;
  setSoilTestData: React.Dispatch<React.SetStateAction<SoilTestFormData>>;
}) => {
  // Local state for each select field to improve responsiveness
  const [phRange, setPhRange] = React.useState(soilTestData.phRange || '');
  const [ecRange, setEcRange] = React.useState(soilTestData.ecRange || '');
  const [ocRange, setOcRange] = React.useState(soilTestData.ocRange || '');
  const [nRange, setNRange] = React.useState(soilTestData.nRange || '');
  const [pRange, setPRange] = React.useState(soilTestData.pRange || '');
  const [kRange, setKRange] = React.useState(soilTestData.kRange || '');
  const [znRange, setZnRange] = React.useState(soilTestData.znRange || '');
  const [bRange, setBRange] = React.useState(soilTestData.bRange || '');
  const [feRange, setFeRange] = React.useState(soilTestData.feRange || '');
  const [mnRange, setMnRange] = React.useState(soilTestData.mnRange || '');
  const [moRange, setMoRange] = React.useState(soilTestData.moRange || '');
  const [cuRange, setCuRange] = React.useState(soilTestData.cuRange || '');
  const [clRange, setClRange] = React.useState(soilTestData.clRange || '');
  const [niRange, setNiRange] = React.useState(soilTestData.niRange || '');

  // Update parent state when selection is complete
  const updateParentState = React.useCallback(() => {
    setSoilTestData((prev: SoilTestFormData) => ({
      ...prev,
      phRange,
      ecRange,
      ocRange,
      nRange,
      pRange,
      kRange,
      znRange,
      bRange,
      feRange,
      mnRange,
      moRange,
      cuRange,
      clRange,
      niRange,
    }));
  }, [
    phRange,
    ecRange,
    ocRange,
    nRange,
    pRange,
    kRange,
    znRange,
    bRange,
    feRange,
    mnRange,
    moRange,
    cuRange,
    clRange,
    niRange,
    setSoilTestData,
  ]);

  // Sync local state with parent state when parent state changes
  React.useEffect(() => {
    setPhRange(soilTestData.phRange || '');
    setEcRange(soilTestData.ecRange || '');
    setOcRange(soilTestData.ocRange || '');
    setNRange(soilTestData.nRange || '');
    setPRange(soilTestData.pRange || '');
    setKRange(soilTestData.kRange || '');
    setZnRange(soilTestData.znRange || '');
    setBRange(soilTestData.bRange || '');
    setFeRange(soilTestData.feRange || '');
    setMnRange(soilTestData.mnRange || '');
    setMoRange(soilTestData.moRange || '');
    setCuRange(soilTestData.cuRange || '');
    setClRange(soilTestData.clRange || '');
    setNiRange(soilTestData.niRange || '');
  }, [soilTestData]);

  // Helper function to handle select changes
  const handleSelectChange = (
    value: string | number,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(value.toString());
    // We need to update parent state immediately for selects since there's no blur event
    setTimeout(updateParentState, 0);
  };

  return (
    <FormCard>
      <View className="gap-4">
        <Select
          label="pH Range"
          value={phRange}
          onSelect={(value) => handleSelectChange(value, setPhRange)}
          options={SOIL_TEST_RANGES.ph}
          placeholder="Select..."
        />
        <Select
          label="EC Range"
          value={ecRange}
          onSelect={(value) => handleSelectChange(value, setEcRange)}
          options={SOIL_TEST_RANGES.ec}
          placeholder="Select..."
        />
        <Select
          label="OC Range"
          value={ocRange}
          onSelect={(value) => handleSelectChange(value, setOcRange)}
          options={SOIL_TEST_RANGES.oc}
          placeholder="Select..."
        />

        <Text className="font-lora text-secondary">MACRO Nutrients</Text>
        <Select
          label="N Range"
          value={nRange}
          onSelect={(value) => handleSelectChange(value, setNRange)}
          options={SOIL_TEST_RANGES.macro}
          placeholder="Select..."
        />
        <Select
          label="P Range"
          value={pRange}
          onSelect={(value) => handleSelectChange(value, setPRange)}
          options={SOIL_TEST_RANGES.macro}
          placeholder="Select..."
        />
        <Select
          label="K Range"
          value={kRange}
          onSelect={(value) => handleSelectChange(value, setKRange)}
          options={SOIL_TEST_RANGES.macro}
          placeholder="Select..."
        />

        <Text className="font-lora text-secondary">MICRO Nutrients</Text>
        <Select
          label="Zn Range"
          value={znRange}
          onSelect={(value) => handleSelectChange(value, setZnRange)}
          options={SOIL_TEST_RANGES.micro}
          placeholder="Select..."
        />
        <Select
          label="B Range"
          value={bRange}
          onSelect={(value) => handleSelectChange(value, setBRange)}
          options={SOIL_TEST_RANGES.micro}
          placeholder="Select..."
        />
        <Select
          label="Fe Range"
          value={feRange}
          onSelect={(value) => handleSelectChange(value, setFeRange)}
          options={SOIL_TEST_RANGES.micro}
          placeholder="Select..."
        />
        <Select
          label="Mn Range"
          value={mnRange}
          onSelect={(value) => handleSelectChange(value, setMnRange)}
          options={SOIL_TEST_RANGES.micro}
          placeholder="Select..."
        />
        <Select
          label="Mo Range"
          value={moRange}
          onSelect={(value) => handleSelectChange(value, setMoRange)}
          options={SOIL_TEST_RANGES.micro}
          placeholder="Select..."
        />
        <Select
          label="Cu Range"
          value={cuRange}
          onSelect={(value) => handleSelectChange(value, setCuRange)}
          options={SOIL_TEST_RANGES.micro}
          placeholder="Select..."
        />
        <Select
          label="Cl Range"
          value={clRange}
          onSelect={(value) => handleSelectChange(value, setClRange)}
          options={SOIL_TEST_RANGES.micro}
          placeholder="Select..."
        />
        <Select
          label="Ni Range"
          value={niRange}
          onSelect={(value) => handleSelectChange(value, setNiRange)}
          options={SOIL_TEST_RANGES.micro}
          placeholder="Select..."
        />
      </View>
    </FormCard>
  );
};

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
          <BackButton />
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
