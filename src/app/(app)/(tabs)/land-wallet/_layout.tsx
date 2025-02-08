import { Stack } from 'expo-router';
import React from 'react';

export default function LandWalletLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Land Wallet' }} />
      <Stack.Screen
        name="balance"
        options={{
          headerShown: true,
          title: 'Balance',
        }}
      />
    </Stack>
  );
}
