import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../fonctionalites/colors";
import { styles } from "../fonctionalites/styles"


export default function MapScreen() {
  const [region, setRegion] = useState({
    latitude: 45.5376,
    longitude: -73.6745,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [destination, setDestination] = useState("");

  return (
    <View style={styles.container}>
      {/* Full-Screen Map */}
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        customMapStyle={MapStyle}
      >
        <Marker coordinate={region} title="Votre position" />
      </MapView>

      {/* Floating Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.blanc} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Où allez-vous ?"
          placeholderTextColor={colors.noir}
          value={destination}
          onChangeText={setDestination}
        />
      </View>
    </View>
  );
}

const MapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: colors.grisPrincipal }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: colors.couleurTexte }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: colors.grisPrincipal }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color:colors.noir }],
  },
];


export default MapScreen;
