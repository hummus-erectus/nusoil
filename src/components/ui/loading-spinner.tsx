import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import colors from './colors';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingSpinner = ({
  size = 'large',
  color = colors.primary,
}: LoadingSpinnerProps) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
