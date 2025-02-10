import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button, Text } from '@/components/ui';

interface UpgradeOverlayProps {
  requiredPlan: 'Mature' | 'Harvest';
  currentPlan: string;
}

export const UpgradeOverlay: React.FC<UpgradeOverlayProps> = ({
  requiredPlan,
  currentPlan,
}) => {
  return (
    <View className="absolute inset-0 z-[1000] items-center justify-center">
      <BlurView
        intensity={15}
        className="absolute inset-0"
        experimentalBlurMethod="dimezisBlurView"
        key={`blur-${Math.random().toString(36).substr(2, 9)}`}
      />
      <View className="w-4/5 items-center rounded-2xl bg-white/90 p-6 shadow-lg">
        <Text className="mb-4 text-center font-lora text-2xl text-primary">
          Upgrade Required
        </Text>
        <Text className="mb-6 text-center font-poppins-regular text-base text-neutral-600">
          {`This feature is only available for ${
            requiredPlan === 'Harvest' ? 'Harvest' : 'Mature and Harvest'
          } plan members. You are currently on the ${currentPlan} plan.`}
        </Text>
        <Link href="/upgrade" asChild replace>
          <Button variant="default" label="Upgrade Now" />
        </Link>
      </View>
    </View>
  );
};
