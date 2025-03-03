/* eslint-disable max-lines-per-function */
import { router, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { BackButton } from '@/components/back-button';
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
import { useUserStore } from '@/stores/user-store';

import {
  currencyOptions,
  fertilizerOptions,
  type InputType,
  seedVarietyOptions,
} from './types';

// TODO: Implement form submission
const handleSubmit = () => {
  router.back();
};

export const SmartRecommendationsForm: React.FC = () => {
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
        <Button onPress={handleSubmit} fullWidth={false} label="Submit!" />
      </View>
    </FormCard>
  );
};

export const LogBookForm: React.FC = () => {
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
        <Input
          label="When do you prepare?"
          placeholder="e.g., Before rainy season, Early spring"
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
        <Button onPress={handleSubmit} fullWidth={false} label="Submit!" />
      </View>
    </FormCard>
  );
};

export default function NutrientsManagement() {
  const [seedInputType, setSeedInputType] = React.useState<InputType>(null);
  const { lands } = useUserStore();
  const { landId } = useLocalSearchParams<{ landId?: string }>();

  // Find the selected land from the landId param
  const selectedLand = landId ? lands.find((land) => land.id === landId) : null;

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
          Nutrient Management
        </Text>
        {selectedLand && (
          <Text className="text-center font-poppins-semibold text-lg text-neutral-600">
            Managing: {selectedLand.farmLocationName || 'Selected Land'}
          </Text>
        )}
        <View>
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
                  label="Log Book"
                  accessibilityLabel="Log Book"
                />
              </View>
            </View>
          </View>
        </View>
        {seedInputType === 'smart' && <SmartRecommendationsForm />}
        {seedInputType === 'log' && <LogBookForm />}
      </View>
    </KeyboardAwareScrollView>
  );
}
