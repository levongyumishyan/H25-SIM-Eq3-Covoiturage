import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { styles } from '../fonctionalites/Styles';
import { useAuthStore } from '~/fonctionalites/VariablesGlobales';
import Trajet from '../fonctionalites/Trajet';
import { useState } from 'react';

export default function App() {
  const estConnecte = useAuthStore((state) => state.estConnecte);
  const nomUtilisateur = useAuthStore((state) => state.nomUtilisateur);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.colonneCentree}>
      <Text style={styles.titre}>
          {estConnecte ? `Bienvenue,\n ${nomUtilisateur}` : 'Ride/W'}
      </Text>
      <Text style={styles.sousTitre}>
          {estConnecte ? 'Bon retour !' : 'Application de Covoiturage'}
      </Text>

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
