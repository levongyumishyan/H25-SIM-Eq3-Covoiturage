import { Text, View, StyleSheet, Button, Linking, Dimensions } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
    linkButton: {
      color: colors.green1,
      fontWeight: 'bold',
      backgroundColor: colors.darkgray1,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    linkButtonClick: {
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: colors.lightgray1,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
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
      
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    textContainer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: 20,
    },
    index2: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: 'white',
      
    },
    additionalText: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.darkgray1,
    },
    grosTitre: {
      fontSize: 32,
      textAlign: 'center',
      color: colors.white1,
    },
  });