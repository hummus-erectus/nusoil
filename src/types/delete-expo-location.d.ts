// declare module 'expo-location' {
//   export type LocationObject = {
//     coords: {
//       latitude: number;
//       longitude: number;
//       altitude: number | null;
//       accuracy: number | null;
//       altitudeAccuracy: number | null;
//       heading: number | null;
//       speed: number | null;
//     };
//     timestamp: number;
//   };

//   export type LocationSubscription = {
//     remove: () => void;
//   };

//   export enum Accuracy {
//     Lowest = 1,
//     Low = 2,
//     Balanced = 3,
//     High = 4,
//     Highest = 5,
//     BestForNavigation = 6,
//   }

//   export function requestForegroundPermissionsAsync(): Promise<{
//     status: 'granted' | 'denied';
//   }>;

//   export function getCurrentPositionAsync(options?: {
//     accuracy?: Accuracy;
//   }): Promise<LocationObject>;

//   export function watchPositionAsync(
//     options: {
//       accuracy?: Accuracy;
//       distanceInterval?: number;
//       timeInterval?: number;
//     },
//     callback: (location: LocationObject) => void
//   ): Promise<LocationSubscription>;
// }
