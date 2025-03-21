import {View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { estConnecte } from "../fonctionalites/variablesGlobales";
import React from "react";
import { colors } from "../fonctionalites/colors";
import { useRouter } from 'expo-router';
import {styles} from "../fonctionalites/styles"
import SignUpInput from "../fonctionalites/signUpInput";


export default function Index() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SignUpInput />        
      </View>
    </SafeAreaView>
  );
}