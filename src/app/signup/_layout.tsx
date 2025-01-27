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
          title: 'Farmer',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="step2"
        options={{
          title: 'Farm Land',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="step3"
        options={{
          title: 'Nutrients',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
