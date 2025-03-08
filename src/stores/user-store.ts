/* eslint-disable max-lines-per-function */
import { create } from 'zustand';

import { type PolygonCoordinate } from '@/components/polygon-map';

export type SubscriptionPlan = 'Seed' | 'Mature' | 'Harvest';
export type SoilTestStatus =
  | 'agent'
  | 'collected'
  | 'lab'
  | 'tested'
  | 'report'
  | null;

export interface Land {
  id: string;
  farmLocationName: string;
  farmCity: string;
  irrigationType: string;
  latLong: string;
  ownershipType: string;
  yearsOperated: number | null;
  leasedAmount: number | null;
  rainWater: string;
  groundWater: string;
  waterIrrigationType: string;
  waterDays: number | null;
  waterPump: string;
  tillageType: string;
  cropsPerYear: string;
  cropDuration: number | null;
  cropType: string;
  leasedLandCost: number | null;
  tillageCost: number | null;
  fertilizerCost: number | null;
  pestDiseaseCost: number | null;
  cropYieldAverage: number | null;
  income: number | null;
  soilTests?: SoilTest[];
  soilTestStatus?: SoilTestStatus;
  coordinates?: PolygonCoordinate[];
}

export interface SoilTest {
  id: string;
  testMonth: string;
  testYear: string;
  frequency: string;
  testingType: 'value' | 'range';
  parameters: {
    ph: string;
    ec: string;
    oc: string;
  };
  macroNutrients: {
    n: string;
    p: string;
    k: string;
  };
  microNutrients: {
    zn: string;
    b: string;
    fe: string;
    mn: string;
    mo: string;
    cu: string;
    cl: string;
    ni: string;
  };
  createdAt: string;
}

export interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  pushEnabled: boolean;
  emailEnabled: boolean;
}

interface UserState {
  subscriptionPlan: SubscriptionPlan;
  userName: string;
  email: string;
  lands: Land[];
  selectedLandId: string | null;
  hasCompletedOnboarding: boolean;
  notificationSettings: NotificationSetting[];
  pushNotificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;

  // User actions
  setSubscriptionPlan: (plan: SubscriptionPlan) => void;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  setHasCompletedOnboarding: (value: boolean) => void;
  resetHasCompletedOnboarding: () => void;

  // Notification settings
  setPushNotificationsEnabled: (enabled: boolean) => void;
  setEmailNotificationsEnabled: (enabled: boolean) => void;
  updateNotificationSetting: (
    id: string,
    updates: Partial<NotificationSetting>
  ) => void;
  setNotificationSettings: (settings: NotificationSetting[]) => void;

  // Land management
  setLands: (lands: Land[]) => void;
  addLand: (land: Land) => void;
  updateLand: (id: string, updates: Partial<Land>) => void;
  updateLandCoordinates: (
    landId: string,
    coordinates: PolygonCoordinate[]
  ) => void;
  addSoilTest: (landId: string, soilTest: SoilTest) => void;
  deleteLand: (id: string) => void;
  setSelectedLandId: (id: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  // User data
  subscriptionPlan: 'Seed',
  userName: 'Emily Anderson',
  email: 'emily@anderson.com',
  lands: [],
  selectedLandId: null,
  hasCompletedOnboarding: false,
  pushNotificationsEnabled: true,
  emailNotificationsEnabled: true,
  notificationSettings: [
    {
      id: 'applications',
      title: 'Application Updates',
      description:
        'Updates on soil tests, initiatives, financial agreements and more',
      pushEnabled: true,
      emailEnabled: true,
    },
    {
      id: 'features',
      title: 'New Features',
      description: 'Learn about new app features and improvements',
      pushEnabled: true,
      emailEnabled: false,
    },
    {
      id: 'deals',
      title: 'Special Deals',
      description: 'Exclusive offers and promotions for NuSoil users',
      pushEnabled: true,
      emailEnabled: true,
    },
    {
      id: 'reminders',
      title: 'Reminders',
      description: 'Reminders for upcoming tasks and deadlines',
      pushEnabled: true,
      emailEnabled: false,
    },
  ],

  // User actions
  setSubscriptionPlan: (plan) => set({ subscriptionPlan: plan }),
  setUserName: (name) => set({ userName: name }),
  setEmail: (email) => set({ email: email }),
  setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
  resetHasCompletedOnboarding: () => set({ hasCompletedOnboarding: false }),

  // Notification settings
  setPushNotificationsEnabled: (enabled) =>
    set({ pushNotificationsEnabled: enabled }),
  setEmailNotificationsEnabled: (enabled) =>
    set({ emailNotificationsEnabled: enabled }),
  updateNotificationSetting: (id, updates) =>
    set((state) => ({
      notificationSettings: state.notificationSettings.map((setting) =>
        setting.id === id ? { ...setting, ...updates } : setting
      ),
    })),
  setNotificationSettings: (settings) =>
    set({ notificationSettings: settings }),

  // Land management
  setLands: (lands) => set({ lands }),
  addLand: (land) => {
    console.log('Land data:', land);
    set((state) => ({
      lands: [...state.lands, land],
    }));
  },
  updateLand: (id, updates) =>
    set((state) => ({
      lands: state.lands.map((land) =>
        land.id === id ? { ...land, ...updates } : land
      ),
    })),
  updateLandCoordinates: (landId, coordinates) =>
    set((state) => {
      const lands = [...state.lands];
      const landIndex = lands.findIndex((land) => land.id === landId);

      if (landIndex !== -1) {
        // Update coordinates
        lands[landIndex] = {
          ...lands[landIndex],
          coordinates,
        };

        // Update latLong with center point
        if (coordinates.length > 0) {
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

          lands[landIndex].latLong =
            `${centerLat.toFixed(6)},${centerLng.toFixed(6)}`;
        }
      }

      return { lands };
    }),
  addSoilTest: (landId, soilTest) =>
    set((state) => ({
      lands: state.lands.map((land) =>
        land.id === landId
          ? {
              ...land,
              soilTests: [...(land.soilTests || []), soilTest],
            }
          : land
      ),
    })),
  deleteLand: (id) =>
    set((state) => ({
      lands: state.lands.filter((land) => land.id !== id),
    })),
  setSelectedLandId: (id) => set({ selectedLandId: id }),
}));
