import { Text, View, StyleSheet } from "react-native";  
import React from 'react';
import { styles } from "../fonctionnalites/styles";
import MapView from "react-native-maps";
import { Link } from "expo-router";


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
      <Link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css">Bonjour</Link>
      
      <MapView 
      style={styles.map}
      showsUserLocation
      showsMyLocationButton
      initialRegion={{ 
        latitude: 45.5376,
        longitude: -73.6745,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      />{/*Position par défaut au cégep*/}
    
    
    </View>
  );
}


