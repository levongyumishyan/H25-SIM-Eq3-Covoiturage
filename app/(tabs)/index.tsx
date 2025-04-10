import {Text, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {styles} from '../fonctionalites/Styles'
import { estConnecte } from '~/fonctionalites/VariablesGlobales';


export default function App() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Page d'accueil en cours
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}> 
            <Text style={styles.title}>Ride/w</Text>
            <Text style={styles.subtitle}>Application de Covoiturage</Text>
          {/* Moved buttons directly below the text */}
          {estConnecte ? (
            <>
              <Text style={styles.title}>Bienvenue, </Text>
              {/* À faire : utiliser la variable du prenom ou du nom de l'utilisateur*/}
              <Text style={styles.subtitle}>nom d'utilisateur.</Text>
            </>
          ) : (
            <>
            <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: slideAnim }] }]}> 
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => router.push('/inscription')}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.outlineButton]} 
              onPress={() => router.push('/account')}
            >
              <Text style={[styles.buttonText, styles.outlineButtonText]}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
            </>
          )}
        </Animated.View>
      </SafeAreaView>
    );
}


export default App;
