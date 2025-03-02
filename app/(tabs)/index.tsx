import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView } from "react-native";
import { Link, Tabs } from "expo-router";
import { styles } from "../fonctionnalites/styles";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function Index() {
  return (
    
      <ScrollView>
        <View>
        <ImageBackground source={require("../images/routeChamp1.jpg")} resizeMode="cover" style={styles.imageBackground}>
          <Text>Application de covoiturage :)</Text>

          
            <Link href="./account" style={styles.linkButton}>Se connecter</Link>
          
        </ImageBackground>
        </View>
        
        <View style={styles.index2}>
          <Text style={styles.additionalText}>D'autres informations...</Text>
          <Text style={styles.additionalText}>D'autres informations...</Text>
        </View>
        
      </ScrollView>
  
      
      

  );
}
