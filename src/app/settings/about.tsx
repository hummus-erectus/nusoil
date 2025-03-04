import { Env } from '@env';
import { Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { BackButton } from '@/components/back-button';
import { colors, Pressable, Text, View } from '@/components/ui';
import { ArrowSquareOut } from '@/components/ui/icons';

// eslint-disable-next-line max-lines-per-function
export default function About() {
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
          About
        </Text>

        <View className="gap-6">
          <View className="flex-row justify-between">
            <Text className="font-poppins-semibold text-neutral-600">
              Version
            </Text>
            <Text className="text-neutral-500">v{Env?.VERSION ?? '0.0.2'}</Text>
          </View>
          <Pressable
            onPress={() =>
              Linking.openURL('https://example.com/privacy-policy')
            }
          >
            <View className="flex-row justify-between">
              <Text className="font-poppins-semibold text-neutral-600">
                Privacy Policy
              </Text>
              <ArrowSquareOut
                width={16}
                height={16}
                color={colors.neutral[500]}
              />
            </View>
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL('https://example.com/terms-of-use')}
          >
            <View className="flex-row justify-between">
              <Text className="font-poppins-semibold text-neutral-600">
                Terms of Use
              </Text>
              <ArrowSquareOut
                width={16}
                height={16}
                color={colors.neutral[500]}
              />
            </View>
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL('https://example.com/nusoil')}
          >
            <View className="flex-row justify-between">
              <Text className="font-poppins-semibold text-neutral-600">
                Official Website
              </Text>
              <ArrowSquareOut
                width={16}
                height={16}
                color={colors.neutral[500]}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
