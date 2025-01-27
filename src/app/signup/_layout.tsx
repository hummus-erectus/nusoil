import { Stack } from 'expo-router';
import React from 'react';

export default function SignupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Sign Up',
        }}
      />
      <Stack.Screen
        name="step1"
        options={{
          title: 'Personal Details',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="step2"
        options={{
          title: 'Farm Details',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="step3"
        options={{
          title: 'Nutrient Preferences',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
