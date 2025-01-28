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
  farmLocationName: string;
  farmCity: string;
  size: number;
  irrigationType?: string;
  latLong?: string;
  ownershipType?: string;
  yearsOperated?: string;
  leasedAmount?: string;
  rainWater?: string;
  groundWater?: string;
  waterIrrigationType?: string;
  waterDays?: string;
  waterPump?: string;
  tillageType?: string;
  cropsPerYear?: string;
  cropDuration?: string;
  cropType?: string;
  leasedLandCost?: string;
  tillageCost?: string;
  fertilizerCost?: string;
  pestDiseaseCost?: string;
  cropYieldAverage?: string;
  income?: string;
}

interface NutrientData {
  currentCrops: string;
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
    farmLocationName: '',
    farmCity: '',
    size: 0,
    irrigationType: '',
    latLong: '',
    ownershipType: '',
    yearsOperated: '',
    leasedAmount: '',
    rainWater: '',
    groundWater: '',
    waterIrrigationType: '',
    waterDays: '',
    waterPump: '',
    tillageType: '',
    cropsPerYear: '',
    cropDuration: '',
    cropType: '',
    leasedLandCost: '',
    tillageCost: '',
    fertilizerCost: '',
    pestDiseaseCost: '',
    cropYieldAverage: '',
    income: '',
  },
  nutrientData: {
    currentCrops: '',
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
