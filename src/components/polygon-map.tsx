/* eslint-disable max-lines-per-function */
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {
  MAP_TYPES,
  Polygon,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import { colors } from '@/components/ui';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export type PolygonCoordinate = {
  latitude: number;
  longitude: number;
};

interface PolygonMapProps {
  initialCoordinates?: PolygonCoordinate[];
  onSave: (coordinates: PolygonCoordinate[]) => void;
  onCancel: () => void;
}

const PolygonMap = ({
  initialCoordinates,
  onSave,
  onCancel,
}: PolygonMapProps) => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [polygons, setPolygons] = useState<PolygonCoordinate[][]>([]);
  const [editing, setEditing] = useState<PolygonCoordinate[]>([]);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription | null>(null);

  // Initialize with user's location
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission denied',
            'Location permission is required for this feature'
          );
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        const { latitude, longitude } = location.coords;

        setRegion({
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });

        // If we have initial coordinates, use those
        if (initialCoordinates && initialCoordinates.length > 0) {
          setEditing(initialCoordinates);
        } else {
          // Start with an empty polygon
          setEditing([]);
        }
      } catch (error) {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Could not get your current location');
      } finally {
        setIsLoading(false);
      }
    })();

    // Cleanup function
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [initialCoordinates, locationSubscription]);

  const startTracking = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission denied',
          'Location permission is required for this feature'
        );
        return;
      }

      // Subscribe to location updates
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 5, // minimum distance in meters
          timeInterval: 2000, // minimum time in milliseconds
        },
        (location: Location.LocationObject) => {
          const { latitude, longitude } = location.coords;

          setRegion((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
        }
      );

      setLocationSubscription(subscription);
      setTrackingEnabled(true);
    } catch (error) {
      console.error('Error starting tracking:', error);
      Alert.alert('Error', 'Could not start location tracking');
    }
  }, []);

  const stopTracking = useCallback(() => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
      setTrackingEnabled(false);
    }
  }, [locationSubscription]);

  const addCurrentLocation = useCallback(async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const { latitude, longitude } = location.coords;

      setEditing((prev) => [...prev, { latitude, longitude }]);
    } catch (error) {
      console.error('Error getting current location:', error);
      Alert.alert('Error', 'Could not get your current location');
    }
  }, []);

  const finish = useCallback(() => {
    if (editing.length >= 3) {
      setPolygons((prev) => [...prev, editing]);
      onSave(editing);
    } else {
      Alert.alert(
        'Invalid Polygon',
        'A polygon must have at least 3 points. Please add more points.'
      );
    }
  }, [editing, onSave]);

  const clear = useCallback(() => {
    setEditing([]);
  }, []);

  const onMapPress = useCallback(
    (e: { nativeEvent: { coordinate: PolygonCoordinate } }) => {
      if (!trackingEnabled) {
        const coordinate = e.nativeEvent.coordinate;
        setEditing((prev) => [...prev, coordinate]);
      }
    },
    [trackingEnabled]
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  // Add a check for Google Maps API key
  if (!PROVIDER_GOOGLE) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Google Maps API key is missing</Text>
        <Text style={styles.errorSubText}>
          You need to add a Google Maps API key to use this feature.
        </Text>
        <TouchableOpacity
          style={[styles.bubble, styles.button, styles.activeButton]}
          onPress={onCancel}
        >
          <Text style={styles.activeButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={MAP_TYPES.HYBRID}
        region={region}
        onPress={onMapPress}
        onRegionChangeComplete={setRegion}
      >
        {editing.length > 0 && (
          <Polygon
            coordinates={editing}
            strokeColor={colors.primary}
            fillColor="rgba(0, 153, 102, 0.3)"
            strokeWidth={2}
          />
        )}

        {polygons.map((polygon, index) => (
          <Polygon
            key={`polygon-${index}`}
            coordinates={polygon}
            strokeColor={colors.secondary}
            fillColor="rgba(255, 102, 0, 0.3)"
            strokeWidth={2}
          />
        ))}
      </MapView>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          {!trackingEnabled ? (
            <TouchableOpacity
              onPress={startTracking}
              style={[styles.bubble, styles.button]}
            >
              <Text style={styles.buttonText}>Track Location</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={stopTracking}
              style={[styles.bubble, styles.button, styles.activeButton]}
            >
              <Text style={styles.activeButtonText}>Stop Tracking</Text>
            </TouchableOpacity>
          )}

          {trackingEnabled && (
            <TouchableOpacity
              onPress={addCurrentLocation}
              style={[styles.bubble, styles.button]}
            >
              <Text style={styles.buttonText}>Add Waypoint</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={clear}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={finish}
            style={[styles.bubble, styles.button, styles.activeButton]}
          >
            <Text style={styles.activeButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.neutral[100],
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.danger,
  },
  errorSubText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.neutral[600],
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    top: -height + 100,
    left: 20,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bubble: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    minWidth: 100,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontWeight: '600',
    color: colors.neutral[600],
  },
  activeButtonText: {
    fontWeight: '600',
    color: 'white',
  },
});

export default PolygonMap;
