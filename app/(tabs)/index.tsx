import { Text, View, StyleSheet } from "react-native";
import { Link, Tabs } from "expo-router";
import { styles } from "../fonctionnalites/styles";


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
      <Link href="./account" style={styles.linkButton}>Se connecter</Link> 
    </View>
  );
}
