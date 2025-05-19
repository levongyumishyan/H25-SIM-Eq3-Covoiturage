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
  const prochainTrajet = useRideStore((state) => state.prochainTrajet);
  const effacerProchainTrajet = useRideStore((state) => state.effacerProchainTrajet);
  const [trajets, setTrajets] = useState([]);
  const [statistiques, setStatistiques] = useState(null);

  useEffect(() => {
    if (userId) actualiserTrajets();
  }, [userId]);

  /**
   * Calcule les statistiques sur la préservation de
   * l'environnement.
   * @param rides Les trajets effectués par l'utilisateur
   * @returns 
   */
  const calculerStatistiques = (rides) => {
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


  //Case d'affichage pour un trajet effectué
  const renderRide = ({ item }) => (
    <TouchableOpacity style={styles.ridecontainer}>
      <Ionicons name="car-outline" size={24} color={couleurs.couleurTexte} style={styles.icon} />
      <View style={styles.rideDetails}>
        <Text style={styles.label}>{item.pickupAddress} → {item.targetAddress}</Text>
        <Text style={styles.petitTexte}>{item.distance} km • À venir</Text>
      </View>
    </TouchableOpacity>
  );

  /**
   * Demande au serveur du backend uniquement les trajets
   * effectués par l'utilisateur connecté.
   */
  const actualiserTrajets = async () => {
    try {
      setTrajets(null);
      const response = await fetch(`${BASE_URL}/api/trajets`);
      const text = await response.text();

      try {
        const data = JSON.parse(text);
        const trajetsFiltres = data.filter(
          (trajet) =>
            trajet.userId === userId ||
            (Array.isArray(trajet.passengers) && trajet.passengers.includes(userId))
        );
        setTrajets(trajetsFiltres);
        setStatistiques(calculerStatistiques(trajetsFiltres));

      } catch (parseError) {
        console.error('erreur transfert json', parseError.message);
      }
    } catch (error) {
      console.error('Network error', error.message);
    }
  };

  //Pas fini
  const completerTrajet = () => {
    if (prochainTrajet) {
      setTrajets((prev) => [prochainTrajet, ...prev]);
      effacerProchainTrajet();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/*Statistiques écolo de l'utilisateur*/}
        {statistiques && (
          <View style={styles.ligneCentree}>
            <View style={styles.colonneCentree}>
              <Ionicons name="leaf-outline" size={30} color={couleurs.vertSecondaire} />
              <Text style={styles.labelCentered}>{statistiques.treesSaved} arbres sauvés</Text>
            </View>
            <View style={styles.colonneCentree}>
              <Ionicons name="cloud-outline" size={30} color={couleurs.vertSecondaire} />
              <Text style={styles.labelCentered}>{statistiques.co2Reduced} CO₂ réduit</Text>
            </View>
            <View style={styles.colonneCentree}>
              <Ionicons name="bicycle" size={30} color={couleurs.vertSecondaire} />
              <Text style={styles.labelCentered}>{statistiques.totalDistance} km parcourus</Text>
            </View>
          </View>
        )}

        {prochainTrajet && ( //Pas fini
          <View style={styles.prochainTrajetContainer}>
            <Text style={styles.titre}>Trajet en Cours</Text>
            <View style={styles.ridecontainer}>
              <Ionicons name="car-sport-outline" size={24} color={couleurs.vertPrincipal} style={styles.icon} />
              <View style={styles.rideDetails}>
                <Text style={styles.label}>{prochainTrajet.origin} → {prochainTrajet.destination}</Text>
                <Text style={styles.petitTexte}>{prochainTrajet.distance} km • En cours...</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bouton} onPress={completerTrajet}>
              <Text style={styles.boutonTexte}>Terminer le trajet</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Affichage de tous les trajets de l'utilisateur*/}
        <Text style={styles.titre}>Trajets Récents</Text>
        <TouchableOpacity style={styles.bouton} onPress={actualiserTrajets}>
          <Text style={styles.boutonTexte}>Actualiser</Text>
        </TouchableOpacity>
        <FlatList
          data={trajets}
          keyExtractor={(item) => item.id}
          renderItem={renderRide}
          contentContainerStyle={styles.scrollContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
