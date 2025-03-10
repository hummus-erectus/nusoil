import { Stack } from 'expo-router';
import React from 'react';

export default function LandManagementLayout() {
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
            title: 'Land Management',
          }}
        />
        <Stack.Screen
          name="edit"
          options={{
            title: 'Edit Land',
          }}
        />
        <Stack.Screen
          name="add"
          options={{
            title: 'Add Land',
          }}
        />
      </Stack>
    </>
  );
}
