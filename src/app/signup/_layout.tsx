import { Stack } from 'expo-router';
import React from 'react';

import { FocusAwareStatusBar } from '@/components/ui';

export default function SignupLayout() {
  return (
    <>
      <FocusAwareStatusBar />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
