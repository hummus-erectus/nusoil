import * as React from 'react';

import {
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
} from '@/components/ui';

export default function NutrientsManagement() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="flex-1 bg-neutral-100">
        <SafeAreaView className="flex-1 px-4">
          <Text className="text-2xl font-bold">Nutrient Management</Text>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
