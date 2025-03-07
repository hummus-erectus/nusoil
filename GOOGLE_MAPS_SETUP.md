# Setting up Google Maps API Key for NuSoil

To use the polygon mapping feature in the NuSoil app, you need to set up a Google Maps API key. This document provides step-by-step instructions on how to obtain and configure the API key.

## Step 1: Create a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps SDK for Android
   - Maps SDK for iOS
4. Create an API key in the Credentials section
5. (Optional but recommended) Restrict the API key to only the APIs you need and add application restrictions

## Step 2: Configure the API Key in Your Development Environment

There are two ways to add the API key to your app:

### Option 1: Using Environment Variables (Recommended)

1. Create a `.env.development` file in the root of your project (copy from `.env.development.template`)
2. Add your Google Maps API key to the file:

```
# API URL
API_URL=

# Google Maps API Key
GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

3. Restart your development server

### Option 2: Directly in app.config.ts (Not recommended for production)

1. Open `app.config.ts`
2. Replace the placeholder API key with your actual key:

```typescript
const GOOGLE_MAPS_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
```

**Note:** Do not commit your API key to version control if you use this method.

## Step 3: Run the App

After configuring the API key, run the app using:

```
pnpm start
```

## Troubleshooting

If you encounter issues with the map:

1. Verify that you've enabled the correct APIs in Google Cloud Console
2. Check that your API key has the necessary permissions
3. Ensure you've correctly added the API key to your environment
4. Check the app logs for specific error messages

## Security Considerations

- Never commit your API keys to version control
- Use API key restrictions in the Google Cloud Console to limit usage
- For production builds, consider using a CI/CD system to inject the API key during the build process
