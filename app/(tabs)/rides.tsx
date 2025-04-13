import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useCouleurs } from '../fonctionalites/Couleurs';
import {styles} from "../fonctionalites/Styles"

export default function Rides() {
  
  const palette = useCouleurs();

  const [rides, setRides] = useState([
    { id: "1", origin: "Centre-Ville", destination: "Aéroport", time: "12 min" },
    { id: "2", origin: "Université", destination: "Maison", time: "18 min" },
    { id: "3", origin: "Bureau", destination: "Gym", time: "10 min" },
    { id: "4", origin: "Parc Jean-Drapeau", destination: "Stade", time: "8 min" },
    { id: "5", origin: "Marché Central", destination: "Maison", time: "15 min" },
    { id: "6", origin: "Gare Centrale", destination: "Parc", time: "20 min" },
  ]);

  // Mock Statistics
  const stats = {
    treesSaved: 42,
    co2Reduced: "150kg",
    ridesCompleted: 320,
  };

  const renderRide = ({ item }) => (
    <TouchableOpacity style={styles.rideItem}>
      <Ionicons name="car-outline" size={24} color={palette.couleurTexte} style={styles.icon} />
      <View style={styles.rideDetails}>
        <Text style={styles.rideText}>{item.origin} → {item.destination}</Text>
        <Text style={styles.rideTime}>{item.time} • Terminé</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Statistics Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="leaf-outline" size={30} color={palette.vertSecondaire} />
            <Text style={styles.statText}>{stats.treesSaved} arbres sauvés</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="cloud-outline" size={30} color={palette.vertSecondaire} />
            <Text style={styles.statText}>{stats.co2Reduced} CO₂ réduit</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="checkmark-circle-outline" size={30} color={palette.vertSecondaire} />
            <Text style={styles.statText}>{stats.ridesCompleted} trajets complétés</Text>
          </View>
        </View>

        {/* Recent Rides Section */}
        <Text style={styles.title}>Trajets Récents</Text>
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id}
          renderItem={renderRide}
          contentContainerStyle={styles.list}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

//export default Rides;
