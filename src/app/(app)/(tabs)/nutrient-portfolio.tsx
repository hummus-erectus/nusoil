import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { FocusAwareStatusBar, Text, View } from '@/components/ui';

export default function NutrientPortfolio() {
  return (
    <>
      <FocusAwareStatusBar />
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 p-6">
          <View className="mb-6">
            <Text className="text-neutral-500">Nusa - 1</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
