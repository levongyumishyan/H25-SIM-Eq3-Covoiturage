import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { styles } from '../fonctionalites/Styles';
import { useAuthStore } from '~/fonctionalites/VariablesGlobales';
import Trajet from '../fonctionalites/Trajet';
import { useState } from 'react';

export default function App() {
  const estConnecte = useAuthStore((state) => state.value);
  const nomUtilisateur = useAuthStore((state) => state.nomUtilisateur);
  const [trajet, setTrajet] = useState('');
  const [trajets, setTrajets] = useState([]);

  const ajouter = () =>
  {
    setTrajet('trajet')
    setTrajets([...trajets, trajet])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredColumn}>
      <Text style={styles.title}>
          {estConnecte ? `Bienvenue, ${nomUtilisateur}` : 'Ride/W'}
      </Text>
      <Text style={styles.subtitle}>
          {estConnecte ? 'Bon retour !' : 'Application de Covoiturage'}
      </Text>
      <Text style={styles.subtitle}>
        {estConnecte ? 'Vos trajets :' : ''}
      </Text>
      <View>
        {/*Code for the tasks */}
        {
          trajets.map(() => 
          {
            return (
            <TouchableOpacity>
              <Trajet/>
            </TouchableOpacity>
            )
          })
        }
      </View>

      <TouchableOpacity onPress={() => ajouter()}>
        <View style={styles.ajouterTrajet} >
          <Text style={styles.elementText}>+
          </Text>
        </View>
      </TouchableOpacity>

        {!estConnecte && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/inscription')}>
              <Text style={styles.label}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={() => router.push('/account')}>
              <Text style={[styles.label, styles.outlineButtonText]}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
