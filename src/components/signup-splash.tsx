/* eslint-disable max-lines-per-function */
import { Link } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { Button, FormCard, Text, View } from '@/components/ui';
import { useSignupStore } from '@/stores/signup-store';

import { SignupProgress } from './signup-progress';
import { ArrowRightFull as ArrowRightFullIcon } from './ui/icons';

export type SignupSplashProps = {
  onSubmit?: () => void;
};

export const SignupSplash = ({ onSubmit = () => {} }: SignupSplashProps) => {
  const resetSignupForm = useSignupStore((state) => state.resetSignupForm);

  // Reset form data when splash screen mounts
  React.useEffect(() => {
    resetSignupForm();
  }, [resetSignupForm]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center gap-4 p-6">
        <Text className="mb-6 text-center font-lora text-3xl text-primary">
          Sign Up
        </Text>

        <SignupProgress currentStep="intro" />

        <Text className="mt-2 text-center text-neutral-400">
          Register your NuSoil account{'\n'}in just three steps!
        </Text>

        <View className="gap-6">
          <View className="gap-2">
            <Text className="text-xs text-neutral-400">
              <Text className="text-xs text-neutral-600">Step 1</Text>/3
            </Text>
            <FormCard className="flex-row justify-between">
              <Text className="font-poppins-semibold text-base text-neutral-600">
                Farmer
              </Text>
              <ArrowRightFullIcon />
            </FormCard>
          </View>

          <View className="gap-2">
            <Text className="text-xs text-neutral-400">
              <Text className="text-xs text-neutral-600">Step 2</Text>/3
            </Text>
            <FormCard className="flex-row justify-between">
              <Text className="font-poppins-semibold text-base text-neutral-600">
                Farm Land
              </Text>
              <ArrowRightFullIcon />
            </FormCard>
          </View>

          <View className="gap-2">
            <Text className="text-xs text-neutral-400">
              <Text className="text-xs text-neutral-600">Step 3</Text>/3
            </Text>
            <FormCard className="flex-row justify-between">
              <Text className="font-poppins-semibold text-base text-neutral-600">
                Nutrient
              </Text>
              <ArrowRightFullIcon />
            </FormCard>
          </View>
        </View>

        <View className="mt-8">
          <Button onPress={onSubmit} fullWidth={false} label="Get Started!" />
        </View>

        <View className="gap-5">
          <Text className="text-center text-sm text-neutral-700">
            Already have a user account?
          </Text>

          <Link href="/login" asChild>
            <Button variant="link" label="Log in" underline />
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
