import { Text, View, StyleSheet, Button, Linking } from "react-native";
import { Link } from "expo-router";
import { NavigationRouteContext } from "@react-navigation/native";
import { navigate } from "expo-router/build/global-state/routing";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { styles } from "./fonctionalites/Styles";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>La page suivante est introuvable</Text>
      <Link href="./" style={styles.linkButton}>Retour</Link> 
    </View>
  );
}

