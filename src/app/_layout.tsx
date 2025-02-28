// Import  global CSS file
import '../../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { APIProvider } from '@/api';
import { FocusAwareStatusBar } from '@/components/ui';
import { NotificationsProvider } from '@/features/notifications/notifications-context';
import { OnboardingProvider } from '@/features/onboarding';
import { hydrateAuth, loadSelectedTheme } from '@/lib';
import { useThemeConfig } from '@/lib/use-theme-config';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(app)',
};

hydrateAuth();
loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const theme = useThemeConfig();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={theme}>
        <BottomSheetModalProvider>
          <KeyboardProvider>
            <APIProvider>
              <NotificationsProvider>
                <OnboardingProvider>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(app)" />
                    <Stack.Screen name="login" />
                    <Stack.Screen name="signup" />
                    <Stack.Screen name="soil-test" />
                    <Stack.Screen name="upgrade" />
                    <Stack.Screen
                      name="(modals)"
                      options={{
                        headerShown: false,
                        animation: 'fade_from_bottom',
                      }}
                    />
                    <Stack.Screen name="land-management" />
                    <Stack.Screen name="onboarding" />
                  </Stack>
                  <FocusAwareStatusBar alwaysShow />
                  <FlashMessage position="top" />
                </OnboardingProvider>
              </NotificationsProvider>
            </APIProvider>
          </KeyboardProvider>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
