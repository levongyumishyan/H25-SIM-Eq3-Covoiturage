import { Text, View, StyleSheet } from "react-native";
import { Link, Tabs } from "expo-router";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Application de covoiturage :)</Text>
      <Link href="./account">Se connecter</Link> 
    </View>
  );
}
