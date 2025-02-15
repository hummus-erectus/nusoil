<h1 align="center">
  <img alt="logo" src="./assets/splash-icon.png" width="160px" style="background-color: #1a1a1a; padding: 20px; border-radius: 15px;"/><br/>
Land Management Application </h1>

[![Powered by oBytes](https://img.shields.io/badge/Powered%20by-oBytes%20Template-blue.svg)](https://github.com/obytes/react-native-template-obytes)

Modern mobile application for soil quality monitoring and agricultural insights.

## Features

- **Real-time Soil Analytics**: Monitor soil moisture, pH levels, and nutrients
- **Push Notifications**: Get alerts for critical soil conditions
- **Cross-platform**: Built with React Native & Expo
- **Modern Stack**: TypeScript, Tailwind CSS, Expo Router
- **Notification System**: Custom in-app and push notification handling

## Development Setup

### Prerequisites

- [React Native dev environment ](https://reactnative.dev/docs/environment-setup)
- [Node.js LTS release](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall), required only for macOS or Linux users
- [Pnpm](https://pnpm.io/installation)

### Installation

```bash
git clone https://github.com/hummus-erectus/nusoil.git
cd nusoil
npx expo install
```

### Running the App

```bash
npx expo start
```

## Push Notifications Setup

To enable Firebase Cloud Messaging (FCM) for Android:

1. **Create Firebase Project**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create project "NuSoil-Notifications"

2. **Add Android App**

   - Package name: `com.nusoil.development` (match your app ID)
   - Download `google-services.json` and place in project root

3. **Rebuild Application**

```bash
npx expo prebuild
npx expo run:android
```

⚠️ **Never commit** `google-services.json` to version control! Use the sample file as a template.

## Environment Variables

Create `.env.development`:

```env
API_URL="your-api-url"
FIREBASE_API_KEY="your-key"
```

## Deployment

Build production APK:

```bash
npx expo build:android
```

---

**Security Note**: All sensitive keys are stored using Expo's secure environment variables.
