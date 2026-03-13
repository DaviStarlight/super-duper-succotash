import { create } from 'zustand';

export type Screen = 'home' | 'game' | 'tutorial' | 'dashboard';

interface AppStore {
  screen: Screen;
  navigate: (screen: Screen) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  screen: 'home',
  navigate: (screen) => set({ screen }),
}));
