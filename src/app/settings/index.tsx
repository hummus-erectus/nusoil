/* eslint-disable max-lines-per-function */
/* eslint-disable react/react-in-jsx-scope */
import { useRouter } from 'expo-router';
import { Share } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { BackButton } from '@/components/back-button';
import { Button, Text, View } from '@/components/ui';
import {
  DeviceMobile,
  Info,
  Logout,
  NotificationBell,
  Profile,
  Rate,
  Share as ShareIcon,
  Support,
} from '@/components/ui/icons';
import { SettingsItem } from '@/components/ui/settings-item';
import { translate, useAuth } from '@/lib';

export default function Settings() {
  const signOut = useAuth.use.signOut();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.replace('/login');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        // TODO: Update the link
        message:
          'Check out NuSoil - The ultimate soil health tracking app! https://nusoil.app',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 gap-6 p-6">
        <View className="-ml-10 self-start">
          <BackButton />
        </View>
        <Text className="text-center font-lora text-3xl text-primary">
          {translate('settings.title')}
        </Text>

        <View>
          <SettingsItem
            icon={Profile}
            title="Account"
            features={['User settings', 'Subscription']}
            onPress={() => router.push('/settings/account')}
          />
          <SettingsItem
            icon={DeviceMobile}
            title="App Settings"
            features={['Language', 'Theme']}
            onPress={() => router.push('/settings/app-settings')}
          />
          <SettingsItem
            icon={NotificationBell}
            title="Notifications"
            features={['Push', 'Email']}
            onPress={() => router.push('/settings/notifications')}
          />
          <SettingsItem
            icon={Info}
            title="About"
            features={['Version', 'Privacy Policy']}
            onPress={() => router.push('/settings/about')}
          />
        </View>

        <View className="gap-2">
          <Text className="font-poppins-semibold text-xl text-primary">
            Support Us
          </Text>

          <View className="rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <SettingsItem
              icon={ShareIcon}
              title="Share"
              features={['Tell friends about NuSoil']}
              onPress={handleShare}
            />
            <SettingsItem
              icon={Rate}
              title="Rate"
              features={['Rate us on the app store']}
              onPress={() => {}}
            />
            <SettingsItem
              icon={Support}
              title="Support"
              features={['Contact our support team']}
              onPress={() => {}}
            />
          </View>
        </View>

        <Button
          fullWidth={false}
          label={
            <View className="flex-row items-center justify-center">
              <Logout color="white" />
              <Text className="ml-4 text-white">Log out</Text>
            </View>
          }
          onPress={handleSignOut}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
