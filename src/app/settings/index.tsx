/* eslint-disable max-lines-per-function */
/* eslint-disable react/react-in-jsx-scope */
import { Env } from '@env';
import { Link, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import { Button, colors, Text, View } from '@/components/ui';
import {
  Github,
  Logout,
  Profile,
  Rate,
  Share,
  Support,
  Website,
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

  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 gap-6 p-6">
        <Text className="mt-10 text-center font-lora text-3xl text-primary">
          {translate('settings.title')}
        </Text>

        <SettingsItem
          icon={Profile}
          title="Account"
          features={['User settings', 'Subscription']}
          onPress={() => router.push('/settings/account')}
        />
        <ItemsContainer title="settings.generale">
          <LanguageItem />
          <ThemeItem />
          <Link href="/settings/style" asChild>
            <Item text="settings.style_guide" onPress={() => {}} />
          </Link>
        </ItemsContainer>

        <ItemsContainer title="settings.about">
          <Item text="settings.app_name" value={Env.NAME} />
          <Item text="settings.version" value={Env.VERSION} />
        </ItemsContainer>

        <ItemsContainer title="settings.support_us">
          <Item
            text="settings.share"
            icon={<Share color={iconColor} />}
            onPress={() => {}}
          />
          <Item
            text="settings.rate"
            icon={<Rate color={iconColor} />}
            onPress={() => {}}
          />
          <Item
            text="settings.support"
            icon={<Support color={iconColor} />}
            onPress={() => {}}
          />
        </ItemsContainer>

        <ItemsContainer title="settings.links">
          <Item text="settings.privacy" onPress={() => {}} />
          <Item text="settings.terms" onPress={() => {}} />
          <Item
            text="settings.github"
            icon={<Github color={iconColor} />}
            onPress={() => {}}
          />
          <Item
            text="settings.website"
            icon={<Website color={iconColor} />}
            onPress={() => {}}
          />
        </ItemsContainer>

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
