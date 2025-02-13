import { Stack } from 'expo-router';
import React from 'react';

export default function NutrientPortfolioLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Nutrient Portfolio' }} />
      <Stack.Screen
        name="nutrient-management"
        options={{
          headerShown: true,
          title: 'Nutrient Management',
        }}
      />
    </Stack>
  );
}
