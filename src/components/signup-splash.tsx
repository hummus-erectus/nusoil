/* eslint-disable max-lines-per-function */
import { Link } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { Button, FormCard, Text, View } from '@/components/ui';
import { useSignupStore } from '@/stores/signup-store';

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

        <Text className="mb-6 mt-2 text-center text-lg text-neutral-600">
          Welcome to NuSoil, where we help farmers manage their soil for optimal
          crop growth!
        </Text>

        <FormCard className="p-6">
          <Text className="mb-4 text-center font-poppins-semibold text-xl text-primary">
            Quick and Easy Sign Up
          </Text>

          <Text className="mb-2 text-neutral-600">
            • Create your account with personal information
          </Text>

          <Text className="mb-2 text-neutral-600">
            • Add your land accounts when you're ready
          </Text>

          <Text className="mb-2 text-neutral-600">
            • Track soil nutrients and get recommendations
          </Text>

          <Text className="mb-6 text-neutral-600">
            • Improve crop yields with personalized soil management
          </Text>
        </FormCard>

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
