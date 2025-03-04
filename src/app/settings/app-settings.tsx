/* eslint-disable max-lines-per-function */
import { Link } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { BackButton } from '@/components/back-button';
import { Item } from '@/components/settings/item';
import { Select } from '@/components/ui';
import { Text, View } from '@/components/ui';
import {
  type ColorSchemeType,
  translate,
  useSelectedLanguage,
  useSelectedTheme,
} from '@/lib';
import { type Language } from '@/lib/i18n/resources';

const languages = [
  { label: translate('settings.english'), value: 'en' },
  { label: translate('settings.arabic'), value: 'ar' },
];

const themes = [
  { label: `${translate('settings.theme.dark')} 🌙`, value: 'dark' },
  { label: `${translate('settings.theme.light')} 🌞`, value: 'light' },
  { label: `${translate('settings.theme.system')} ⚙️`, value: 'system' },
];

export default function AppSettings() {
  const { language, setLanguage } = useSelectedLanguage();
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();

  const handleThemeChange = (value: string | number) => {
    setSelectedTheme(value as ColorSchemeType);
  };

  const handleLanguageChange = (value: string | number) => {
    setLanguage(value as Language);
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
          App Settings
        </Text>

        {/* Language and Theme Settings */}
        <View className="gap-2">
          <Text className="font-poppins-semibold text-xl text-primary">
            Appearance
          </Text>

          <View className="rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <View className="p-4">
              <Select
                label={translate('settings.theme.title')}
                value={selectedTheme}
                options={themes}
                onSelect={handleThemeChange}
              />
            </View>
          </View>
        </View>

        <View className="gap-2">
          <Text className="font-poppins-semibold text-xl text-primary">
            Language
          </Text>

          <View className="rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <View className="p-4">
              <Select
                label={translate('settings.language')}
                value={language}
                options={languages}
                onSelect={handleLanguageChange}
              />
            </View>
          </View>
        </View>

        {/* Style Guide Link */}
        <View className="gap-2">
          <Text className="font-poppins-semibold text-xl text-primary">
            Developer
          </Text>

          <View className="rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <Link href="/settings/style" asChild>
              <Item text="settings.style_guide" onPress={() => {}} />
            </Link>
          </View>
        </View>

        {/* Additional Information */}
        <View className="mt-4">
          <Text className="text-center text-sm text-neutral-500">
            Changes to language and theme are applied immediately.
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
