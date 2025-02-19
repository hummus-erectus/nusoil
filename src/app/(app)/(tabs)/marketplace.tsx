/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated from 'react-native-reanimated';
import { z } from 'zod';

import { accountOptions } from '@/app/(app)/(tabs)/nutrient-portfolio/types';
import { Button, FormCard, Radio, Select } from '@/components/ui';
import { CaretDown } from '@/components/ui/icons';
import { UpgradeOverlay } from '@/components/upgrade-overlay';
import { useNotifications } from '@/features/notifications/notifications-context';
import { useUserStore } from '@/stores/user-store';

const financeTypeSchema = z.enum(['credit', 'investment', 'loan', 'grant']);
const financePurposeSchema = z.enum([
  'land_development',
  'equipment_purchase',
  'crop_financing',
  'sustainability_projects',
]);
const initiativeTypeSchema = z.enum([
  'climate',
  'soil_health',
  'water_conservation',
  'biodiversity',
  'community',
]);

// Get account values from accountOptions for schema validation
const accountValues = accountOptions.map((opt) => opt.value.toString());
const accountSchema = z.enum(accountValues as [string, ...string[]]);

type FinanceType = z.infer<typeof financeTypeSchema>;
type FinancePurpose = z.infer<typeof financePurposeSchema>;
type InitiativeType = z.infer<typeof initiativeTypeSchema>;
type AccountType = z.infer<typeof accountSchema>;

type OptionType<T extends string> = { label: string; value: T };

const financeTypeOptions: OptionType<FinanceType>[] = [
  { label: 'Credit', value: 'credit' },
  { label: 'Investment', value: 'investment' },
  { label: 'Loan', value: 'loan' },
  { label: 'Grant', value: 'grant' },
];

const financePurposeOptions: OptionType<FinancePurpose>[] = [
  { label: 'Land Development', value: 'land_development' },
  { label: 'Equipment Purchase', value: 'equipment_purchase' },
  { label: 'Crop Financing', value: 'crop_financing' },
  { label: 'Sustainability Projects', value: 'sustainability_projects' },
];

const initiativeTypeOptions: OptionType<InitiativeType>[] = [
  { label: 'Climate', value: 'climate' },
  { label: 'Soil Health', value: 'soil_health' },
  { label: 'Water Conservation', value: 'water_conservation' },
  { label: 'Biodiversity', value: 'biodiversity' },
  { label: 'Community Development', value: 'community' },
];

const leaseFormSchema = z.object({
  type: z.enum(['take', 'give']),
  account: accountSchema,
});

const financeFormSchema = z.object({
  type: financeTypeSchema,
  purpose: financePurposeSchema,
  account: accountSchema,
});

const initiativeFormSchema = z.object({
  type: initiativeTypeSchema,
  account: accountSchema,
});

type LeaseFormType = z.infer<typeof leaseFormSchema>;
type FinanceFormType = z.infer<typeof financeFormSchema>;
type InitiativeFormType = z.infer<typeof initiativeFormSchema>;

