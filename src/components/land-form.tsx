/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

import {
  Button,
  ControlledInput,
  ControlledNumberInput,
  ControlledSelect,
  FormCard,
  Text,
} from '@/components/ui';

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
  ownershipType: z.string().optional(),
  rainWater: z.string().optional(),
  groundWater: z.string().optional(),
  waterIrrigationType: z.string().optional(),
  waterPump: z.string().optional(),
  tillageType: z.string().optional(),
  cropsPerYear: z.string().optional(),
  cropType: z.string().optional(),
  irrigationType: z.string().optional(),
  coordinates: z
    .array(
      z.object({
        latitude: z.number(),
        longitude: z.number(),
      })
    )
    .optional(),
});

export type LandFormSchema = z.infer<typeof landFormSchema>;

export type LandFormProps = {
  onSubmit: SubmitHandler<LandFormSchema>;
  defaultValues?: Partial<LandFormSchema>;
  tempId?: string;
  onDirtyChange?: (dirty: boolean) => void;
};

export const LandForm = ({
  onSubmit,
  defaultValues,
  onDirtyChange,
  // tempId,
}: LandFormProps) => {
  const { handleSubmit, control, formState } = useForm<LandFormSchema>({
    resolver: zodResolver(landFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (onDirtyChange) {
      onDirtyChange(formState.isDirty);
    }
  }, [formState.isDirty, onDirtyChange]);

  // const handleOpenPolygonMap = () => {
  //   // If we are adding a new land but generating the id upon creation, it won't exist at this point
  //   // TODO: Generate the id upon creation
  //   // TODO: Pass existing ID if exists
  //   router.push({
  //     pathname: '/land-management/polygon-map',
  //     params: { landId: tempId },
  //   });
  // };

  const handleFormSubmit = useCallback<SubmitHandler<LandFormSchema>>(
    (data, event) => {
      onSubmit(data, event);
    },
    [onSubmit]
  );

  return (
    <View className="gap-4">
      {/* Physical Location */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">
          Physical Location of Your Farm
        </Text>
        <FormCard className="gap-4">
          <ControlledInput
            label="Location Name"
            name="farmLocationName"
            control={control}
            placeholder="e.g. 'Shibata North'"
          />
          <ControlledInput
            label="City/ Town"
            name="farmCity"
            control={control}
            placeholder="e.g. 'Niigata'"
          />
        </FormCard>
        {/* <FormCard className="gap-6">
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
        </FormCard> */}
      </View>

      {/* Ownership */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Ownership</Text>
        <FormCard className="gap-4">
          <ControlledSelect
            label="Ownership Type"
            name="ownershipType"
            control={control}
            options={ownershipOptions}
          />
          <ControlledNumberInput
            label="Years Operated"
            name="yearsOperated"
            control={control}
            placeholder="0"
            min={0}
          />
          <ControlledNumberInput
            label="Leased Amount"
            name="leasedAmount"
            control={control}
            placeholder="0"
            min={0}
            allowDecimals={true}
          />
        </FormCard>
      </View>

      {/* Water Availability */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Water Availability</Text>
        <FormCard className="gap-4">
          <ControlledSelect
            label="Rain Water"
            name="rainWater"
            control={control}
            options={rainWaterOptions}
          />
          <ControlledSelect
            label="Ground Water"
            name="groundWater"
            control={control}
            options={groundWaterOptions}
          />
          <ControlledSelect
            label="Water Irrigation Type"
            name="waterIrrigationType"
            control={control}
            options={waterIrrigationTypeOptions}
          />
          <ControlledNumberInput
            label="Number of Days"
            name="waterDays"
            control={control}
            placeholder="0"
            min={0}
          />
        </FormCard>
      </View>

      {/* Irrigation Technology */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Irrigation Technology</Text>
        <FormCard className="gap-4">
          <ControlledSelect
            label="Irrigation Type"
            name="irrigationType"
            control={control}
            options={irrigationOptions}
          />
          <ControlledSelect
            label="Water Pump"
            name="waterPump"
            control={control}
            options={waterPumpOptions}
          />
        </FormCard>
      </View>

      {/* Tillage Practices */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Tillage Practices</Text>
        <FormCard className="gap-4">
          <ControlledSelect
            label="Tillage Practices"
            name="tillageType"
            control={control}
            options={tillageOptions}
          />
        </FormCard>
      </View>

      {/* Land Use Intensity */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Land Use Intensity</Text>
        <FormCard className="gap-4">
          <ControlledSelect
            label="Number of Crops per Calendar Year"
            name="cropsPerYear"
            control={control}
            options={cropsPerYearOptions}
          />
          <ControlledNumberInput
            label="Crop Duration (Days Average)"
            name="cropDuration"
            control={control}
            placeholder="0"
            min={0}
          />
          <ControlledSelect
            label="Type"
            name="cropType"
            control={control}
            options={cropTypeOptions}
          />
        </FormCard>
      </View>

      {/* Cost */}
      <View className="gap-4">
        <Text className="font-lora text-secondary">Cost</Text>
        <FormCard className="gap-4">
          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <ControlledNumberInput
                label="Cost of Leased Land"
                name="leasedLandCost"
                control={control}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>

          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <ControlledNumberInput
                label="Tillage Cost"
                name="tillageCost"
                control={control}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>

          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <ControlledNumberInput
                label="Fertilizer Cost"
                name="fertilizerCost"
                control={control}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>

          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <ControlledNumberInput
                label="Pest and Disease Management Cost"
                name="pestDiseaseCost"
                control={control}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>

          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <ControlledNumberInput
                label="Yield Average from All Crops"
                name="cropYieldAverage"
                control={control}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>

          <View className="flex w-full flex-row items-center">
            <View className="flex-1">
              <ControlledNumberInput
                label="Income per year"
                name="income"
                control={control}
                placeholder="00.00"
                min={0}
                allowDecimals={true}
              />
            </View>
            <Text className="ml-4 pt-2 text-sm text-neutral-600">EUR</Text>
          </View>

          <View className="flex-row gap-2">
            <View className="flex-1">
              <Button
                variant="secondary"
                label="Cancel"
                onPress={() => router.back()}
              />
            </View>
            <View className="flex-1">
              <Button
                variant="default"
                label="Save"
                onPress={handleSubmit(handleFormSubmit)}
              />
            </View>
          </View>
        </FormCard>
      </View>
    </View>
  );
};
