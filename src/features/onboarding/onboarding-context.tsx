// This file is kept as a placeholder for backward compatibility
// The actual onboarding logic has been simplified and moved to the login flow

import { router } from 'expo-router';
import React from 'react';

interface OnboardingContextType {
  isOnboarding: boolean;
  startOnboarding: () => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  navigateToAddLand: () => void;
}

// Create empty context with placeholder functions
const OnboardingContext = React.createContext<OnboardingContextType>({
  isOnboarding: false,
  startOnboarding: () =>
    console.log('Onboarding simplified - startOnboarding not needed'),
  completeOnboarding: () =>
    console.log('Onboarding simplified - completeOnboarding not needed'),
  skipOnboarding: () => {
    console.log('Onboarding simplified - redirecting to home');
    router.replace('/(app)');
  },
  navigateToAddLand: () => {
    console.log('Onboarding simplified - redirecting to add land');
    router.push('/land-management/add');
  },
});

// Simple provider that does nothing but return children
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding: false,
        startOnboarding: () =>
          console.log('Onboarding simplified - startOnboarding not needed'),
        completeOnboarding: () =>
          console.log('Onboarding simplified - completeOnboarding not needed'),
        skipOnboarding: () => {
          console.log('Onboarding simplified - redirecting to home');
          router.replace('/(app)');
        },
        navigateToAddLand: () => {
          console.log('Onboarding simplified - redirecting to add land');
          router.push('/land-management/add');
        },
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// Hook that provides access to the context
export const useOnboarding = (): OnboardingContextType => {
  return React.useContext(OnboardingContext);
};
