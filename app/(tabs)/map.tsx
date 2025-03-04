import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../fonctionalites/colors";

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
        customMapStyle={uberMapStyle} // Uber-like map styling
      >
        <Marker coordinate={region} title="Votre position" />
      </MapView>

      {/* Floating Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.darkgray1} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Où allez-vous ?"
          placeholderTextColor={colors.darkgray1}
          value={destination}
          onChangeText={setDestination}
        />
      </View>
    </View>
  );
}

const uberMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#212121" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#212121" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#383838" }],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: colors.white1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },

  actionButton: {
    backgroundColor: colors.green1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  actionText: {
    color: colors.white1,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  tripSuggestions: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.gray900,
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tripTitle: {
    color: colors.white1,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tripOption: {
    backgroundColor: colors.darkgray1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  tripText: {
    color: colors.white1,
    fontSize: 14,
  },
});

export default MapScreen;
