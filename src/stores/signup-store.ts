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
  nutrientTestingDone?: boolean;
  testingType?: 'soil' | 'water' | 'plant';
  nutrientTestingMonth?: string;
  nutrientTestingYear?: string;
  soilTestingDone?: boolean;
  soilTestingMonth?: string;
  soilTestingYear?: string;
  soilTestingFrequency?: string;
  // Parameters
  phValue?: string;
  phRange?: string;
  ecValue?: string;
  ecRange?: string;
  ocValue?: string;
  ocRange?: string;
  // Macro Nutrients
  nValue?: string;
  nRange?: string;
  pValue?: string;
  pRange?: string;
  kValue?: string;
  kRange?: string;
  // Micro Nutrients
  znValue?: string;
  znRange?: string;
  bValue?: string;
  bRange?: string;
  feValue?: string;
  feRange?: string;
  mnValue?: string;
  mnRange?: string;
  moValue?: string;
  moRange?: string;
  cuValue?: string;
  cuRange?: string;
  clValue?: string;
  clRange?: string;
  niValue?: string;
  niRange?: string;
  newField1?: string;
  newField2?: string;
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
    nutrientTestingDone: undefined,
    testingType: undefined,
    nutrientTestingMonth: undefined,
    nutrientTestingYear: undefined,
    soilTestingDone: undefined,
    soilTestingMonth: undefined,
    soilTestingYear: undefined,
    soilTestingFrequency: undefined,
    phValue: undefined,
    phRange: undefined,
    ecValue: undefined,
    ecRange: undefined,
    ocValue: undefined,
    ocRange: undefined,
    nValue: undefined,
    nRange: undefined,
    pValue: undefined,
    pRange: undefined,
    kValue: undefined,
    kRange: undefined,
    znValue: undefined,
    znRange: undefined,
    bValue: undefined,
    bRange: undefined,
    feValue: undefined,
    feRange: undefined,
    mnValue: undefined,
    mnRange: undefined,
    moValue: undefined,
    moRange: undefined,
    cuValue: undefined,
    cuRange: undefined,
    clValue: undefined,
    clRange: undefined,
    niValue: undefined,
    niRange: undefined,
    newField1: '',
    newField2: '',
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
