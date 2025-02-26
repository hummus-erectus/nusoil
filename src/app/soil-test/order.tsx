import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { FocusAwareStatusBar, Text } from '@/components/ui';

export default function SoilTestOrderPage() {
  const { landId } = useLocalSearchParams<{ landId: string }>();

  if (!landId) {
    return null; // Or show an error message
  }

  return (
    <>
      <FocusAwareStatusBar />
      <Text>Order Soil Test</Text>
    </>
  );
}
