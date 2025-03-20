# Polygon Map Components

This document explains the polygon map components available in the NuSoil app.

## Components Overview

### 1. PolygonMap

The original interactive polygon map component that allows users to create and edit land boundaries.

- **Location**: `src/components/polygon-map.tsx`
- **Features**:
  - Create polygons by adding waypoints
  - Edit existing polygons
  - Calculate area in hectares
  - GPS location tracking
  - Undo/redo functionality

### 2. StaticPolygonMap

A lightweight, read-only version of the polygon map for displaying land boundaries without editing capabilities.

- **Location**: `src/components/static-polygon-map.tsx`
- **Features**:
  - Display polygon on a map
  - Customizable appearance (colors, height)
  - Optional area display
  - Loading state with animation
  - Performance optimized

## Usage Examples

### Using StaticPolygonMap

```tsx
import StaticPolygonMap from '@/components/static-polygon-map';
import { type PolygonCoordinate } from '@/components/polygon-map';

// Example coordinates
const coordinates: PolygonCoordinate[] = [
  { latitude: 37.78825, longitude: -122.4324 },
  { latitude: 37.78925, longitude: -122.4344 },
  { latitude: 37.78725, longitude: -122.4354 },
];

// Basic usage
<StaticPolygonMap coordinates={coordinates} />

// With custom options
<StaticPolygonMap
  coordinates={coordinates}
  height={300}
  showArea={true}
  fillColor="rgba(255, 0, 0, 0.2)"
  strokeColor="#FF0000"
  mapType="STANDARD"
/>
```

## Performance Considerations

1. **Map Loading**: The StaticPolygonMap includes a loading state to provide visual feedback while the map is loading.

2. **Minimal Dependencies**: The StaticPolygonMap only includes essential features needed for displaying the polygon, making it more lightweight than the full PolygonMap component.

3. **Caching**: Since users are expected to have only 3-5 lands, the map data should be cached in the user store and doesn't need to be fetched repeatedly.

## Implementation Details

- The StaticPolygonMap uses the same PolygonCoordinate type as the original PolygonMap for consistency.
- The area calculation uses the same Shoelace formula as the original component.
- The map is centered on the polygon automatically by calculating the average of all coordinates.
- The component handles edge cases like having fewer than 3 points (which is not a valid polygon).
