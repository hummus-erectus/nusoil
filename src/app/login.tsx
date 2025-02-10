import { useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/lib';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);
    // Sign the user in
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    // Replace the login route with the app route so the login screen is removed from navigation history
    router.replace('/(app)');
  };
  return (
    <>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
