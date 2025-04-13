import { utiliserTheme } from './ThemeSysteme';

export const couleurs = () => {
  const estDarkMode = utiliserTheme(state => state.estModeSombre);

  return {
    arrierePlan: estDarkMode ? "#1c1c1c" : "#ebefeb",
    couleurSurVert: "#ebefeb", // même couleur dans les deux cas
    couleurTexte: estDarkMode ? "#ebefeb" : "#121212",
    couleurTexteInverse: estDarkMode ? "#121212" : "#ebefeb",

    vertPrincipal: "#41a44f",
    grisPrincipal: estDarkMode ? "#3f3f3f" : "#b2b2b3",
    vertSecondaire: estDarkMode ? "#41cc4f" : "#3e7a2e",

    blanc: "#ebefeb",
    noir: "#121212",
  };
};