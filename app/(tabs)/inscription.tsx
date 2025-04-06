import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import {styles} from "../fonctionalites/Styles"
import SignUpInput from "../fonctionalites/SignInInput";


export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SignUpInput />        
      </View>
    </SafeAreaView>
  );
}
