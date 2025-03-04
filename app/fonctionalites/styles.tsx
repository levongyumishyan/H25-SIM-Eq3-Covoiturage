import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
    linkButton: {
    backgroundColor: colors.gray1,
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


  map: {
      width: "100%",
      height: "80%",
    },

    container: {
      flex: 1,
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
      color: colors.darkgray1,
    },

    grosTitre: {
      fontSize: 32,
      textAlign: "center",
      color: colors.white1,
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