export default function Marketplace() {
  const { subscriptionPlan } = useUserStore();
  const { addNotification } = useNotifications();
  const hasAccess = ['Mature', 'Harvest'].includes(subscriptionPlan);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const loadingStartTimeRef = React.useRef(0);

  const MINIMUM_LOADING_TIME = 2000; // 2 seconds

  const {
    handleSubmit: handleLeaseSubmit,
    setValue: setLeaseValue,
    watch: watchLease,
  } = useForm<LeaseFormType>({
    resolver: zodResolver(leaseFormSchema),
    defaultValues: {
      account: accountOptions[0].value.toString(),
    },
  });

  const {
    handleSubmit: handleFinanceSubmit,
    setValue: setFinanceValue,
    watch: watchFinance,
  } = useForm<FinanceFormType>({
    resolver: zodResolver(financeFormSchema),
    defaultValues: {
      type: financeTypeOptions[0].value,
      purpose: financePurposeOptions[0].value,
      account: accountOptions[0].value.toString(),
    },
  });

  const {
    handleSubmit: handleInitiativeSubmit,
    setValue: setInitiativeValue,
    watch: watchInitiative,
  } = useForm<InitiativeFormType>({
    resolver: zodResolver(initiativeFormSchema),
    defaultValues: {
      type: initiativeTypeOptions[0].value,
      account: accountOptions[0].value.toString(),
    },
  });

  const leaseType = watchLease('type');

  const onLeaseSubmit = (_data: LeaseFormType) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    loadingStartTimeRef.current = Date.now();

    // Simulate request
    setTimeout(() => {
      const elapsedTime = Date.now() - loadingStartTimeRef.current;
      const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        addNotification({
          title: 'Request Received',
          message:
            'Your farm lease request has been received. We will review it and get back to you soon.',
          type: 'success',
          read: false,
        });
      }, remainingTime);
    }, 0);
  };

  const onFinanceSubmit = (_data: FinanceFormType) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    loadingStartTimeRef.current = Date.now();

    // Simulate request
    setTimeout(() => {
      const elapsedTime = Date.now() - loadingStartTimeRef.current;
      const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        addNotification({
          title: 'Request Received',
          message:
            'Your finance request has been received. We will review it and get back to you soon.',
          type: 'success',
          read: false,
        });
      }, remainingTime);
    }, 0);
  };

  const onInitiativeSubmit = (_data: InitiativeFormType) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    loadingStartTimeRef.current = Date.now();

    // Simulate request
    setTimeout(() => {
      const elapsedTime = Date.now() - loadingStartTimeRef.current;
      const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        addNotification({
          title: 'Request Received',
          message:
            'Your initiative request has been received. We will review it and get back to you soon.',
          type: 'success',
          read: false,
        });
      }, remainingTime);
    }, 0);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const getCaretStyle = (dropdownName: string) => {
    return {
      transform: [
        { rotate: activeDropdown === dropdownName ? '180deg' : '0deg' },
      ],
    };
  };

  // If submitting, show loading state
  if (isSubmitting) {
    return (
      <View className="flex-1 items-center justify-center">
        <View className="items-center gap-4">
          <ActivityIndicator size="large" color="#3498db" />
          <Text className="font-poppins text-base text-neutral-600">
            Submitting your request...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 gap-10 p-6">
          <Text className="text-center font-lora text-3xl text-primary">
            Marketplace
          </Text>
          <View>
            <Pressable
              onPress={() => toggleDropdown('farmLease')}
              className="flex-row items-center justify-between"
            >
              <Text className="font-lora text-xl text-primary">Farm Lease</Text>
              <Animated.View style={getCaretStyle('farmLease')}>
                <CaretDown />
              </Animated.View>
            </Pressable>
            {activeDropdown === 'farmLease' && (
              <FormCard className="mt-2">
                <View className="mt-2 gap-6">
                  <View className="gap-4">
                    <Text className="ml-2 font-poppins-regular text-sm text-neutral-600">
                      Select an option
                    </Text>
                    <View className="flex-row">
                      <View className="flex-1">
                        <Radio
                          checked={leaseType === 'take'}
                          onChange={() => setLeaseValue('type', 'take')}
                          label="Take"
                          accessibilityLabel="Take"
                        />
                      </View>
                      <View className="flex-1">
                        <Radio
                          checked={leaseType === 'give'}
                          onChange={() => setLeaseValue('type', 'give')}
                          label="Give"
                          accessibilityLabel="Give"
                        />
                      </View>
                    </View>
                  </View>
                  <Select
                    label="Select Account"
                    options={accountOptions}
                    value={watchLease('account')}
                    onSelect={(value) =>
                      setLeaseValue('account', value.toString() as AccountType)
                    }
                  />
                  <View>
                    <Button
                      onPress={handleLeaseSubmit(onLeaseSubmit)}
                      fullWidth={false}
                      label="Submit Lease Request"
                    />
                  </View>
                </View>
              </FormCard>
            )}
          </View>
          <View>
            <Pressable
              onPress={() => toggleDropdown('finance')}
              className="flex-row items-center justify-between"
            >
              <Text className="font-lora text-xl text-primary">Finance</Text>
              <Animated.View style={getCaretStyle('finance')}>
                <CaretDown />
              </Animated.View>
            </Pressable>
            {activeDropdown === 'finance' && (
              <FormCard className="mt-2">
                <View className="mt-2 gap-4">
                  <Select
                    label="Finance Type"
                    options={financeTypeOptions}
                    value={watchFinance('type')}
                    onSelect={(value) =>
                      setFinanceValue('type', value as FinanceType)
                    }
                  />
                  <Select
                    label="Purpose"
                    options={financePurposeOptions}
                    value={watchFinance('purpose')}
                    onSelect={(value) =>
                      setFinanceValue('purpose', value as FinancePurpose)
                    }
                  />
                  <Select
                    label="Select Account"
                    options={accountOptions}
                    value={watchFinance('account')}
                    onSelect={(value) =>
                      setFinanceValue(
                        'account',
                        value.toString() as AccountType
                      )
                    }
                  />
                  <View>
                    <Button
                      onPress={handleFinanceSubmit(onFinanceSubmit)}
                      fullWidth={false}
                      label="Submit Finance Request"
                    />
                  </View>
                </View>
              </FormCard>
            )}
          </View>
          <View>
            <Pressable
              onPress={() => toggleDropdown('newInitiative')}
              className="flex-row items-center justify-between"
            >
              <Text className="font-lora text-xl text-primary">
                New Initiative
              </Text>
              <Animated.View style={getCaretStyle('newInitiative')}>
                <CaretDown />
              </Animated.View>
            </Pressable>
            {activeDropdown === 'newInitiative' && (
              <FormCard className="mt-2">
                <View className="mt-2 gap-4">
                  <Select
                    label="Initiative Type"
                    options={initiativeTypeOptions}
                    value={watchInitiative('type')}
                    onSelect={(value) =>
                      setInitiativeValue('type', value as InitiativeType)
                    }
                  />
                  <Select
                    label="Select Account"
                    options={accountOptions}
                    value={watchInitiative('account')}
                    onSelect={(value) =>
                      setInitiativeValue(
                        'account',
                        value.toString() as AccountType
                      )
                    }
                  />
                  <View>
                    <Button
                      onPress={handleInitiativeSubmit(onInitiativeSubmit)}
                      fullWidth={false}
                      label="Submit Initiative"
                    />
                  </View>
                </View>
              </FormCard>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* Success Modal */}
      {showSuccess && (
        <View className="absolute inset-0 items-center justify-center bg-black/50">
          <View className="w-4/5 items-center rounded-2xl bg-white p-6 shadow-lg">
            <Text className="mb-4 text-center font-lora text-2xl text-primary">
              Request Received
            </Text>
            <Text className="mb-6 text-center font-poppins-regular text-base text-neutral-600">
              We will review your submission and get back to you soon.
            </Text>
            <Button
              variant="default"
              label="Close"
              onPress={() => setShowSuccess(false)}
            />
          </View>
        </View>
      )}

      {/* Show upgrade overlay if user doesn't have access */}
      {!hasAccess && (
        <UpgradeOverlay requiredPlan="Mature" currentPlan={subscriptionPlan} />
      )}
    </View>
  );
}
