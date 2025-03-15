import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginInput from "../fonctionalites/loginInput";
import { estConnecte } from "../fonctionalites/variablesGlobales";
import React from "react";
import { colors } from "../fonctionalites/colors";
import FlatButton from '../fonctionalites/button';
import { useRouter } from 'expo-router';
import {styles} from "../fonctionalites/styles"
import SignUpInput from "../fonctionalites/signUpInput";


export default function Index() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <SignUpInput />        
      </View>
    </SafeAreaView>
  );
}

const stylesSheet = StyleSheet.create({

  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.couleurTexte,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.couleurTexte,
    marginBottom: 20,
  },
});
