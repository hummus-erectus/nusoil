import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Text, View } from '@/components/ui';

export default function Account() {
  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 gap-6 p-6">
        <Text className="mt-10 text-center font-lora text-3xl text-primary">
          Account
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
