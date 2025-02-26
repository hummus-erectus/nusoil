import { Stack } from 'expo-router';
import React from 'react';

export default function SoilTestLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Soil Test' }} />
      <Stack.Screen
        name="form"
        options={{
          title: 'Soil Test Form',
        }}
      />
      <Stack.Screen
        name="order"
        options={{
          title: 'Order Soil Test',
        }}
      />
    </Stack>
  );
}
