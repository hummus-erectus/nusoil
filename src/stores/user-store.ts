import { create } from 'zustand';

export type SubscriptionPlan = 'Seed' | 'Mature' | 'Harvest';

interface UserState {
  subscriptionPlan: SubscriptionPlan;
  userName: string;
  email: string;
  userLands: {
    id: string;
    farmLocationName: string;
    farmCity: string;
    size: number;
    irrigationType: string;
  }[];
  setSubscriptionPlan: (plan: SubscriptionPlan) => void;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  setUserLands: (lands: UserState['userLands']) => void;
  // Add other user metadata fields as needed
}

export const useUserStore = create<UserState>((set) => ({
  subscriptionPlan: 'Seed',
  userName: 'Emily Anderson', // Default name for testing
  email: 'emily@anderson.com', // Default email for testing
  userLands: [],

  setSubscriptionPlan: (plan) => set({ subscriptionPlan: plan }),
  setUserName: (name) => set({ userName: name }),
  setEmail: (email) => set({ email: email }),
  setUserLands: (lands) => set({ userLands: lands }),
}));
