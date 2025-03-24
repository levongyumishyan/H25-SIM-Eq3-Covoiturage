import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../fonctionalites/colors";

export default function Index() {
  // Mock Data for Recent Rides
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
      <Ionicons name="car-outline" size={24} color={colors.couleurTexte} style={styles.icon} />
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
            <Ionicons name="leaf-outline" size={30} color={colors.vertSecondaire} />
            <Text style={styles.statText}>{stats.treesSaved} arbres sauvés</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="cloud-outline" size={30} color={colors.vertSecondaire} />
            <Text style={styles.statText}>{stats.co2Reduced} CO₂ réduit</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="checkmark-circle-outline" size={30} color={colors.vertSecondaire} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.arrierePlan,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: colors.grisPrincipal,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  statText: {
    color: colors.couleurTexte,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.couleurTexte,
    marginBottom: 15,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  rideItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grisPrincipal,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 15,
  },
  rideDetails: {
    flex: 1,
  },
  rideText: {
    color: colors.couleurTexte,
    fontSize: 16,
    fontWeight: "bold",
  },
  rideTime: {
    color: colors.vertSecondaire,
    fontSize: 14,
  },
});

export default Index;
