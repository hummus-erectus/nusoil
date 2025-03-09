/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import { View } from 'react-native';
import { z } from 'zod';

import { type PolygonCoordinate } from '@/components/polygon-map';
import {
  Button,
  colors,
  FormCard,
  Input,
  NumberInput,
  Select,
  Text,
} from '@/components/ui';
import { Map as MapIcon } from '@/components/ui/icons';

const ownershipOptions = [
  { label: 'Leased Land', value: 'Leased Land' },
  { label: 'Owned Land', value: 'Owned Land' },
];

const rainWaterOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const groundWaterOptions = [
  { label: 'Dug Well', value: 'Dug Well' },
  { label: 'Spring', value: 'Spring' },
];

const waterIrrigationTypeOptions = [
  { label: 'Major Irrigation', value: 'Major Irrigation' },
  { label: 'Minor Irrigation', value: 'Minor Irrigation' },
];

const waterPumpOptions = [
  { label: 'Solar', value: 'Solar' },
  { label: 'Manual', value: 'Manual' },
];

const tillageOptions = [
  { label: 'No Tillage', value: 'No Tillage' },
  { label: 'Subsoiling', value: 'Subsoiling' },
  { label: 'Deep Ploughing', value: 'Deep Ploughing' },
];

const cropsPerYearOptions = [
  { label: 'One', value: 'One' },
  { label: 'Two', value: 'Two' },
  { label: 'More than Two', value: 'More than Two' },
];

const cropTypeOptions = [
  { label: 'Mono Crop', value: 'Mono Crop' },
  { label: 'Multi Crop', value: 'Multi Crop' },
];

const irrigationOptions = [
  { label: 'Drip Irrigation', value: 'Drip Irrigation' },
  { label: 'Sprinkler Irrigation', value: 'Sprinkler Irrigation' },
  { label: 'Flood Irrigation', value: 'Flood Irrigation' },
];

export const landFormSchema = z.object({
  farmLocationName: z
    .string({
      required_error: 'Location name is required',
    })
    .min(3, 'Location name must be at least 3 characters'),
  farmCity: z
    .string({
      required_error: 'City/Town is required',
    })
    .min(3, 'City/Town must be at least 3 characters'),
  yearsOperated: z
    .number()
    .min(0, 'Years operated cannot be negative')
    .nullable()
    .optional(),
  leasedAmount: z
    .number()
    .min(0, 'Leased amount cannot be negative')
    .nullable()
    .optional(),
  waterDays: z
    .number()
    .min(0, 'Water days cannot be negative')
    .nullable()
    .optional(),
  cropDuration: z
    .number()
    .min(0, 'Crop duration cannot be negative')
    .nullable()
    .optional(),
  leasedLandCost: z
    .number()
    .min(0, 'Leased land cost cannot be negative')
    .nullable()
    .optional(),
  tillageCost: z
    .number()
    .min(0, 'Tillage cost cannot be negative')
    .nullable()
    .optional(),
  fertilizerCost: z
    .number()
    .min(0, 'Fertilizer cost cannot be negative')
    .nullable()
    .optional(),
  pestDiseaseCost: z
    .number()
    .min(0, 'Pest and disease cost cannot be negative')
    .nullable()
    .optional(),
  cropYieldAverage: z
    .number()
    .min(0, 'Yield average cannot be negative')
    .nullable()
    .optional(),
  income: z.number().min(0, 'Income cannot be negative').nullable().optional(),
});

export interface LandFormProps {
  form: {
    id: string;
    farmLocationName: string;
    farmCity: string;
    irrigationType: string;
    latLong: string;
    ownershipType: string;
    yearsOperated: number | null;
    leasedAmount: number | null;
    rainWater: string;
    groundWater: string;
    waterIrrigationType: string;
    waterDays: number | null;
    waterPump: string;
    tillageType: string;
    cropsPerYear: string;
    cropDuration: number | null;
    cropType: string;
    leasedLandCost: number | null;
    tillageCost: number | null;
    fertilizerCost: number | null;
    pestDiseaseCost: number | null;
    cropYieldAverage: number | null;
    income: number | null;
    coordinates?: PolygonCoordinate[];
  };
  onFieldChange: (
    field: keyof LandFormProps['form'],
    value: string | number | null
  ) => void;
  errors?: Partial<Record<keyof LandFormProps['form'], string>>;
}

