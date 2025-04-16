import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../fonctionalites/Colors";
import {styles} from "../fonctionalites/Styles"

export default function Rides() {
  
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
    <TouchableOpacity style={styles.ridecontainer}>
      <Ionicons name="car-outline" size={24} color={colors.couleurTexte} style={styles.icon} />
      <View style={styles.rideDetails}>
        <Text style={styles.label}>{item.origin} → {item.destination}</Text>
        <Text style={styles.smallText}>{item.time} • Terminé</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Statistics Section */}
        <View style={styles.centeredRow}>
          <View style={styles.centeredColumn}>
            <Ionicons name="leaf-outline" size={30} color={colors.vertSecondaire} />
            <Text style={styles.labelCentered}>{stats.treesSaved} arbres sauvés</Text>
          </View>
          <View style={styles.centeredColumn}>
            <Ionicons name="cloud-outline" size={30} color={colors.vertSecondaire} />
            <Text style={styles.labelCentered}>{stats.co2Reduced} CO₂ réduit</Text>
          </View>
          <View style={styles.centeredColumn}>
            <Ionicons name="car" size={30} color={colors.vertSecondaire} />
            <Text style={styles.labelCentered}>{stats.ridesCompleted} trajets complétés</Text>
          </View>
        </View>

        {/* Recent Rides Section */}
        <Text style={styles.title}>Trajets Récents</Text>
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id}
          renderItem={renderRide}
          contentContainerStyle={styles.scrollContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Rides;
