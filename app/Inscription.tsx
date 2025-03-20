import { Text, View, StyleSheet, Button, Linking } from "react-native";
import { Link } from "expo-router";
import { NavigationRouteContext } from "@react-navigation/native";
import { navigate } from "expo-router/build/global-state/routing";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { styles } from "./fonctionalites/styles";
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { estConnecte } from "./fonctionalites/variablesGlobales";
import InscriptionInput from "./fonctionalites/inscriptionInput";


export default function Index() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{estConnecte ? "Bienvenue!" : "Inscrivez-vous!"}</Text>
        <InscriptionInput />        
      </View>
    </SafeAreaView>
  );
}