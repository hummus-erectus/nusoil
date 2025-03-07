/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';
import type { AppIconBadgeConfig } from 'app-icon-badge/types';

import { ClientEnv, Env } from './env';

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_ENV !== 'production',
  badges: [
    {
      text: Env.APP_ENV,
      type: 'banner',
      color: 'white',
    },
    {
      text: Env.VERSION.toString(),
      type: 'ribbon',
      color: 'white',
    },
  ],
};

// For development, you can use a placeholder key here
// For production, you should use a proper API key from Google Cloud Console
const GOOGLE_MAPS_API_KEY =
  process.env.GOOGLE_MAPS_API_KEY || Env.GOOGLE_MAPS_API_KEY;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: 'obytesapp',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    config: {
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    },
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#003161',
    },
    package: Env.PACKAGE,
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON || './google-services.json',
    config: {
      googleMaps: {
        apiKey: GOOGLE_MAPS_API_KEY,
      },
    },
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    [
      'expo-splash-screen',
      // TODO: Update for iOS
      {
        backgroundColor: '#003161',
        image: './assets/splash-icon.png',
        imageWidth: 150,
      },
    ],
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Poppins-Light.ttf',
          './assets/fonts/Poppins-Regular.ttf',
          './assets/fonts/Poppins-Medium.ttf',
          './assets/fonts/Poppins-SemiBold.ttf',
          './assets/fonts/Poppins-Bold.ttf',
          './assets/fonts/Lora-VariableFont_wght.ttf',
        ],
      },
    ],
    'expo-localization',
    'expo-router',
    [
      'expo-notifications',
      {
        icon: './assets/notification-icon.png',
        color: '#ffffff',
        // sounds: ['./assets/notification-sound.wav'],
      },
    ],
    ['app-icon-badge', appIconBadgeConfig],
    ['react-native-edge-to-edge'],
    [
      'expo-location',
      {
        locationWhenInUsePermission:
          'Allow $(PRODUCT_NAME) to access your location for mapping your land boundaries.',
      },
    ],
  ],
  notification: {
    icon: './assets/icon.png',
    color: '#ffffff',
    iosDisplayInForeground: true,
  },
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
    googleMapsApiKey: GOOGLE_MAPS_API_KEY, // Make it available to the client code
  },
});
