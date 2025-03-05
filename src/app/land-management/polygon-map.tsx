import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import PolygonMap, { type PolygonCoordinate } from '@/components/polygon-map';
import { useUserStore } from '@/stores/user-store';

export default function PolygonMapScreen() {
  const { landId } = useLocalSearchParams<{ landId: string }>();
  const { updateLandCoordinates } = useUserStore();

  const handleSave = useCallback(
    (coordinates: PolygonCoordinate[]) => {
      if (landId) {
        // Update the land coordinates - center point is calculated in the store
        updateLandCoordinates(landId, coordinates);

        // Navigate back with the coordinates
        router.back();
      }
    },
    [landId, updateLandCoordinates]
  );

  const handleCancel = useCallback(() => {
    router.back();
  }, []);

  return (
    <View style={styles.container}>
      <PolygonMap onSave={handleSave} onCancel={handleCancel} />
    </View>
  );
}

// Helper function to calculate center point of polygon
// function getCenterPoint(coordinates: PolygonCoordinate[]): PolygonCoordinate {
//   if (coordinates.length === 0) {
//     return { latitude: 0, longitude: 0 };
//   }

//   const sumLat = coordinates.reduce((sum, coord) => sum + coord.latitude, 0);
//   const sumLng = coordinates.reduce((sum, coord) => sum + coord.longitude, 0);

//   return {
//     latitude: sumLat / coordinates.length,
//     longitude: sumLng / coordinates.length,
//   };
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
