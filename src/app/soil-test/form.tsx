import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import SoilTestForm from '@/components/soil-test-form';
import { FocusAwareStatusBar } from '@/components/ui';

export default function SoilTestFormPage() {
  const { landId } = useLocalSearchParams<{ landId: string }>();

  if (!landId) {
    return null; // Or show an error message
  }

  return (
    <>
      <FocusAwareStatusBar />
      <SoilTestForm landId={landId} />
    </>
  );
}
