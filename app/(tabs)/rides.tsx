import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../fonctionalites/Colors";
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
      <Ionicons name="car-outline" size={24} color={colors.couleurTexte} style={styles.icon} />
      <View style={styles.rideDetails}>
        <Text style={styles.label}>{item.pickupAddress} → {item.targetAddress}</Text>
        <Text style={styles.petitTexte}>{item.distance} km • À venir</Text>
      </View>
    </TouchableOpacity>
  );
  const actualiserTrajets = async () => {
  try {
    setRides(null);
    const response = await fetch(`${BASE_URL}/api/trajets`);
    const text = await response.text();

    try {
      const data = JSON.parse(text);
      //console.log('JSON OUTPUT:', data);
      const trajetsFiltrés = data.filter(
        (trajet) => trajet.userId === userId
      );
      //console.log('Trajets pour userId', userId, ':', trajetsFiltrés);
      setRides(trajetsFiltrés);
    } catch (parseError) {
      console.error('erreur transfert json', parseError.message);
    }
    

  } catch (error) {
    console.error('Network error', error.message);
  }
};

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.vertPrincipal} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {stats && (
          <View style={styles.ligneCentree}>
            <View style={styles.colonneCentree}>
              <Ionicons name="leaf-outline" size={30} color={colors.vertSecondaire} />
              <Text style={styles.labelCentered}>{stats.treesSaved} arbres sauvés</Text>
            </View>
            <View style={styles.colonneCentree}>
              <Ionicons name="cloud-outline" size={30} color={colors.vertSecondaire} />
              <Text style={styles.labelCentered}>{stats.co2Reduced} CO₂ réduit</Text>
            </View>
            <View style={styles.colonneCentree}>
              <Ionicons name="bicycle" size={30} color={colors.vertSecondaire} />
              <Text style={styles.labelCentered}>{stats.totalDistance} km parcourus</Text>
            </View>
          </View>
        )}

        {upcomingRide && (
          <View style={styles.upcomingRideContainer}>
            <Text style={styles.titre}>Trajet en Cours</Text>
            <View style={styles.ridecontainer}>
              <Ionicons name="car-sport-outline" size={24} color={colors.vertPrincipal} style={styles.icon} />
              <View style={styles.rideDetails}>
                <Text style={styles.label}>{upcomingRide.origin} → {upcomingRide.destination}</Text>
                <Text style={styles.petitTexte}>{upcomingRide.distance} km • En cours...</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bouton} onPress={completeRide}>
              <Text style={styles.boutonTexte}>Terminer le trajet</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.titre}>Trajets Récents</Text>
        <TouchableOpacity style={styles.bouton} onPress={actualiserTrajets}>
                  <Text style={styles.boutonTexte}>Actualiser</Text>
                </TouchableOpacity>
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
