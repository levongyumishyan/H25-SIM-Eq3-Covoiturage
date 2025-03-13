import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({



title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.couleurTexte,
    textAlign: "center",
  },

subtitle: {
    fontSize: 18,
    color: colors.couleurTexte,
    textAlign: "left",
    marginTop: 10,
    paddingBottom: 10,
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
    alignItems: "center"
  },

buttonText: {
    color: colors.couleurTexte,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },


  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.couleurTexte,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.couleurTexte,
    borderWidth: 1,
    borderColor: colors.grisPrincipal,
    marginBottom: 12,
  },  

outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.couleurTexte,
  },

outlineButtonText: {
    color: colors.couleurTexte,
  },


content: {
      alignItems: "center",
      width: "90%",
      padding: 20,
    },


container: {
      flex: 1,
      backgroundColor: colors.arrierePlan,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },


linksContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
      color: colors.couleurTexte
    
},

links: {
  width: '60%',
  flexDirection: 'row',
  marginBottom: 15,
  color: colors.couleurTexte

},


textContainer: {
      width: "100%",
      alignItems: "left",
      paddingVertical: 20,
    },
});

