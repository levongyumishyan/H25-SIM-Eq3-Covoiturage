import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginInput from "../fonctionalites/loginInput";
import { estConnecte } from "../fonctionalites/variablesGlobales";
import React from "react";
import { colors } from "../fonctionalites/colors";
import FlatButton from '../fonctionalites/button';
import { useRouter } from 'expo-router';


export default function Index() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{estConnecte ? "Bienvenue!" : "Déconnecté"}</Text>
        <LoginInput />        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray900,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.gray1,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.darkgray1,
    marginBottom: 20,
  },
});
