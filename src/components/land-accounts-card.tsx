/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';

import StaticPolygonMap from '@/components/static-polygon-map';
import { Button, colors, Text, TouchableOpacity, View } from '@/components/ui';
import { Warning as WarningIcon } from '@/components/ui/icons';
import { type Land } from '@/stores/user-store';

interface LandAccountsCardProps {
  lands: Land[];
}

const MAX_VISIBLE_LANDS = 3;

const landNeedsSoilTesting = (land: Land) =>
  (!land.soilTests || land.soilTests.length === 0) &&
  (!land.soilTestStatus || land.soilTestStatus === 'report');

const needsSoilTesting = (lands: Land[]) => lands.some(landNeedsSoilTesting);

export const LandAccountsCard = ({ lands }: LandAccountsCardProps) => {
  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between">
        <Text className="font-lora text-xl text-primary">
          Your Land Accounts
        </Text>
        {lands?.length > 0 && (
          <Button
            variant="link"
            label="Manage"
            onPress={() => router.push('/land-management')}
          />
        )}
      </View>

      {!lands?.length ? (
        <View className="flex-row items-center gap-2">
          <WarningIcon color={colors.danger} width={24} height={24} />
          <Text className="font-poppins-semibold text-neutral-600">
            No land accounts registered yet
          </Text>
        </View>
      ) : (
        <View className="gap-4">
          {lands.slice(0, MAX_VISIBLE_LANDS).map((land) => (
            <View
              key={land.id}
              className="overflow-hidden rounded-lg border border-neutral-200"
            >
              <TouchableOpacity
                className="flex-row items-center justify-between p-4"
                onPress={() => {
                  router.push({
                    pathname: '/(app)/(tabs)/nutrient-portfolio',
                    params: { landId: land.id },
                  });
                }}
                activeOpacity={0.7}
              >
                <View className="flex-1">
                  <View>
                    <Text className="font-poppins-semibold text-lg">
                      {land.farmLocationName || 'Unnamed Land'}
                    </Text>
                  </View>
                </View>
                {landNeedsSoilTesting(land) && (
                  <WarningIcon color={colors.danger} width={24} height={24} />
                )}
              </TouchableOpacity>
              {land.coordinates && land.coordinates.length >= 3 && (
                <View style={{ pointerEvents: 'none' }}>
                  <StaticPolygonMap
                    coordinates={land.coordinates}
                    height={150}
                    showArea={true}
                    mapType="STANDARD"
                    interactive={false}
                  />
                </View>
              )}
            </View>
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
      {!lands?.length && (
        <Button
          className="mt-4"
          label="Add Your First Land Account"
          onPress={() => router.push('/land-management/add')}
        />
      )}
      {needsSoilTesting(lands) && (
        <View className="mt-4 flex-row items-center">
          <WarningIcon color={colors.danger} width={20} height={20} />
          <View className="ml-4 flex-1">
            <Text className="font-poppins text-neutral-600">
              Some of your land accounts haven't had soil testing performed yet.{' '}
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
    </View>
  );
};
