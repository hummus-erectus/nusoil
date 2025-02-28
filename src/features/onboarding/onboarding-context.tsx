/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { useUserStore } from '@/stores/user-store';

interface OnboardingContextType {
  isOnboarding: boolean;
  startOnboarding: () => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  navigateToAddLand: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isLayoutMounted, setIsLayoutMounted] = useState(false);
  const { lands, hasSkippedOnboarding, setHasSkippedOnboarding } =
    useUserStore();

  // Mark the layout as mounted after initial render
  useEffect(() => {
    setIsLayoutMounted(true);
  }, []);

  // Check if user needs onboarding (no land accounts)
  useEffect(() => {
    // We only want to prompt for onboarding if:
    // 1. The user is logged in and has no lands
    // 2. The layout is mounted
    // 3. We're not already in onboarding
    // 4. The user hasn't explicitly skipped onboarding
    if (
      lands.length === 0 &&
      isLayoutMounted &&
      !isOnboarding &&
      !hasSkippedOnboarding
    ) {
      setIsOnboarding(true);
      // Navigate to the onboarding screen
      router.replace('/onboarding');
    }
  }, [lands, isLayoutMounted, isOnboarding, hasSkippedOnboarding]);

  const startOnboarding = () => {
    if (hasSkippedOnboarding) {
      // If they've skipped before but now want to see onboarding, reset the flag
      setHasSkippedOnboarding(false);
    }

    setIsOnboarding(true);
    if (isLayoutMounted) {
      router.replace('/onboarding');
    }
  };

  const navigateToAddLand = () => {
    // Only navigate if the layout is mounted
    if (isLayoutMounted) {
      router.push('/land-management/add');
    }
  };

  const completeOnboarding = () => {
    setIsOnboarding(false);
    // Mark as completed so we don't show it again
    setHasSkippedOnboarding(true);
  };

  const skipOnboarding = () => {
    setIsOnboarding(false);
    // Mark as skipped so we don't show it again
    setHasSkippedOnboarding(true);

    if (isLayoutMounted) {
      router.replace('/(app)');
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding,
        startOnboarding,
        completeOnboarding,
        skipOnboarding,
        navigateToAddLand,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
