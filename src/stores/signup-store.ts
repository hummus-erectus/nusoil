import { create } from 'zustand';

interface FarmerData {
  name: string;
  nationalId: string;
  streetAddress: string;
  state: string;
  country: string;
  zipCode: string;
}

interface FarmData {
  farmName: string;
  location: string;
  size: number;
}

interface NutrientData {
  currentCrops: string[];
  soilType: string;
}

const initialState = {
  farmerData: {
    name: '',
    nationalId: '',
    streetAddress: '',
    state: '',
    country: '',
    zipCode: '',
  },
  farmData: {
    farmName: '',
    location: '',
    size: 0,
  },
  nutrientData: {
    currentCrops: [],
    soilType: '',
  },
};

interface SignupStore {
  farmerData: FarmerData;
  farmData: FarmData;
  nutrientData: NutrientData;
  setFarmerData: (data: Partial<FarmerData>) => void;
  setFarmData: (data: Partial<FarmData>) => void;
  setNutrientData: (data: Partial<NutrientData>) => void;
  resetSignupForm: () => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  ...initialState,
  setFarmerData: (data) =>
    set((state) => ({
      farmerData: { ...state.farmerData, ...data },
    })),
  setFarmData: (data) =>
    set((state) => ({
      farmData: { ...state.farmData, ...data },
    })),
  setNutrientData: (data) =>
    set((state) => ({
      nutrientData: { ...state.nutrientData, ...data },
    })),
  resetSignupForm: () => set(initialState),
}));
