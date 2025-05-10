import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { styles } from '../fonctionalites/Styles';
import { useAuthStore } from '~/fonctionalites/VariablesGlobales';
import { useRideStore } from '~/fonctionalites/useRideStore';
import { colors } from '../fonctionalites/Colors';

export default function App() {
  const estConnecte = useAuthStore((state) => state.estConnecte);
  const nomUtilisateur = useAuthStore((state) => state.nomUtilisateur);
  const upcomingRide = useRideStore((state) => state.upcomingRide);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.colonneCentree}>
        <Text style={styles.titre}>
          {estConnecte ? `Bienvenue,\n ${nomUtilisateur}` : 'Ride/W'}
        </Text>

        <Text style={styles.sousTitre}>
          {estConnecte ? 'Bon retour !' : 'Application de Covoiturage'}
        </Text>

        {estConnecte && upcomingRide && (
          <View style={{
            backgroundColor: colors.vertPrincipal,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 16,
            marginTop: 30,
            width: '90%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
              🚗 Trajet en cours
            </Text>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', marginTop: 5 }}>
              {upcomingRide.origin} ➔ {upcomingRide.destination}
            </Text>
          </View>
        )}

        {!estConnecte && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bouton} onPress={() => router.push('/inscription')}>
              <Text style={styles.label}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bouton, styles.contourBouton]} onPress={() => router.push('/account')}>
              <Text style={[styles.label, styles.contourBoutonTexte]}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
