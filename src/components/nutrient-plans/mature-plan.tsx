import * as React from 'react';

import {
  Button,
  DateInput,
  FormCard,
  Input,
  Radio,
  Select,
  Text,
  View,
} from '@/components/ui';

const accountOptions = [
  { label: 'Nusa - 1', value: 'Nusa - 1' },
  { label: 'Nusa -2', value: 'Nusa -2' },
  { label: 'Nusa -3', value: 'Nusa -3' },
  // Add more options as needed
];

const seedVarietyOptions = [
  { label: 'Hybrid Corn', value: 'hybrid_corn' },
  { label: 'Organic Wheat', value: 'organic_wheat' },
  { label: 'Non-GMO Soybeans', value: 'non_gmo_soybeans' },
  { label: 'Heirloom Tomato', value: 'heirloom_tomato' },
  { label: 'Drought-Resistant Sorghum', value: 'drought_sorghum' },
  // Add more options as needed
];

const fertilizerOptions = [
  { label: 'Organic Compost', value: 'organic_compost' },
  { label: 'Nitrogen-Rich Fertilizer', value: 'nitrogen_fertilizer' },
  { label: 'Phosphorus Blend', value: 'phosphorus_blend' },
  { label: 'Slow-Release Granular', value: 'slow_release_granular' },
  { label: 'Liquid Seaweed Extract', value: 'seaweed_extract' },
  // Add more options as needed
];

const currencyOptions = [
  { label: 'INR (₹)', value: 'inr' },
  { label: 'USD ($)', value: 'usd' },
  { label: 'EUR (€)', value: 'eur' },
  { label: 'GBP (£)', value: 'gbp' },
  // Add more options as needed
];

const SmartRecommendationsForm = () => {
  const [plantingDate, setPlantingDate] = React.useState<Date | undefined>();
  const [seedVariety, setSeedVariety] = React.useState<
    string | number | undefined
  >();
  const [preferredFertilizer, setPreferredFertilizer] = React.useState<
    string | number | undefined
  >();

  return (
    <FormCard>
      <View className="gap-4">
        <Text className="font-poppins-semibold">Crop</Text>
        <DateInput
          value={plantingDate}
          onChange={setPlantingDate}
          label="Date of planting"
          placeholder="Select planting date"
        />
        <View className="flex w-full flex-row items-center">
          <View className="flex-1">
            <Input placeholder="0" label="Duration" keyboardType="numeric" />
          </View>
          <Text className="ml-4 pt-2 text-sm text-neutral-600">Days</Text>
        </View>
        <Select
          label="Seed Variety"
          placeholder="Select seed variety"
          options={seedVarietyOptions}
          value={seedVariety}
          onSelect={(value) => setSeedVariety(value)}
        />
        <Select
          label="Preferred Fertilizer"
          placeholder="Select fertilizer type"
          options={fertilizerOptions}
          value={preferredFertilizer}
          onSelect={(value) => setPreferredFertilizer(value)}
        />
        <Input
          label="Brand Name"
          placeholder="Enter seed or fertilizer brand"
        />
        <Input
          label="Composition"
          placeholder="e.g., NPK 10-20-10, Organic Matter 5%"
        />
        <Input label="Rate per unit" placeholder="e.g., 50 kg/hectare" />
        <Button onPress={() => {}} fullWidth={false} label="Submit!" />
      </View>
    </FormCard>
  );
};

const LogBookForm = () => {
  const [cost, setCost] = React.useState<string>('');
  const [currency, setCurrency] = React.useState<string | number | undefined>();
  const [plantingDate, setPlantingDate] = React.useState<Date | undefined>();

  return (
    <FormCard>
      <View className="gap-4">
        <Text className="font-poppins-semibold">Log Book Template</Text>
        <DateInput
          value={plantingDate}
          onChange={setPlantingDate}
          label="Date of planting"
          placeholder="Select planting date"
        />
        <Input
          label="Activity"
          placeholder="e.g., Fertilization, Irrigation, Pest Control"
        />
        <Input
          label="Applications"
          placeholder="e.g., Foliar spray, Soil drench, Root injection"
        />
        <Input label="Quantity" placeholder="0" keyboardType="numeric" />

        <View className="flex w-full flex-row items-center space-x-2">
          <View className="flex-1">
            <Input
              label="Enter the cost"
              placeholder="00.00"
              value={cost}
              onChangeText={setCost}
              keyboardType="numeric"
            />
          </View>
          <View className="flex-1">
            <Select
              label="Currency"
              options={currencyOptions}
              value={currency}
              onSelect={(value) => setCurrency(value)}
            />
          </View>
        </View>
        <Button onPress={() => {}} fullWidth={false} label="Submit!" />
      </View>
    </FormCard>
  );
};

export function MaturePlan() {
  const [seedInputType, setSeedInputType] = React.useState<
    'smart' | 'log' | null
  >(null);

  return (
    <View className="gap-6">
      <Text className="text-center font-lora text-3xl text-primary">
        Mature Plan
      </Text>
      <Select options={accountOptions} label="Select the account" />
      <View>
        <Text className="font-lora text-xl text-secondary">Seed</Text>
        <View className="mb-6 gap-2">
          <Text>Select an option</Text>
          <View className="mt-2 gap-4">
            <View className="flex-1">
              <Radio
                checked={seedInputType === 'smart'}
                onChange={() => setSeedInputType('smart')}
                label="SMART Recommendations"
                accessibilityLabel="SMART Recommendations"
              />
            </View>
            <View className="flex-1">
              <Radio
                checked={seedInputType === 'log'}
                onChange={() => setSeedInputType('log')}
                label="Farm Log Book"
                accessibilityLabel="Farm Log Book"
              />
            </View>
          </View>
        </View>

        {seedInputType === 'smart' ? (
          <SmartRecommendationsForm />
        ) : seedInputType === 'log' ? (
          <LogBookForm />
        ) : (
          ''
        )}
      </View>
    </View>
  );
}
