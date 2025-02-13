/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { z } from 'zod';

import { accountOptions } from '@/app/(app)/(tabs)/nutrient-portfolio/types';
import { Button, FormCard, Radio, Select } from '@/components/ui';
import { UpgradeOverlay } from '@/components/upgrade-overlay';
import { useUserStore } from '@/stores/user-store';

// Get account values from accountOptions for schema validation
const accountValues = accountOptions.map((opt) => opt.value.toString());
const accountSchema = z.enum(accountValues as [string, ...string[]]);

const walletOptionSchema = z.enum([
  'carbonCredit',
  'farmingAsAService',
  'nutrientProfile',
  'greenScore',
  'riskScore',
  'dataMonetization',
]);

const walletFormSchema = z.object({
  option: walletOptionSchema,
  account: accountSchema,
});

type WalletFormType = z.infer<typeof walletFormSchema>;
type AccountType = z.infer<typeof accountSchema>;

export default function LandWallet() {
  const { subscriptionPlan } = useUserStore();
  const hasAccess = subscriptionPlan === 'Harvest';

  const {
    handleSubmit: handleWalletSubmit,
    setValue: setWalletValue,
    watch: watchWallet,
  } = useForm<WalletFormType>({
    resolver: zodResolver(walletFormSchema),
    defaultValues: {
      option: 'carbonCredit',
      account: accountOptions[0].value.toString(),
    },
  });

  const walletOption = watchWallet('option');

  const onWalletSubmit = (data: WalletFormType) => {
    console.log('Wallet submitted:', data);
    // Get the account name from the selected account value
    const selectedAccount = accountOptions.find(
      (opt) => opt.value.toString() === data.account
    );
    router.push({
      pathname: '/(app)/(tabs)/land-wallet/balance',
      params: {
        account: selectedAccount?.label || '',
        option: data.option,
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 gap-10 p-6">
          <Text className="text-center font-lora text-3xl text-primary">
            Land Wallet
          </Text>
          <FormCard>
            <View className="mt-2 gap-6">
              <Select
                label="Select Account"
                options={accountOptions}
                value={watchWallet('account')}
                onSelect={(value) =>
                  setWalletValue('account', value.toString() as AccountType)
                }
              />
              <View className="gap-6">
                <Text className="ml-2 font-poppins-regular text-sm text-neutral-600">
                  Select an Option
                </Text>
                <View className="flex-1">
                  <Radio
                    checked={walletOption === 'carbonCredit'}
                    onChange={() => setWalletValue('option', 'carbonCredit')}
                    label="Carbon Credit"
                    accessibilityLabel="Carbon Credit"
                  />
                </View>
                <View className="flex-1">
                  <Radio
                    checked={walletOption === 'farmingAsAService'}
                    onChange={() =>
                      setWalletValue('option', 'farmingAsAService')
                    }
                    label="Farming as a Service"
                    accessibilityLabel="Farming as a Service"
                  />
                </View>
                <View className="flex-1">
                  <Radio
                    checked={walletOption === 'nutrientProfile'}
                    onChange={() => setWalletValue('option', 'nutrientProfile')}
                    label="Nutrient Profile"
                    accessibilityLabel="Nutrient Profile"
                  />
                </View>
                <View className="flex-1">
                  <Radio
                    checked={walletOption === 'greenScore'}
                    onChange={() => setWalletValue('option', 'greenScore')}
                    label="Green Score"
                    accessibilityLabel="Green Score"
                  />
                </View>
                <View className="flex-1">
                  <Radio
                    checked={walletOption === 'riskScore'}
                    onChange={() => setWalletValue('option', 'riskScore')}
                    label="Risk Score"
                    accessibilityLabel="Risk Score"
                  />
                </View>
                <View className="flex-1">
                  <Radio
                    checked={walletOption === 'dataMonetization'}
                    onChange={() =>
                      setWalletValue('option', 'dataMonetization')
                    }
                    label="Data Monetization"
                    accessibilityLabel="Data Monetization"
                  />
                </View>
              </View>

              <View>
                <Button
                  onPress={handleWalletSubmit(onWalletSubmit)}
                  fullWidth={false}
                  label="Submit!"
                />
              </View>
            </View>
          </FormCard>
        </View>
      </KeyboardAwareScrollView>

      {/* Show upgrade overlay if user doesn't have access */}
      {!hasAccess && (
        <UpgradeOverlay requiredPlan="Harvest" currentPlan={subscriptionPlan} />
      )}
    </View>
  );
}
