import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

import { BackButton } from './back-button';

interface SignupHeaderProps {
  title?: string;
}

export function SignupHeader({ title = 'Sign Up' }: SignupHeaderProps) {
  return (
    <View className="relative mb-6 gap-4">
      <View className="-ml-10 self-start">
        <BackButton />
      </View>
      <Text className="mb-6 text-center font-lora text-3xl text-primary">
        {title}
      </Text>
    </View>
  );
}
