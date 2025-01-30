import { router } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

import { Button, FormCard, Text } from '@/components/ui';

export default function WelcomeScreen() {
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleUpgrade = () => {
    setShowUpgrade(true);
  };

  const handleAskLater = () => {
    router.replace('/nutrient-management');
  };

  if (showUpgrade) {
    return (
      <View className="flex-1 p-5 items-center justify-center">
        <Text className="text-2xl font-poppins-bold text-primary-600 mb-2 text-center">
          Upgrade Screen
        </Text>
        {/* Add your upgrade screen content here */}
      </View>
    );
  }

  return (
    <View className="flex-1 p-6 items-center justify-center">
      <FormCard>
        <Text className="text-2xl font-poppins-bold text-primary-600 mb-2 text-center">
          Welcome
        </Text>
        <Text className="text-xl font-poppins-medium text-neutral-700 mb-8 text-center">
          Emily Anderson!
        </Text>
        <Text className="text-lg font-poppins text-neutral-600 mb-10 text-center">
          You have enrolled in the Seed Plan!
        </Text>
        <Text className="text-base font-poppins text-neutral-600 mb-6 text-center">
          Would you like to Upgrade to Mature and Harvesting Plan?
        </Text>

        <Button
          variant="default"
          onPress={handleUpgrade}
          className="w-full mb-3"
          label="Upgrade!"
        />
        <Button
          variant="secondary"
          onPress={handleAskLater}
          label="Ask me later"
        />
      </FormCard>
    </View>
  );
}
