/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
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
  const mapRef = useRef<MapView>(null);

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

  // Initialize map with polygon center and appropriate zoom level
  useEffect(() => {
    // Reset state when coordinates change
    setIsLoading(true);

    if (coordinates && coordinates.length > 0) {
      // Find the min and max coordinates to calculate the bounds
      let minLat = coordinates[0].latitude;
      let maxLat = coordinates[0].latitude;
      let minLng = coordinates[0].longitude;
      let maxLng = coordinates[0].longitude;

      // Find the bounds of the polygon
      coordinates.forEach((coord) => {
        minLat = Math.min(minLat, coord.latitude);
        maxLat = Math.max(maxLat, coord.latitude);
        minLng = Math.min(minLng, coord.longitude);
        maxLng = Math.max(maxLng, coord.longitude);
      });

      // Calculate the center of the polygon
      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLng + maxLng) / 2;

      // Calculate appropriate deltas with some padding (20%)
      const latDelta = (maxLat - minLat) * 1.2;
      const lngDelta = (maxLng - minLng) * 1.2;

      // Ensure minimum zoom level for very small polygons
      const finalLatDelta = Math.max(latDelta, LATITUDE_DELTA);
      const finalLngDelta = Math.max(lngDelta, LONGITUDE_DELTA);

      const newRegion = {
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: finalLatDelta,
        longitudeDelta: finalLngDelta,
      };

      setRegion(newRegion);

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
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      )}

      <View style={[styles.mapContainer, { opacity: isLoading ? 0 : 1 }]}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType={MAP_TYPES[mapType]}
          region={region}
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
      </View>

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
  mapContainer: {
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
