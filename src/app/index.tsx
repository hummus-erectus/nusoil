import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';

import { useAuth } from '@/lib';
import { useUserStore } from '@/stores/user-store';

/**
 * Entry point for the application that handles routing logic
 * - If user is not authenticated, redirect to login
 * - Otherwise, redirect to the main app where onboarding will be shown as a modal if needed
 */
export default function AppEntryPoint() {
  const token = useAuth.use.token();
  const status = useAuth.use.status();
  const { lands, setHasCompletedOnboarding } = useUserStore();

  // Effect to mark onboarding as completed if user has lands
  useEffect(() => {
    if (lands.length > 0) {
      setHasCompletedOnboarding(true);
    }
  }, [lands, setHasCompletedOnboarding]);

  // If user is not authenticated, redirect to login
  if (!token || status === 'signOut') {
    return <Redirect href="/login" />;
  }

  // Always redirect to the main app
  // The onboarding modal will be shown there if needed
  return <Redirect href="/(app)" />;
}
