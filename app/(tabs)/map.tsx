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
      
      {/*<MapView initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}> </MapView>*/}
    
    
    </View>
  );
}


