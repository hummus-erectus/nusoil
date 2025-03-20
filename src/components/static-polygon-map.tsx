/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import MapView, {
  MAP_TYPES,
  Polygon,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import { type PolygonCoordinate } from '@/components/polygon-map';
import { colors } from '@/components/ui';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface StaticPolygonMapProps {
  coordinates: PolygonCoordinate[];
  height?: number | string;
  showArea?: boolean;
  fillColor?: string;
  strokeColor?: string;
  mapType?: keyof typeof MAP_TYPES;
}

const StaticPolygonMap: React.FC<StaticPolygonMapProps> = ({
  coordinates,
  height = 200,
  showArea = false,
  fillColor = 'rgba(0, 153, 102, 0.3)',
  strokeColor = colors.primary,
  mapType = 'HYBRID',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [polygonArea, setPolygonArea] = useState<number | null>(null);

  // Calculate area of polygon in hectares
  const calculatePolygonArea = (coords: PolygonCoordinate[]) => {
    if (coords.length < 3) return null;

    // Implementation of the Shoelace formula (Gauss's area formula)
    let area = 0;
    for (let i = 0; i < coords.length; i++) {
      const j = (i + 1) % coords.length;
      area += coords[i].longitude * coords[j].latitude;
      area -= coords[j].longitude * coords[i].latitude;
    }
    area = Math.abs(area) / 2;

    // Convert to hectares (rough approximation - depends on latitude)
    const avgLat =
      coords.reduce((sum, coord) => sum + coord.latitude, 0) / coords.length;
    const latRadians = avgLat * (Math.PI / 180);
    const lonKmPerDegree = 111.32 * Math.cos(latRadians);
    const latKmPerDegree = 110.574;

    // Convert square degrees to square km and then to hectares (1 sq km = 100 hectares)
    const areaInHectares = area * latKmPerDegree * lonKmPerDegree * 100;

    return areaInHectares;
  };

  // Initialize map with polygon center
  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      // Calculate the center of the polygon for the region
      const sumLat = coordinates.reduce(
        (sum, coord) => sum + coord.latitude,
        0
      );
      const sumLng = coordinates.reduce(
        (sum, coord) => sum + coord.longitude,
        0
      );
      const centerLat = sumLat / coordinates.length;
      const centerLng = sumLng / coordinates.length;

      setRegion({
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });

      // Calculate area if showArea is true
      if (showArea) {
        const area = calculatePolygonArea(coordinates);
        setPolygonArea(area);
      }
    }

    // Add a small delay to allow the map to render properly
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [coordinates, showArea]);

  // Create container style with dynamic height
  const containerStyle: ViewStyle = {
    ...styles.container,
    height: typeof height === 'number' ? height : parseInt(height, 10),
  };

  if (coordinates.length < 3) {
    return (
      <View style={containerStyle}>
        <Text style={styles.noDataText}>No polygon data available</Text>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType={MAP_TYPES[mapType]}
          initialRegion={region}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={false}
          showsScale={false}
          showsBuildings={false}
          showsIndoors={false}
          showsTraffic={false}
          showsPointsOfInterest={false}
          toolbarEnabled={false}
          zoomEnabled={true}
          zoomTapEnabled={true}
          rotateEnabled={false}
          scrollEnabled={true}
          pitchEnabled={false}
        >
          <Polygon
            coordinates={coordinates}
            strokeColor={strokeColor}
            fillColor={fillColor}
            strokeWidth={2}
          />
        </MapView>
      )}

      {showArea && polygonArea !== null && !isLoading && (
        <View style={styles.areaContainer}>
          <Text style={styles.areaText}>
            Area: {polygonArea.toFixed(2)} hectares
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.neutral[600],
  },
  noDataText: {
    textAlign: 'center',
    color: colors.neutral[500],
    fontSize: 14,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  areaContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 6,
    borderRadius: 4,
  },
  areaText: {
    fontSize: 12,
    color: colors.neutral[700],
    fontWeight: '500',
  },
});

export default StaticPolygonMap;
