/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import {
  Button,
  Checkbox,
  colors,
  ControlledInput,
  FormCard,
  Text,
  View,
} from '@/components/ui';
import { useSignupStore } from '@/stores/signup-store';

import { Enter as EnterIcon, EyeClosed, EyeOpen } from './ui/icons';

const schema = z.object({
  phoneNumber: z
    .string({
      required_error: 'Phone number is required',
    })
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

const RememberMeCheckbox = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox.Root
      checked={checked}
      onChange={setChecked}
      accessibilityLabel="Remember me"
      className="pb-2"
    >
      <Checkbox.Icon checked={checked} />
      <Checkbox.Label
        text="Remember me"
        className=" font-light text-neutral-700"
      />
    </Checkbox.Root>
  );
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const resetSignupForm = useSignupStore((state) => state.resetSignupForm);
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFormSubmit = React.useCallback<SubmitHandler<FormType>>(
    (data, event) => {
      // Reset signup form data when logging in
      resetSignupForm();
      onSubmit(data, event);
    },
    [onSubmit, resetSignupForm]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center bg-neutral-100 p-6">
        <View className="items-center justify-center">
          <Text
            testID="form-title"
            className="mt-8 text-center font-lora text-3xl text-primary"
          >
            Log in
          </Text>
        </View>

        <FormCard className="mt-10 flex gap-6">
          <View className="gap-1">
            <ControlledInput
              testID="phoneNumber"
              control={control}
              name="phoneNumber"
              placeholder="Mobile Number"
            />

            <View className="relative">
              <ControlledInput
                testID="password-input"
                control={control}
                name="password"
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
              />
              <View className="absolute right-3 top-1/4 -translate-y-1/2">
                <Button
                  variant="icon"
                  fullWidth={false}
                  onPress={togglePasswordVisibility}
                  className="m-0 p-0"
                  label={
                    isPasswordVisible ? (
                      <EyeOpen color={colors.neutral[300]} />
                    ) : (
                      <EyeClosed color={colors.neutral[300]} />
                    )
                  }
                />
              </View>
            </View>
          </View>

          {/* TODO: Implement forgot password functionality */}
          <View className="flex-row justify-end pb-2">
            <Button
              variant="link"
              label="Forgot Password?"
              className="text-right text-neutral-500"
              onPress={() => {
                // TODO: Add forgot password navigation or modal
                console.log('Forgot Password clicked');
              }}
            />
          </View>

          <RememberMeCheckbox />

          <Button
            testID="login-button"
            fullWidth={false}
            label={
              <View className="flex-row items-center justify-center">
                <Text className="mr-4 text-white">Login</Text>
                <EnterIcon color="white" />
              </View>
            }
            onPress={handleSubmit(handleFormSubmit)}
          />
          <View className="gap-5">
            <Text className="text-center text-sm text-neutral-700">
              Don't have a user account yet?
            </Text>

            <Link href="/signup" asChild>
              <Button variant="link" label="Sign Up" underline>
                Sign Up
              </Button>
            </Link>
          </View>
        </FormCard>
      </View>
    </KeyboardAvoidingView>
  );
};
