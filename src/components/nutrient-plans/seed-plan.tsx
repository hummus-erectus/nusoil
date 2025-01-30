import * as React from 'react';

import { Radio, Select, Text, View } from '@/components/ui';

const accountOptions = [
  { label: 'Nusa - 1', value: 'Nusa - 1' },
  { label: 'Nusa -2', value: 'Nusa -2' },
  { label: 'Nusa -3', value: 'Nusa -3' },
];

export function SeedPlan() {
  const [seedInputType, setSeedInputType] = React.useState<
    'smart' | 'log' | null
  >(null);

  return (
    <View className="gap-6">
      <Text className="text-center font-lora text-3xl text-primary">
        Seed Plan
      </Text>
      <Select options={accountOptions} label="Select the account" />
      <View>
        <Text className="font-lora text-xl text-secondary">Seed</Text>
        <View className="gap-2">
          <Text>Select an option</Text>
          <View className="mt-2 gap-4">
            <View className="flex-1">
              <Radio
                checked={seedInputType === 'smart'}
                onChange={() => setSeedInputType('smart')}
                label="SMART Recommendations"
                accessibilityLabel="SMART Recommendations"
              />
            </View>
            <View className="flex-1">
              <Radio
                checked={seedInputType === 'log'}
                onChange={() => setSeedInputType('log')}
                label="Farm Log Book"
                accessibilityLabel="Farm Log Book"
              />
            </View>
          </View>
        </View>
        <Text>
          {seedInputType === 'smart'
            ? 'SMART Recommendations'
            : seedInputType === 'log'
              ? 'Farm Log Book'
              : ''}
        </Text>
      </View>
    </View>
  );
}
