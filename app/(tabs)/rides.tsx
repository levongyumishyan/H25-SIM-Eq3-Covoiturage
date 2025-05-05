import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { couleurs } from "../fonctionalites/Couleurs";
import { styles } from "../fonctionalites/Styles";
import { useAuthStore } from "../fonctionalites/VariablesGlobales";
import { useRideStore } from "../fonctionalites/useRideStore";
import { BASE_URL } from "../apiConfig";

export default function Rides() {
  const userId = useAuthStore((state) => state.userId);
  const upcomingRide = useRideStore((state) => state.upcomingRide);
  const clearUpcomingRide = useRideStore((state) => state.clearUpcomingRide);
  const [rides, setRides] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const calculateStats = (rides) => {
    const totalDistance = rides.reduce((sum, ride) => sum + (ride.distance || 0), 0);
    const co2Saved = totalDistance * 0.21;
    const treesSaved = co2Saved / 21;
    return {
      totalDistance: totalDistance.toFixed(1),
      co2Reduced: `${co2Saved.toFixed(1)} kg`,
      treesSaved: treesSaved.toFixed(2),
      ridesCompleted: rides.length,
    };
  };

  const fetchRides = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/${userId}/rides`);
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.warn('Response not JSON, injecting mock.');
        data = { rides: [] };
      }

      let userRides = Array.isArray(data.rides) ? data.rides : Array.isArray(data) ? data : [];

      setRides(userRides);
      const calculatedStats = calculateStats(userRides);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Erreur en récupérant les trajets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchRides();
  }, [userId]);

  const completeRide = () => {
    if (upcomingRide) {
      setRides((prev) => [upcomingRide, ...prev]);
      clearUpcomingRide();
    }
  };

  const renderRide = ({ item }) => (
    <TouchableOpacity style={styles.ridecontainer}>
      <Ionicons name="car-outline" size={24} color={couleurs.couleurTexte} style={styles.icon} />
      <View style={styles.rideDetails}>
        <Text style={styles.label}>{item.origin} → {item.destination}</Text>
        <Text style={styles.smallText}>{item.distance} km • Terminé</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={couleurs.vertPrincipal} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {stats && (
          <View style={styles.centeredRow}>
            <View style={styles.centeredColumn}>
              <Ionicons name="leaf-outline" size={30} color={couleurs.vertSecondaire} />
              <Text style={styles.labelCentered}>{stats.treesSaved} arbres sauvés</Text>
            </View>
            <View style={styles.centeredColumn}>
              <Ionicons name="cloud-outline" size={30} color={couleurs.vertSecondaire} />
              <Text style={styles.labelCentered}>{stats.co2Reduced} CO₂ réduit</Text>
            </View>
            <View style={styles.centeredColumn}>
              <Ionicons name="bicycle" size={30} color={couleurs.vertSecondaire} />
              <Text style={styles.labelCentered}>{stats.totalDistance} km parcourus</Text>
            </View>
          </View>
        )}

        {upcomingRide && (
          <View style={styles.upcomingRideContainer}>
            <Text style={styles.title}>Trajet en Cours</Text>
            <View style={styles.ridecontainer}>
              <Ionicons name="car-sport-outline" size={24} color={couleurs.vertPrincipal} style={styles.icon} />
              <View style={styles.rideDetails}>
                <Text style={styles.label}>{upcomingRide.origin} → {upcomingRide.destination}</Text>
                <Text style={styles.smallText}>{upcomingRide.distance} km • En cours...</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={completeRide}>
              <Text style={styles.buttonText}>Terminer le trajet</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.title}>Trajets Récents</Text>
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRide}
          contentContainerStyle={styles.scrollContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
