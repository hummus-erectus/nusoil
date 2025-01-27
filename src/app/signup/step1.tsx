/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { SignupProgress } from '@/components/signup-progress';
import { Button, FormCard, Input, Select, Text } from '@/components/ui';
import { ArrowRightFull as ArrowRightFullIcon } from '@/components/ui/icons';
import { useSignupStore } from '@/stores/signup-store';

const countryOptions = [
  { label: 'India', value: 'IN' },
  { label: 'Indonesia', value: 'ID' },
  { label: 'Malaysia', value: 'MY' },
  // Add more countries as needed
];

export default function FarmerStep() {
  const { farmerData, setFarmerData } = useSignupStore();

  const handleNext = () => {
    router.push('/signup/step2');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center gap-4 bg-neutral-100 p-6">
        <Text className="mb-6 text-center font-lora text-3xl text-primary">
          Sign Up
        </Text>

        <SignupProgress currentStep="farmer" />

        <Text className="mb-6 text-center font-lora text-3xl text-neutral-700">
          Farmer
        </Text>

        <FormCard>
          <View className="gap-4">
            <Input
              value={farmerData.name}
              onChangeText={(text) => setFarmerData({ name: text })}
              placeholder="Name"
            />
            <Input
              value={farmerData.nationalId}
              onChangeText={(text) => setFarmerData({ nationalId: text })}
              placeholder="National Identity Number"
            />
            <Input
              value={farmerData.streetAddress}
              onChangeText={(text) => setFarmerData({ streetAddress: text })}
              placeholder="Address (Street and city)"
            />
            <Input
              value={farmerData.state}
              onChangeText={(text) => setFarmerData({ state: text })}
              placeholder="State"
            />
            <Select
              value={farmerData.country}
              onSelect={(value) => setFarmerData({ country: value.toString() })}
              options={countryOptions}
              placeholder="Country"
            />
            <Input
              value={farmerData.zipCode}
              onChangeText={(text) => setFarmerData({ zipCode: text })}
              placeholder="PIN/ZIP code"
              keyboardType="numeric"
            />
          </View>

          <View className="mt-auto">
            <Button
              onPress={handleNext}
              fullWidth={false}
              label={
                <View className="flex-row items-center justify-center">
                  <Text className="mr-4 text-white">Next</Text>
                  <ArrowRightFullIcon color="white" />
                </View>
              }
            />
          </View>
        </FormCard>
      </View>
    </KeyboardAvoidingView>
  );
}
