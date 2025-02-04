import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Platform, StatusBar } from 'react-native';

import colors from './colors';

type Props = { hidden?: boolean };
export const FocusAwareStatusBar = ({ hidden = false }: Props) => {
  const isFocused = useIsFocused();

  if (Platform.OS === 'web') return null;

  return isFocused ? (
    <StatusBar
      barStyle="light-content"
      backgroundColor={colors.primary}
      hidden={hidden}
    />
  ) : null;
};
