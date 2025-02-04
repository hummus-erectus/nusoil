import * as React from 'react';

import { Buttons } from '@/components/buttons';
import { Colors } from '@/components/colors';
import { Inputs } from '@/components/inputs';
import { Typography } from '@/components/typography';
import { SafeAreaView, ScrollView } from '@/components/ui';

export default function StyleGuide() {
  return (
    <>
      <ScrollView className="flex-1">
        <SafeAreaView className="flex-1 px-4">
          <Typography />
          <Colors />
          <Buttons />
          <Inputs />
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
