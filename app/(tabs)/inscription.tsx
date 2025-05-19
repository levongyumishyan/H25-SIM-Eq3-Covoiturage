import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { styles } from "../fonctionalites/Styles"
import Inscription from "../fonctionalites/Inscription";


export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Inscription />
      </View>
    </SafeAreaView>
  );
}
