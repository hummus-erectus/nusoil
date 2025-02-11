import { Stack } from 'expo-router';
import React from 'react';

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Settings' }} />
      <Stack.Screen
        name="style"
        options={{
          headerShown: true,
          title: 'Style Guide',
        }}
      />
    </Stack>
  );
}
