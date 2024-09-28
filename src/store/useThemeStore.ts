import { create } from 'zustand';

interface ThemeState {
    navigationVariant: string;
    setNavigationVariant: (navigationVariant: string) => void;
    isScrolled: boolean;
    setIsScrolled: (scrolled: boolean) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
    navigationVariant: 'black',
    setNavigationVariant: (variant) => set({ navigationVariant: variant }),
    isScrolled: false,
    setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
}));

export default useThemeStore;
