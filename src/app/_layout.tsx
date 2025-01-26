// Import  global CSS file
import '../../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { APIProvider } from '@/api';
import colors from '@/components/ui/colors';
import {
  HamburgerMenu as HamburgerMenuIcon,
  NotificationBell as NotificationBellIcon,
} from '@/components/ui/icons';
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

// Custom header component
function CustomHeader() {
  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
      <Image
        source={require('../../assets/splash-icon.png')}
        style={styles.logo}
      />

      <View className="flex flex-row gap-14">
        <View style={styles.headerRight}>
          <Pressable
            onPress={() => {
              /* TODO: Handle notification press */
            }}
          >
            <NotificationBellIcon
              color={colors.neutral[100]}
              className="w-full"
            />
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            /* TODO: Handle menu press */
          }}
        >
          <HamburgerMenuIcon color={colors.neutral[100]} />
        </Pressable>
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Providers>
      <Stack
        screenOptions={{
          header: (props) => {
            // Only show header for screens within (app) group
            const routeName = props.route.name;
            if (routeName === 'login' || routeName === 'onboarding') {
              return null;
            }
            return <CustomHeader />;
          },
        }}
      >
        <Stack.Screen name="(app)" options={{ headerShown: true }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView
      style={[
        styles.container,
        { backgroundColor: theme.dark ? '#000' : '#fff', margin: 0 },
      ]}
      className={`bg-neutral-100 ${theme.dark ? 'dark' : ''}`}
    >
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 63,
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
