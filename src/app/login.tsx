import { useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/lib';
import { useUserStore } from '@/stores/user-store';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const { lands } = useUserStore();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    // Log the personal data
    console.log('Login data:', data);

    // Sign the user in
    signIn({ access: 'access-token', refresh: 'refresh-token' });

    // Check if user has registered lands
    if (lands.length === 0) {
      // Redirect to onboarding if no lands are registered
      router.replace('/onboarding');
    } else {
      // Otherwise, go to the main app
      router.replace('/');
    }
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
