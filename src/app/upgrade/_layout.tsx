import { Stack } from 'expo-router';
import React from 'react';

export default function UpgradeLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerBackVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Upgrade',
          }}
        />
      </Stack>
    </>
  );
}
