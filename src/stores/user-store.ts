import { create } from 'zustand';

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
  yearsOperated: string;
  leasedAmount: string;
  rainWater: string;
  groundWater: string;
  waterIrrigationType: string;
  waterDays: string;
  waterPump: string;
  tillageType: string;
  cropsPerYear: string;
  cropDuration: string;
  cropType: string;
  leasedLandCost: string;
  tillageCost: string;
  fertilizerCost: string;
  pestDiseaseCost: string;
  cropYieldAverage: string;
  income: string;
  soilTests?: SoilTest[];
  soilTestStatus?: SoilTestStatus;
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

interface UserState {
  subscriptionPlan: SubscriptionPlan;
  userName: string;
  email: string;
  lands: Land[];
  selectedLandId: string | null;
  hasSkippedOnboarding: boolean;

  // User actions
  setSubscriptionPlan: (plan: SubscriptionPlan) => void;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  setHasSkippedOnboarding: (value: boolean) => void;

  // Land management
  setLands: (lands: Land[]) => void;
  addLand: (land: Land) => void;
  updateLand: (id: string, updates: Partial<Land>) => void;
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
  hasSkippedOnboarding: false,

  // User actions
  setSubscriptionPlan: (plan) => set({ subscriptionPlan: plan }),
  setUserName: (name) => set({ userName: name }),
  setEmail: (email) => set({ email: email }),
  setHasSkippedOnboarding: (value) => set({ hasSkippedOnboarding: value }),

  // Land management
  setLands: (lands) => set({ lands }),
  addLand: (land) =>
    set((state) => ({
      lands: [...state.lands, land],
    })),
  updateLand: (id, updates) =>
    set((state) => ({
      lands: state.lands.map((land) =>
        land.id === id ? { ...land, ...updates } : land
      ),
    })),
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