export function LandForm({ form, onFieldChange, errors }: LandFormProps) {
  const handleOpenPolygonMap = () => {
    router.push({
      pathname: '/land-management/polygon-map',
      params: { landId: form.id },
    });
  };

  return (
    <View className="gap-4">
      {/* Physical Location */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">
          Physical Location of Your Farm
        </Text>
        <FormCard className="gap-4">
          <Input
            label="Location Name"
            value={form.farmLocationName}
            onChangeText={(v) => onFieldChange('farmLocationName', v)}
            placeholder="e.g. 'Shibata North'"
            error={errors?.farmLocationName}
          />
          <Input
            label="City/ Town"
            value={form.farmCity}
            onChangeText={(v) => onFieldChange('farmCity', v)}
            placeholder="e.g. 'Niigata'"
            error={errors?.farmCity}
          />
        </FormCard>
        <FormCard className="gap-6">
          <Text className="text-sm text-neutral-600">Create a Polygon Map</Text>
          <Button
            variant="secondary"
            fullWidth={false}
            label={
              <View className="flex-row items-center justify-center">
                <MapIcon color={colors.primary} />
                <Text className="ml-2 text-primary">
                  {form.coordinates && form.coordinates.length > 0
                    ? 'Edit Map'
                    : 'Create Map'}
                </Text>
              </View>
            }
            onPress={handleOpenPolygonMap}
          />
          {form.coordinates && form.coordinates.length > 0 && (
            <Text className="text-center text-xs text-success">
              Polygon map created with {form.coordinates.length} points
            </Text>
          )}
        </FormCard>
      </View>

      {/* Ownership */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Ownership</Text>
        <FormCard className="gap-4">
          <Select
            label="Ownership Type"
            options={ownershipOptions}
            value={form.ownershipType}
            onSelect={(v) => onFieldChange('ownershipType', String(v))}
          />
          <NumberInput
            label="Years Operated"
            value={form.yearsOperated}
            onChangeText={(v) => onFieldChange('yearsOperated', v)}
            placeholder="0"
            min={0}
            error={errors?.yearsOperated}
          />
          <NumberInput
            label="Leased Amount"
            value={form.leasedAmount}
            onChangeText={(v) => onFieldChange('leasedAmount', v)}
            placeholder="0"
            min={0}
            allowDecimals={true}
            error={errors?.leasedAmount}
          />
        </FormCard>
      </View>

      {/* Water Availability */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Water Availability</Text>
        <FormCard className="gap-4">
          <Select
            label="Rain Water"
            options={rainWaterOptions}
            value={form.rainWater}
            onSelect={(v) => onFieldChange('rainWater', String(v))}
          />
          <Select
            label="Ground Water"
            options={groundWaterOptions}
            value={form.groundWater}
            onSelect={(v) => onFieldChange('groundWater', String(v))}
          />
          <Select
            label="Water Irrigation Type"
            options={waterIrrigationTypeOptions}
            value={form.waterIrrigationType}
            onSelect={(v) => onFieldChange('waterIrrigationType', String(v))}
          />
          <NumberInput
            label="Number of Days"
            value={form.waterDays}
            onChangeText={(v) => onFieldChange('waterDays', v)}
            placeholder="0"
            min={0}
            error={errors?.waterDays}
          />
        </FormCard>
      </View>

      {/* Irrigation Technology */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Irrigation Technology</Text>
        <FormCard className="gap-4">
          <Select
            label="Irrigation Type"
            options={irrigationOptions}
            value={form.irrigationType}
            onSelect={(v) => onFieldChange('irrigationType', String(v))}
          />
          <Select
            label="Water Pump"
            options={waterPumpOptions}
            value={form.waterPump}
            onSelect={(v) => onFieldChange('waterPump', String(v))}
          />
        </FormCard>
      </View>

      {/* Tillage Practices */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Tillage Practices</Text>
        <FormCard className="gap-4">
          <Select
            label="Tillage Practices"
            options={tillageOptions}
            value={form.tillageType}
            onSelect={(v) => onFieldChange('tillageType', String(v))}
          />
        </FormCard>
      </View>

      {/* Land Use Intensity */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Land Use Intensity</Text>
        <FormCard className="gap-4">
          <Select
            label="Number of Crops per Calendar Year"
            options={cropsPerYearOptions}
            value={form.cropsPerYear}
            onSelect={(v) => onFieldChange('cropsPerYear', String(v))}
          />
          <NumberInput
            label="Crop Duration (Days Average)"
            value={form.cropDuration}
            onChangeText={(v) => onFieldChange('cropDuration', v)}
            placeholder="0"
            min={0}
            error={errors?.cropDuration}
          />
          <Select
            label="Type"
            options={cropTypeOptions}
            value={form.cropType}
            onSelect={(v) => onFieldChange('cropType', String(v))}
          />
        </FormCard>
      </View>

      {/* Cost */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Cost</Text>
        <FormCard className="gap-4">
          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <NumberInput
                label="Cost of Leased Land"
                value={form.leasedLandCost}
                onChangeText={(v) => onFieldChange('leasedLandCost', v)}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
                error={errors?.leasedLandCost}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>

          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <NumberInput
                label="Tillage Cost"
                value={form.tillageCost}
                onChangeText={(v) => onFieldChange('tillageCost', v)}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
                error={errors?.tillageCost}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>

          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <NumberInput
                label="Fertilizer Cost"
                value={form.fertilizerCost}
                onChangeText={(v) => onFieldChange('fertilizerCost', v)}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
                error={errors?.fertilizerCost}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>

          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <NumberInput
                label="Pest and Disease Management Cost"
                value={form.pestDiseaseCost}
                onChangeText={(v) => onFieldChange('pestDiseaseCost', v)}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
                error={errors?.pestDiseaseCost}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>

          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <NumberInput
                label="Yield Average from All Crops"
                value={form.cropYieldAverage}
                onChangeText={(v) => onFieldChange('cropYieldAverage', v)}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
                error={errors?.cropYieldAverage}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>

          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <NumberInput
                label="Income per year"
                value={form.income}
                onChangeText={(v) => onFieldChange('income', v)}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
                error={errors?.income}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>
        </FormCard>
      </View>
    </View>
  );
}
