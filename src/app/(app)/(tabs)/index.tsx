/* eslint-disable max-lines-per-function */
import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, BackHandler, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button, colors, FormCard, Text } from '@/components/ui';
import { Warning as WarningIcon } from '@/components/ui/icons';
import { type Land, useUserStore } from '@/stores/user-store';

const WelcomeScreen = () => {
  const { userName, subscriptionPlan, lands, setSelectedLandId } =
    useUserStore();
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

  const MAX_VISIBLE_LANDS = 3;

  const needsSoilTesting = lands.some(
    (land) =>
      (!land.soilTests || land.soilTests.length === 0) &&
      (!land.soilTestStatus || land.soilTestStatus === 'report')
  );

  const landNeedsSoilTesting = (land: Land) =>
    (!land.soilTests || land.soilTests.length === 0) &&
    (!land.soilTestStatus || land.soilTestStatus === 'report');

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
                onPress={() => router.push('/land-management')}
              />
            </View>

            {!lands?.length ? (
              <Text className="font-poppins text-neutral-600">
                No land accounts registered yet
              </Text>
            ) : (
              <View className="gap-4">
                {lands.slice(0, MAX_VISIBLE_LANDS).map((land) => (
                  <TouchableOpacity
                    key={land.id}
                    className="flex-row items-center justify-between rounded-lg border border-neutral-200 p-4"
                    onPress={() => {
                      setSelectedLandId(land.id);
                      router.push('/(app)/(tabs)/nutrient-portfolio');
                    }}
                  >
                    <View>
                      <View>
                        <Text className="font-poppins-semibold text-lg">
                          {land.farmLocationName || 'Unnamed Land'}
                        </Text>
                      </View>
                      <Text className="font-poppins text-neutral-600">
                        {land.farmCity}
                      </Text>
                    </View>
                    {landNeedsSoilTesting(land) && (
                      <WarningIcon
                        color={colors.danger}
                        width={24}
                        height={24}
                      />
                    )}
                  </TouchableOpacity>
                ))}
                {lands.length > MAX_VISIBLE_LANDS && (
                  <Button
                    variant="link"
                    label="See More"
                    onPress={() => router.push('/land-management')}
                  />
                )}
              </View>
            )}
          </View>
          {needsSoilTesting && (
            <View className="mt-4 flex-row items-center">
              <WarningIcon color="#FF0000" width={20} height={20} />
              <View className="ml-4 flex-1">
                <Text className="font-poppins text-neutral-600">
                  Some of your land accounts haven't had soil testing performed
                  yet.{' '}
                  <Text
                    className="font-poppins-semibold text-primary"
                    onPress={() => router.push('/soil-test')}
                  >
                    Order a soil test now
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </FormCard>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default WelcomeScreen;
