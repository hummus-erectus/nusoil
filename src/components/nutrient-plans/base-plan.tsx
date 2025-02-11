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

import {
  accountOptions,
  currencyOptions,
  fertilizerOptions,
  type InputType,
  type PlanType,
  seedVarietyOptions,
} from './types';

interface BasePlanProps {
  planType: PlanType;
  showAdvancedFields?: boolean;
}

interface BaseFormProps {
  showAdvancedFields?: boolean;
}

export const BaseSmartRecommendationsForm: React.FC<BaseFormProps> = ({
  showAdvancedFields = false,
}) => {
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
        {showAdvancedFields && (
          <>
            <Input
              label="Composition"
              placeholder="e.g., NPK 10-20-10, Organic Matter 5%"
            />
            <Input label="Rate per unit" placeholder="e.g., 50 kg/hectare" />
          </>
        )}
        <Button onPress={() => {}} fullWidth={false} label="Submit!" />
      </View>
    </FormCard>
  );
};

export const BaseLogBookForm: React.FC<BaseFormProps> = ({
  showAdvancedFields = false,
}) => {
  const [cost, setCost] = React.useState<string>('');
  const [currency, setCurrency] = React.useState<string | number | undefined>();
  const [plantingDate, setPlantingDate] = React.useState<Date | undefined>();

  return (
    <FormCard>
      <View className="gap-4">
        <Text className="font-poppins-semibold">
          {showAdvancedFields ? 'Log Book Template' : 'Activity with the Land'}
        </Text>
        {showAdvancedFields && (
          <DateInput
            value={plantingDate}
            onChange={setPlantingDate}
            label="Date of planting"
            placeholder="Select planting date"
          />
        )}
        <Input
          label={showAdvancedFields ? 'Activity' : 'What are you preparing?'}
          placeholder={
            showAdvancedFields
              ? 'e.g., Fertilization, Irrigation, Pest Control'
              : 'e.g., Soil preparation, Planting beds, Irrigation setup'
          }
        />
        <Input
          label={showAdvancedFields ? 'Applications' : 'How do you prepare?'}
          placeholder={
            showAdvancedFields
              ? 'e.g., Foliar spray, Soil drench, Root injection'
              : 'e.g., Tilling, Adding compost, Setting up drip lines'
          }
        />
        {!showAdvancedFields && (
          <Input
            label="When do you prepare?"
            placeholder="e.g., Before rainy season, Early spring"
          />
        )}
        {showAdvancedFields && (
          <Input label="Quantity" placeholder="0" keyboardType="numeric" />
        )}
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

export const BasePlan: React.FC<BasePlanProps> = ({
  planType,
  showAdvancedFields = false,
}) => {
  const [seedInputType, setSeedInputType] = React.useState<InputType>(null);

  const getPlanTitle = () => {
    switch (planType) {
      case 'mature':
        return 'Mature Plan';
      case 'harvest':
        return 'Harvesting Plan';
      default:
        return 'Seed Plan';
    }
  };

  return (
    <View className="gap-6">
      <Text className="text-center font-lora text-3xl text-primary">
        {getPlanTitle()}
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
          <BaseSmartRecommendationsForm
            showAdvancedFields={showAdvancedFields}
          />
        ) : seedInputType === 'log' ? (
          <BaseLogBookForm showAdvancedFields={showAdvancedFields} />
        ) : null}
      </View>
    </View>
  );
};
