/* eslint-disable max-lines-per-function */
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  Marker,
  Polygon,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import CustomMarker from '@/components/custom-marker';
import { colors } from '@/components/ui';
import { Location as LocationIcon } from '@/components/ui/icons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00922;
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
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: initialCoordinates?.[0]?.latitude || 0,
    longitude: initialCoordinates?.[0]?.longitude || 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [polygonPoints, setPolygonPoints] = useState<PolygonCoordinate[]>(
    initialCoordinates || []
  );
  const [previousPoints, setPreviousPoints] = useState<PolygonCoordinate[][]>(
    []
  );
  const [polygonArea, setPolygonArea] = useState<number | null>(null);

  // Calculate area of polygon in hectares
  const calculatePolygonArea = useCallback(
    (coordinates: PolygonCoordinate[]) => {
      if (coordinates.length < 3) return null;

      // Implementation of the Shoelace formula (Gauss's area formula)
      let area = 0;
      for (let i = 0; i < coordinates.length; i++) {
        const j = (i + 1) % coordinates.length;
        area += coordinates[i].longitude * coordinates[j].latitude;
        area -= coordinates[j].longitude * coordinates[i].latitude;
      }
      area = Math.abs(area) / 2;

      // Convert to hectares (rough approximation - this depends on latitude)
      // 1 degree of latitude = ~111km, 1 degree of longitude varies with latitude
      // At the equator, 1 degree of longitude = ~111km
      const avgLat =
        coordinates.reduce((sum, coord) => sum + coord.latitude, 0) /
        coordinates.length;
      const latRadians = avgLat * (Math.PI / 180);
      const lonKmPerDegree = 111.32 * Math.cos(latRadians);
      const latKmPerDegree = 110.574;

      // Convert square degrees to square km and then to hectares (1 sq km = 100 hectares)
      const areaInHectares = area * latKmPerDegree * lonKmPerDegree * 100;

      return areaInHectares;
    },
    []
  );

  // Initialize with user's location only once when component loads
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission denied',
            'Location permission is required for this feature'
          );
          setIsLoading(false);
          return;
        }

        // Only get location if we don't have initial coordinates
        if (!initialCoordinates || initialCoordinates.length === 0) {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          });
          const { latitude, longitude } = location.coords;

          setRegion({
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA / 2,
            longitudeDelta: LONGITUDE_DELTA / 2,
          });
        } else {
          // Calculate the center of the polygon for the region
          const sumLat = initialCoordinates.reduce(
            (sum, coord) => sum + coord.latitude,
            0
          );
          const sumLng = initialCoordinates.reduce(
            (sum, coord) => sum + coord.longitude,
            0
          );
          const centerLat = sumLat / initialCoordinates.length;
          const centerLng = sumLng / initialCoordinates.length;

          setRegion({
            latitude: centerLat,
            longitude: centerLng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });

          // Calculate area for initial coordinates
          const area = calculatePolygonArea(initialCoordinates);
          setPolygonArea(area);
        }
      } catch (error) {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Could not get your current location');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [initialCoordinates, calculatePolygonArea]);

  // Update area when polygon points change
  useEffect(() => {
    if (polygonPoints.length >= 3) {
      const area = calculatePolygonArea(polygonPoints);
      setPolygonArea(area);
    } else {
      setPolygonArea(null);
    }
  }, [polygonPoints, calculatePolygonArea]);

  // Track the current dragging marker index
  const draggingMarkerIndex = useRef<number | null>(null);
  // Track the last time we updated the state during dragging
  const lastDragUpdateTime = useRef<number>(0);
  // Throttle time in ms (update at most every X ms during drag)
  const DRAG_THROTTLE = 50;

  const handleMapPress = (e: {
    nativeEvent: { coordinate: PolygonCoordinate };
  }) => {
    // Don't add points if we're currently dragging
    if (draggingMarkerIndex.current !== null) return;

    const newPoint = e.nativeEvent.coordinate;
    setPreviousPoints((prev) => [...prev, [...polygonPoints]]);
    setPolygonPoints((prev) => [...prev, newPoint]);

    const updatedPoints = [...polygonPoints, newPoint];
    console.log(
      'Polygon Points:',
      updatedPoints.map(
        (point, idx) =>
          `Point ${idx + 1}: ${point.latitude.toFixed(6)}, ${point.longitude.toFixed(6)}`
      )
    );
  };

  const handleMarkerDragStart = (
    index: number,
    _coordinate: PolygonCoordinate
  ) => {
    // Set the current dragging marker index
    draggingMarkerIndex.current = index;
    // Save the current state for undo before starting to drag
    setPreviousPoints((prev) => [...prev, [...polygonPoints]]);
  };

  const handleMarkerDrag = (
    index: number,
    newCoordinate: PolygonCoordinate
  ) => {
    // Only update if this is the marker we started dragging
    if (draggingMarkerIndex.current !== index) return;

    const now = Date.now();
    // Throttle updates to prevent too many state changes
    if (now - lastDragUpdateTime.current > DRAG_THROTTLE) {
      lastDragUpdateTime.current = now;

      // Create a copy of the current points
      const newPoints = [...polygonPoints];
      // Update the specific point
      newPoints[index] = newCoordinate;
      // Update state with the new array
      setPolygonPoints(newPoints);
    }
  };

  const handleMarkerDragEnd = (
    index: number,
    newCoordinate: PolygonCoordinate
  ) => {
    // Only process if this is the marker we started dragging
    if (draggingMarkerIndex.current !== index) return;

    // Reset the dragging marker index
    draggingMarkerIndex.current = null;

    // Create a new copy of the points array
    const newPoints = [...polygonPoints];
    // Update the specific point with the final position
    newPoints[index] = newCoordinate;
    // Update state with the new array
    setPolygonPoints(newPoints);

    console.log(
      'Polygon Points after drag:',
      newPoints.map(
        (point, idx) =>
          `Point ${idx + 1}: ${point.latitude.toFixed(6)}, ${point.longitude.toFixed(6)}`
      )
    );
  };

  const handleRemovePoint = (index: number) => {
    setPreviousPoints((prev) => [...prev, [...polygonPoints]]);
    setPolygonPoints((prev) => prev.filter((_, i) => i !== index));

    const updatedPoints = polygonPoints.filter((_, i) => i !== index);
    console.log(
      'Polygon Points after removal:',
      updatedPoints.map(
        (point, idx) =>
          `Point ${idx + 1}: ${point.latitude.toFixed(6)}, ${point.longitude.toFixed(6)}`
      )
    );
  };

  const handleUndo = () => {
    if (previousPoints.length > 0) {
      const lastPoints = previousPoints[previousPoints.length - 1];
      setPolygonPoints(lastPoints);
      setPreviousPoints((prev) => prev.slice(0, -1));

      console.log(
        'Polygon Points after undo:',
        lastPoints.map(
          (point, idx) =>
            `Point ${idx + 1}: ${point.latitude.toFixed(6)}, ${point.longitude.toFixed(6)}`
        )
      );
    }
  };

  const handleSave = () => {
    if (polygonPoints.length >= 3) {
      console.log(
        'Final Polygon Points:',
        polygonPoints.map(
          (point, idx) =>
            `Point ${idx + 1}: ${point.latitude.toFixed(6)}, ${point.longitude.toFixed(6)}`
        )
      );
      onSave(polygonPoints);
    } else {
      Alert.alert(
        'Invalid Polygon',
        'A polygon must have at least 3 points. Please add more points.'
      );
    }
  };

  const handleClear = () => {
    setPreviousPoints((prev) => [...prev, [...polygonPoints]]);
    setPolygonPoints([]);
    setPolygonArea(null);
    console.log('Polygon cleared');
  };

  // Only get the user's location when they click the location button
  const handleGoToCurrentLocation = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert(
            'Permission denied',
            'Location permission is required for this feature'
          );
          return;
        }
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const { latitude, longitude } = location.coords;

      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA / 2,
        longitudeDelta: LONGITUDE_DELTA / 2,
      });
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not get your current location');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={MAP_TYPES.HYBRID}
        initialRegion={region}
        onPress={handleMapPress}
        onRegionChangeComplete={setRegion}
      >
        {polygonPoints.length > 0 && (
          <Polygon
            coordinates={polygonPoints}
            strokeColor={colors.primary}
            fillColor="rgba(0, 153, 102, 0.3)"
            strokeWidth={2}
          />
        )}

        {polygonPoints.map((point, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={point}
            onPress={() => handleRemovePoint(index)}
            onDragStart={(e) =>
              handleMarkerDragStart(index, e.nativeEvent.coordinate)
            }
            onDrag={(e) => handleMarkerDrag(index, e.nativeEvent.coordinate)}
            onDragEnd={(e) =>
              handleMarkerDragEnd(index, e.nativeEvent.coordinate)
            }
            draggable
            anchor={{ x: 0.53, y: 0.08 }}
          >
            <CustomMarker number={index + 1} color={colors.primary} />
          </Marker>
        ))}
      </MapView>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          Tap on the map to add points. Drag markers to adjust. Tap a marker to
          remove it.
        </Text>
        {polygonArea !== null && (
          <Text style={styles.areaText}>
            Approximate Area: {polygonArea.toFixed(2)} hectares
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleGoToCurrentLocation}
      >
        <LocationIcon color={colors.primary} size={24} />
      </TouchableOpacity>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.button,
              previousPoints.length === 0 && styles.disabledButton,
            ]}
            onPress={handleUndo}
            disabled={previousPoints.length === 0}
          >
            <Text style={styles.buttonText}>Undo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              polygonPoints.length === 0 && styles.disabledButton,
            ]}
            onPress={handleClear}
            disabled={polygonPoints.length === 0}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            styles.saveButton,
            polygonPoints.length < 3 && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={polygonPoints.length < 3}
        >
          <Text style={styles.saveButtonText}>
            Save{' '}
            {polygonPoints.length > 0 ? `(${polygonPoints.length} points)` : ''}
          </Text>
        </TouchableOpacity>
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
    backgroundColor: colors.neutral[100],
  },
  loadingText: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  instructionsContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  instructionsText: {
    textAlign: 'center',
    color: colors.neutral[700],
    fontSize: 14,
  },
  areaText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'column',
    gap: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: colors.neutral[200],
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  disabledButton: {
    backgroundColor: colors.neutral[200],
    opacity: 0.6,
  },
  buttonText: {
    color: colors.neutral[700],
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButtonText: {
    color: colors.neutral[700],
    fontWeight: '600',
    fontSize: 16,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  locationButton: {
    position: 'absolute',
    top: 90,
    right: 20,
    backgroundColor: 'white',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default PolygonMap;
