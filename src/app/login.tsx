import { useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/lib';
import { useUserStore } from '@/stores/user-store';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const { resetHasCompletedOnboarding } = useUserStore();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    // Log the personal data
    console.log('Login data:', data);

    // Reset onboarding flag on login
    resetHasCompletedOnboarding();

    // Sign the user in
    signIn({ access: 'access-token', refresh: 'refresh-token' });

    // Navigate to the app entry point which will handle routing logic
    router.replace('/');
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
