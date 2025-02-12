import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { AppState, Platform, StatusBar } from 'react-native';

import colors from './colors';

type Props = { hidden?: boolean; alwaysShow?: boolean };
export const FocusAwareStatusBar = ({
  hidden = false,
  alwaysShow = false,
}: Props) => {
  const isFocused = useIsFocused();
  const [isActive, setIsActive] = React.useState(true);

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      setIsActive(nextAppState === 'active');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (Platform.OS === 'web') return null;

  return alwaysShow || (isFocused && isActive) ? (
    <StatusBar
      barStyle="light-content"
      backgroundColor={colors.primary}
      hidden={hidden}
    />
  ) : null;
};
