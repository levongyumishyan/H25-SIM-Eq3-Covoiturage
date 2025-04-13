import { create } from 'zustand';
import { Appearance } from 'react-native';

const themeSysteme = Appearance.getColorScheme();

export const useTheme = create(set => ({
  estModeSombre: themeSysteme === 'dark',
  basculerMode: () => set(state => ({ estModeSombre: !state.estModeSombre })),
  definirMode: (valeur) => set({ estModeSombre: valeur }),
}));