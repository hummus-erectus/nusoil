/* eslint-disable max-lines-per-function */
import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, BackHandler, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, FormCard, Text } from '@/components/ui';
import { useLandStore } from '@/stores/land-store';
import { useUserStore } from '@/stores/user-store';

const WelcomeScreen = () => {
  const { userName, subscriptionPlan, userLands } = useUserStore();
  const navigation = useNavigation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Only show exit confirmation if we're at the root level
        // (i.e., in the main tabs with no other screens in the stack)
        if (!navigation.canGoBack()) {
          Alert.alert(
            'Exit App',
            'Are you sure you want to exit?',
            [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              { text: 'Yes', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
          );
          return true;
        }
        // Let the default back behavior happen for normal navigation
        return false;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleUpgrade = () => {
    router.push('/upgrade');
  };

  // const handleAskLater = () => {
  //   router.replace('/nutrient-management');
  // };

  const MAX_VISIBLE_LANDS = 3;

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 gap-6 p-6">
        <View>
          <View className="flex-row">
            <Text className="text-center font-poppins-bold text-lg">
              {getGreeting()},{' '}
            </Text>
            <Text className="text-center font-poppins-bold text-lg">
              {userName}!
            </Text>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row">
              <Text className="font-poppins-regular text-neutral-600">
                You are enrolled in the{' '}
              </Text>
              <Text className="font-poppins-semibold text-neutral-600">
                {subscriptionPlan} Plan
              </Text>
            </View>
            <Button
              variant="link"
              fullWidth={false}
              label="Upgrade"
              onPress={handleUpgrade}
            />
          </View>
        </View>

        <FormCard>
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-lora text-xl text-primary">
                Your Land Accounts
              </Text>
              <Button
                variant="link"
                label="Manage"
                onPress={() => router.push('/(modals)/land-management')}
              />
            </View>

            {userLands.length === 0 ? (
              <Text className="font-poppins text-neutral-600">
                No land accounts registered yet
              </Text>
            ) : (
              <View className="gap-4">
                {userLands.slice(0, MAX_VISIBLE_LANDS).map((land) => (
                  <TouchableOpacity
                    key={land.id}
                    className="rounded-lg border border-neutral-200 p-4"
                    onPress={() => {
                      useLandStore.getState().setSelectedLandId(land.id);
                      router.push('/(app)/(tabs)/nutrient-portfolio');
                    }}
                  >
                    <Text className="font-poppins-semibold text-lg">
                      {land.farmLocationName || 'Unnamed Land'}
                    </Text>
                    <Text className="font-poppins text-neutral-600">
                      {land.farmCity} • {land.size} acres
                    </Text>
                    <Text className="font-poppins text-neutral-600">
                      Irrigation: {land.irrigationType || 'Not specified'}
                    </Text>
                  </TouchableOpacity>
                ))}
                {userLands.length > MAX_VISIBLE_LANDS && (
                  <Button
                    variant="link"
                    label="See More"
                    onPress={() => router.push('/(modals)/land-management')}
                  />
                )}
              </View>
            )}
          </View>
        </FormCard>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default WelcomeScreen;
