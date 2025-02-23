/* eslint-disable max-lines-per-function */
import { View } from 'react-native';

import { Input, Select } from '@/components/ui';

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

export interface LandFormProps {
  form: {
    id: string;
    farmLocationName: string;
    farmCity: string;
    size: string;
    irrigationType: string;
    ownershipType: string;
    yearsOperated: string;
    leasedAmount: string;
    rainWaterHarvesting: string;
    groundWaterSource: string;
    waterIrrigationType: string;
    waterDays: string;
    waterPumpType: string;
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
      {/* Location Fields */}
      <Input
        label="Farm Location Name"
        value={form.farmLocationName}
        onChangeText={(v) => onFieldChange('farmLocationName', v)}
      />
      <Input
        label="Farm City"
        value={form.farmCity}
        onChangeText={(v) => onFieldChange('farmCity', v)}
      />
      <Input
        label="Size (acres)"
        value={form.size}
        keyboardType="numeric"
        onChangeText={(v) => onFieldChange('size', v)}
      />

      {/* Ownership Section */}
      <Select
        label="Ownership Type"
        options={ownershipOptions}
        value={form.ownershipType}
        onSelect={(v) => onFieldChange('ownershipType', String(v))}
      />
      <Input
        label="Years Operated"
        value={form.yearsOperated}
        onChangeText={(v) => onFieldChange('yearsOperated', v)}
      />
      <Input
        label="Leased Amount (if applicable)"
        value={form.leasedAmount}
        onChangeText={(v) => onFieldChange('leasedAmount', v)}
      />

      {/* Water Management */}
      <Select
        label="Rain Water Harvesting"
        options={rainWaterOptions}
        value={form.rainWaterHarvesting}
        onSelect={(v) => onFieldChange('rainWaterHarvesting', String(v))}
      />
      <Select
        label="Ground Water Source"
        options={groundWaterOptions}
        value={form.groundWaterSource}
        onSelect={(v) => onFieldChange('groundWaterSource', String(v))}
      />
      <Select
        label="Water Irrigation Type"
        options={waterIrrigationTypeOptions}
        value={form.waterIrrigationType}
        onSelect={(v) => onFieldChange('waterIrrigationType', String(v))}
      />
      <Input
        label="Watering Frequency (days)"
        value={form.waterDays}
        onChangeText={(v) => onFieldChange('waterDays', v)}
      />
      <Select
        label="Water Pump Type"
        options={waterPumpOptions}
        value={form.waterPumpType}
        onSelect={(v) => onFieldChange('waterPumpType', String(v))}
      />

      {/* Crop Management */}
      <Select
        label="Tillage Type"
        options={tillageOptions}
        value={form.tillageType}
        onSelect={(v) => onFieldChange('tillageType', String(v))}
      />
      <Select
        label="Crops Per Year"
        options={cropsPerYearOptions}
        value={form.cropsPerYear}
        onSelect={(v) => onFieldChange('cropsPerYear', String(v))}
      />
      <Input
        label="Crop Duration (months)"
        value={form.cropDuration}
        onChangeText={(v) => onFieldChange('cropDuration', v)}
      />
      <Select
        label="Crop Type"
        options={cropTypeOptions}
        value={form.cropType}
        onSelect={(v) => onFieldChange('cropType', String(v))}
      />

      {/* Financials */}
      <Input
        label="Leased Land Cost"
        value={form.leasedLandCost}
        onChangeText={(v) => onFieldChange('leasedLandCost', v)}
      />
      <Input
        label="Tillage Cost"
        value={form.tillageCost}
        onChangeText={(v) => onFieldChange('tillageCost', v)}
      />
      <Input
        label="Fertilizer Cost"
        value={form.fertilizerCost}
        onChangeText={(v) => onFieldChange('fertilizerCost', v)}
      />
      <Input
        label="Pest/Disease Control Cost"
        value={form.pestDiseaseCost}
        onChangeText={(v) => onFieldChange('pestDiseaseCost', v)}
      />
      <Input
        label="Crop Yield Average"
        value={form.cropYieldAverage}
        onChangeText={(v) => onFieldChange('cropYieldAverage', v)}
      />
      <Input
        label="Annual Income"
        value={form.income}
        onChangeText={(v) => onFieldChange('income', v)}
      />
    </View>
  );
}
