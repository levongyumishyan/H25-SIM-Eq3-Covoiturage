import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({

    linkButton: {
    backgroundColor: colors.grisPrincipal,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  linkButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },


  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.couleurTexte,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    color: colors.couleurTexte,
    textAlign: "center",
    marginTop: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },

  button: {
    backgroundColor: colors.vertPrincipal,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  buttonText: {
    color: colors.couleurTexte,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.couleurTexte,
  },

  outlineButtonText: {
    color: colors.couleurTexte,
  },

  map: {
      width: "100%",
      height: "80%",
    },

    content: {
      alignItems: "center",
      width: "90%",
    },

    container: {
      flex: 1,
      backgroundColor: colors.arrierePlan,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },

    barreSuperieure: {
      backgroundColor: "lightblue",
      color: "blue",
    },

    imageBackground: {
      flex: 1,
      height: Dimensions.get("window").height,
      width: Dimensions.get("window").width,
      justifyContent: "center",
      alignItems: "center",
    },

    textContainer: {
      width: "100%",
      alignItems: "center",
      paddingVertical: 20,
    },

    index2: {
      width: "100%",
      alignItems: "center",
      backgroundColor: "white",
    },

    additionalText: {
      fontSize: 16,
      textAlign: "center",
      color: colors.grisPrincipal,
    },

    grosTitre: {
      fontSize: 32,
      textAlign: "center",
      color: colors.couleurTexte,
    },


    tabBar: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor: 'rgba(65, 164, 79, 0.8)',
      borderRadius: 30,
      height: 65,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
  
    tabLabel: {
      fontSize: 12,
      fontWeight: '600',
    },

    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 4,
    },
});
