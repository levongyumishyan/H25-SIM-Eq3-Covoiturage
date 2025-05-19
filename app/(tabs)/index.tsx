import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Dimensions, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { styles } from '../fonctionalites/Styles';
import { useAuthStore } from '~/fonctionalites/VariablesGlobales';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  const estConnecte = useAuthStore((state) => state.estConnecte);
  const nomUtilisateur = useAuthStore((state) => state.prenomUtilisateur);


  //Affiche l'animation d'ouverture de l'application
  useEffect(() => {
    const load = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAppReady(true);
      await SplashScreen.hideAsync();
    };
    load();
  }, []);

  if (!appReady) {
    return (
      <View style={splashStyles.container}>
        <Image
          source={require('../assets/animations/animation-a.gif')}
          style={splashStyles.lottie}
          resizeMode="cover"
        />
      </View>
    );
  }


  return ( //Affichage en fonction de si l'utilisateur est connecté
    <SafeAreaView style={styles.container}>
      <View style={styles.colonneCentree}>

        <Text style={styles.titre}>
          {estConnecte ? `Bienvenue,\n ${nomUtilisateur}` : 'Ride/W'}
        </Text>

        <Text style={styles.sousTitre}>
          {estConnecte ? 'Bon retour !' : 'Application de Covoiturage'}
        </Text>

        {/** Affiche les options pour s'inscrire ou se connecter
         * si l'utilisateur n'est pas inscrit ou connecté.
         */}
        {!estConnecte && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bouton} onPress={() => router.push('/inscription')}>
              <Text style={styles.label}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bouton, styles.contourBouton]} onPress={() => router.push('/account')}>
              <Text style={[styles.label, styles.contourBoutonTexte]}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottie: {
    width: 350,
    height: 100
  }
});
