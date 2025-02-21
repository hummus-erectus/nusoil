import { create } from 'zustand';

export type SubscriptionPlan = 'Seed' | 'Mature' | 'Harvest';

export interface Land {
  id: string;
  farmLocationName: string;
  farmCity: string;
  size: number;
  irrigationType: string;
  ownershipType?: string;
  rainWaterHarvesting?: string;
  groundWaterSource?: string;
  waterIrrigationType?: string;
  waterPumpType?: string;
  nutrientData?: {
    parameters: {
      ph: number;
      ec: number;
      oc: number;
    };
    macroNutrients: {
      n: number;
      p: number;
      k: number;
    };
    microNutrients: {
      zn: number;
      b: number;
      fe: number;
      mn: number;
      mo: number;
      cu: number;
    };
  };
}

interface UserState {
  subscriptionPlan: SubscriptionPlan;
  userName: string;
  email: string;
  lands: Land[];
  selectedLandId: string | null;

  // User actions
  setSubscriptionPlan: (plan: SubscriptionPlan) => void;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;

  // Land management
  setLands: (lands: Land[]) => void;
  addLand: (land: Land) => void;
  updateLand: (id: string, updates: Partial<Land>) => void;
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

  // User actions
  setSubscriptionPlan: (plan) => set({ subscriptionPlan: plan }),
  setUserName: (name) => set({ userName: name }),
  setEmail: (email) => set({ email: email }),

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
  deleteLand: (id) =>
    set((state) => ({
      lands: state.lands.filter((land) => land.id !== id),
    })),
  setSelectedLandId: (id) => set({ selectedLandId: id }),
}));
