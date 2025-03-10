import {estDarkMode} from "../fonctionalites/variablesGlobales";


export const colors = ({  //   dark        light
    arrierePlan: estDarkMode ? "#1c1c1c" : "#ebefeb",
    couleurSurVert: estDarkMode ? "#ebefeb" : "#ebefeb",
    couleurTexte: estDarkMode ? "#ebefeb" : "#121212",
    couleurTexteInverse: estDarkMode ? "#121212" : "#ebefeb",
    
    vertPrincipal: estDarkMode ? "#41a44f" : "#41a44f",
    grisPrincipal: estDarkMode ? "#3f3f3f" : "#b2b2b3",
    vertSecondaire: estDarkMode ? "#41cc4f" : "#307a2e", //a voir

    blanc: estDarkMode ? "#ebefeb" : "#ebefeb",
    noir: estDarkMode ? "#121212" : "#121212",
  });