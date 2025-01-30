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
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-primary-600 mb-2 text-center font-poppins-bold text-2xl">
          Upgrade Screen
        </Text>
        {/* Add your upgrade screen content here */}
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-6">
      <FormCard>
        <Text className="text-primary-600 mb-2 text-center font-poppins-bold text-2xl">
          Welcome
        </Text>
        <Text className="mb-8 text-center font-poppins-medium text-xl text-neutral-700">
          Emily Anderson!
        </Text>
        <Text className="font-poppins mb-10 text-center text-lg text-neutral-600">
          You have enrolled in the Seed Plan!
        </Text>
        <Text className="font-poppins mb-6 text-center text-base text-neutral-600">
          Would you like to Upgrade to Mature and Harvesting Plan?
        </Text>

        <Button
          variant="default"
          onPress={handleUpgrade}
          className="mb-3 w-full"
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
