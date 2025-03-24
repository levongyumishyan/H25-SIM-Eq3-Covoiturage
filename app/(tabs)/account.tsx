import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginInput from "../fonctionalites/loginInput";
import { estConnecte } from "../fonctionalites/variablesGlobales";
import React from "react";
import { colors } from "../fonctionalites/colors";
import FlatButton from '../fonctionalites/button';
import { useRouter } from 'expo-router';
import {styles} from "../fonctionalites/styles"


export default function Index() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LoginInput />        
      </View>
    </SafeAreaView>
  );
}

