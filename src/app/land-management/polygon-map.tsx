import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import PolygonMap, { type PolygonCoordinate } from '@/components/polygon-map';
import { useTemporaryStore } from '@/stores/temporary-store';
import { useUserStore } from '@/stores/user-store';

export default function PolygonMapScreen() {
  const { landId } = useLocalSearchParams<{ landId: string }>();
  const { updateLandCoordinates, lands } = useUserStore();
  const temporaryStore = useTemporaryStore();

  // Find the land with the given ID to get existing coordinates
  const currentLand = lands.find((land) => land.id === landId);
  const existingCoordinates =
    temporaryStore.polygonCoordinates.length > 0
      ? temporaryStore.polygonCoordinates
      : currentLand?.coordinates || [];

  const handleSave = useCallback(
    (coordinates: PolygonCoordinate[]) => {
      if (currentLand) {
        // Update the land coordinates - center point is calculated in the store
        updateLandCoordinates(landId, coordinates);

        console.log('Saving polygon coordinates:', coordinates);
      } else {
        temporaryStore.setPolygonCoordinates(coordinates);
        console.log(
          'Temporary store after saving:',
          temporaryStore.polygonCoordinates
        );
      }
      // Navigate back with the coordinates
      router.back();
    },
    [landId, updateLandCoordinates, temporaryStore, currentLand]
  );

  const handleCancel = useCallback(() => {
    router.back();
  }, []);

  return (
    <View style={styles.container}>
      <PolygonMap
        initialCoordinates={existingCoordinates}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
