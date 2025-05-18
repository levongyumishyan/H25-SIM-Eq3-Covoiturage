import { estDarkMode } from "./VariablesGlobales";

/** Couleurs utilisées selon le thème de l'application */

export const colors = ({//  Mode sombre : Mode clair
  arrierePlan: estDarkMode ? "#1c1c1c" : "#ebefeb",
  couleurSurVert: estDarkMode ? "#ebefeb" : "#ebefeb",
  couleurTexte: estDarkMode ? "#ebefeb" : "#121212",
  couleurTexteInverse: estDarkMode ? "#121212" : "#ebefeb",

  vertPrincipal: estDarkMode ? "#41a44f" : "#41a44f",
  grisPrincipal: estDarkMode ? "#3f3f3f" : "#b2b2b3",
  vertSecondaire: estDarkMode ? "#41cc4f" : "#3e7a2e",

  blanc: estDarkMode ? "#ebefeb" : "#ebefeb",
  blancSecondaire: "#e5e9e5",
  noir: estDarkMode ? "#121212" : "#121212",
});