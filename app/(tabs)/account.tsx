import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginInput from "../fonctionalites/LoginInput";
import React from "react";
import { useRouter } from 'expo-router';
import { styles } from "../fonctionalites/Styles"


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

