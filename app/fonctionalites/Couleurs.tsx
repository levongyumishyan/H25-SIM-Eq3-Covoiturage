import { useTheme } from './ThemeSysteme';

export const useCouleurs = () => {
  if (typeof useTheme !== 'function') {
    console.error("utiliserTheme n'est pas une fonction (peut-être une boucle d'import)");
    return {};
  }

  const estDarkMode = useTheme(state => state.estModeSombre);
  console.log("estDarkMode =", estDarkMode);  // Vérifie si cela affiche bien la valeur du thème

  return {
    arrierePlan: estDarkMode ? "#1c1c1c" : "#ebefeb",
    couleurSurVert: "#ebefeb",
    couleurTexte: estDarkMode ? "#ebefeb" : "#121212",
    couleurTexteInverse: estDarkMode ? "#121212" : "#ebefeb",
    vertPrincipal: "#41a44f",
    grisPrincipal: estDarkMode ? "#3f3f3f" : "#b2b2b3",
    vertSecondaire: estDarkMode ? "#41cc4f" : "#3e7a2e",
    blanc: "#ebefeb",
    noir: "#121212",
  };
};