export type PlanType = 'seed' | 'mature' | 'harvest';
export type InputType = 'smart' | 'log' | null;

export interface SelectOption {
  label: string;
  value: string | number;
}

export const accountOptions: SelectOption[] = [
  { label: 'Nusa - 1', value: 'Nusa - 1' },
  { label: 'Nusa - 2', value: 'Nusa - 2' },
  { label: 'Nusa - 3', value: 'Nusa - 3' },
];

export const seedVarietyOptions: SelectOption[] = [
  { label: 'Hybrid Corn', value: 'hybrid_corn' },
  { label: 'Organic Wheat', value: 'organic_wheat' },
  { label: 'Non-GMO Soybeans', value: 'non_gmo_soybeans' },
  { label: 'Heirloom Tomato', value: 'heirloom_tomato' },
  { label: 'Drought-Resistant Sorghum', value: 'drought_sorghum' },
];

export const fertilizerOptions: SelectOption[] = [
  { label: 'Organic Compost', value: 'organic_compost' },
  { label: 'Nitrogen-Rich Fertilizer', value: 'nitrogen_fertilizer' },
  { label: 'Phosphorus Blend', value: 'phosphorus_blend' },
  { label: 'Slow-Release Granular', value: 'slow_release_granular' },
  { label: 'Liquid Seaweed Extract', value: 'seaweed_extract' },
];

export const currencyOptions: SelectOption[] = [
  { label: 'INR (₹)', value: 'inr' },
  { label: 'USD ($)', value: 'usd' },
  { label: 'EUR (€)', value: 'eur' },
  { label: 'GBP (£)', value: 'gbp' },
];
