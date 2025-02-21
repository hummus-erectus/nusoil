import { create } from 'zustand';

export interface LandAccount {
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
  // Add nutrient data
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

interface LandState {
  lands: LandAccount[];
  selectedLandId: string | null;
  setLands: (lands: LandAccount[]) => void;
  addLand: (land: LandAccount) => void;
  updateLand: (id: string, updates: Partial<LandAccount>) => void;
  deleteLand: (id: string) => void;
  setSelectedLandId: (id: string | null) => void;
}

export const useLandStore = create<LandState>((set) => ({
  lands: [],
  selectedLandId: null,

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
