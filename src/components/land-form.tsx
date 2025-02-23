/* eslint-disable max-lines-per-function */
import { View } from 'react-native';

import { Button, colors, FormCard, Input, Select, Text } from '@/components/ui';
import { Upload as UploadIcon } from '@/components/ui/icons';

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

const irragationOptions = [
  { label: 'Drip Irrigation', value: 'Drip Irrigation' },
  { label: 'Sprinkler Irrigation', value: 'Sprinkler Irrigation' },
  { label: 'Flood Irrigation', value: 'Flood Irrigation' },
];

export interface LandFormProps {
  form: {
    id: string;
    farmLocationName: string;
    farmCity: string;
    irrigationType: string;
    latLong: string;
    ownershipType: string;
    yearsOperated: string;
    leasedAmount: string;
    rainWater: string;
    groundWater: string;
    waterIrrigationType: string;
    waterDays: string;
    waterPump: string;
    tillageType: string;
    cropsPerYear: string;
    cropDuration: string;
    cropType: string;
    leasedLandCost: string;
    tillageCost: string;
    fertilizerCost: string;
    pestDiseaseCost: string;
    cropYieldAverage: string;
    income: string;
  };
  onFieldChange: (field: keyof LandFormProps['form'], value: string) => void;
}

export function LandForm({ form, onFieldChange }: LandFormProps) {
  return (
    <View className="gap-4">
      {/* Physical Location */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">
          Physical Location of Your Farm
        </Text>
        <FormCard className="gap-4">
          <Input
            value={form.farmLocationName}
            onChangeText={(v) => onFieldChange('farmLocationName', v)}
            placeholder="Location Place Name"
          />
          <Input
            value={form.farmCity}
            onChangeText={(v) => onFieldChange('farmCity', v)}
            placeholder="City (PIN /Zip Number)"
          />
          <Input
            value={form.latLong}
            onChangeText={(v) => onFieldChange('latLong', v)}
            placeholder="Lat/Long"
          />
        </FormCard>
        <FormCard className="gap-6">
          <Text className="text-sm text-neutral-600">Create a Polygon Map</Text>
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
          <Input
            value={form.yearsOperated}
            onChangeText={(v) => onFieldChange('yearsOperated', v)}
            placeholder="Number of Years Operated"
          />
          <Input
            value={form.leasedAmount}
            onChangeText={(v) => onFieldChange('leasedAmount', v)}
            placeholder="Leased Amount"
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
          <Input
            value={form.waterDays}
            onChangeText={(v) => onFieldChange('waterDays', v)}
            placeholder="Number of Days"
            keyboardType="numeric"
          />
        </FormCard>
      </View>

      {/* Irrigation Technology */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Irrigation Technology</Text>
        <FormCard className="gap-4">
          <Select
            label="Irrigation Type"
            options={irragationOptions}
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
          <Input
            value={form.cropDuration}
            onChangeText={(v) => onFieldChange('cropDuration', v)}
            placeholder="Crop Duration (Days Average)"
            keyboardType="numeric"
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
              <Input
                value={form.leasedLandCost}
                onChangeText={(v) => onFieldChange('leasedLandCost', v)}
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
                value={form.tillageCost}
                onChangeText={(v) => onFieldChange('tillageCost', v)}
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
                value={form.fertilizerCost}
                onChangeText={(v) => onFieldChange('fertilizerCost', v)}
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
                value={form.pestDiseaseCost}
                onChangeText={(v) => onFieldChange('pestDiseaseCost', v)}
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
                value={form.cropYieldAverage}
                onChangeText={(v) => onFieldChange('cropYieldAverage', v)}
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
                value={form.income}
                onChangeText={(v) => onFieldChange('income', v)}
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
  );
}
