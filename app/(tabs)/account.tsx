import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginInput from "../fonctionalites/loginInput";
import { estConnecte } from "../fonctionalites/variablesGlobales";
import React from "react";
import { useRouter } from 'expo-router';
import {styles} from "../fonctionalites/styles"


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

