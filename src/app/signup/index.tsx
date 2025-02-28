/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { SignupSplash } from '@/components/signup-splash';
import { Button, FormCard, Input, Select, Text } from '@/components/ui';
import { FocusAwareStatusBar } from '@/components/ui';
import {
  ArrowRightFull as ArrowRightFullIcon,
  CircleTick as CircleTickIcon,
} from '@/components/ui/icons';
import { useSignupStore } from '@/stores/signup-store';

const countryOptions = [
  { label: 'India', value: 'IN' },
  { label: 'Indonesia', value: 'ID' },
  { label: 'Malaysia', value: 'MY' },
  // Add more countries as needed
];

export default function Signup() {
  const [step, setStep] = useState<'splash' | 'form' | 'success'>('splash');
  const { farmerData, setFarmerData, resetSignupForm } = useSignupStore();
  const [formPassword, setFormPassword] = useState('');
  const [formEmail, setFormEmail] = useState('');

  const handleSplashSubmit = () => {
    setStep('form');
  };

  const handleFormSubmit = () => {
    // Collect all the signup data
    const signupData = {
      name: farmerData.name,
      email: formEmail,
      password: formPassword,
      nationalId: farmerData.nationalId,
      streetAddress: farmerData.streetAddress,
      state: farmerData.state,
      country: farmerData.country,
      zipCode: farmerData.zipCode,
    };

    // Log the data that would be sent to the server
    console.log('Signup data to be sent to server:', signupData);

    // Show success screen
    setStep('success');
  };

  const handleCompleteSignup = () => {
    // Reset the signup form
    resetSignupForm();

    // Redirect to login page
    router.replace('/');
  };

  if (step === 'splash') {
    return (
      <>
        <FocusAwareStatusBar />
        <SignupSplash onSubmit={handleSplashSubmit} />
      </>
    );
  }

  if (step === 'success') {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <View className="mb-8 items-center">
          <CircleTickIcon color="#4CAF50" />
          <Text className="mt-4 text-center font-lora text-3xl text-primary">
            Registration Complete!
          </Text>
          <Text className="mt-4 text-center text-neutral-600">
            Your account has been successfully created. You can now log in with
            your credentials.
          </Text>
        </View>
        <Button onPress={handleCompleteSignup} label="Go to Login" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 p-6">
        <Text className="mb-6 text-center font-lora text-3xl text-neutral-700">
          Create Your Account
        </Text>

        <FormCard>
          <View className="gap-4">
            <Input
              value={farmerData.name}
              onChangeText={(text) => setFarmerData({ name: text })}
              placeholder="Full Name"
            />
            <Input
              value={formEmail}
              onChangeText={setFormEmail}
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              value={formPassword}
              onChangeText={setFormPassword}
              placeholder="Password"
              secureTextEntry
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
              label="Country"
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
              onPress={handleFormSubmit}
              fullWidth={false}
              label={
                <View className="flex-row items-center justify-center">
                  <Text className="mr-4 text-white">Sign Up</Text>
                  <ArrowRightFullIcon color="white" />
                </View>
              }
            />
          </View>
        </FormCard>
      </View>
    </KeyboardAwareScrollView>
  );
}
