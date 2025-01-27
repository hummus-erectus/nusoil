import { useRouter } from 'expo-router';
import React from 'react';

import type { SignupSplashProps } from '@/components/signup-splash';
import { SignupSplash } from '@/components/signup-splash';
import { FocusAwareStatusBar } from '@/components/ui';

export default function Signup() {
  const router = useRouter();

  const onSubmit: SignupSplashProps['onSubmit'] = () => {
    router.push('/signup/step1');
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SignupSplash onSubmit={onSubmit} />
    </>
  );
}
