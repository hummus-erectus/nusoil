import { create } from 'zustand';

export type SubscriptionPlan = 'Seed' | 'Mature' | 'Harvest';

interface UserState {
  subscriptionPlan: SubscriptionPlan;
  userName: string;
  email: string;
  // Add other user metadata fields as needed
  setSubscriptionPlan: (plan: SubscriptionPlan) => void;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  subscriptionPlan: 'Seed',
  userName: 'Emily Anderson', // Default name for testing
  email: 'emily@anderson.com', // Default email for testing

  setSubscriptionPlan: (plan) => set({ subscriptionPlan: plan }),
  setUserName: (name) => set({ userName: name }),
  setEmail: (email) => set({ email: email }),
}));
