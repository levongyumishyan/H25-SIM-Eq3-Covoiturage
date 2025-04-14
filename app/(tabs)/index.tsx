import {Text, TouchableOpacity, Animated, Button } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useRouter } from 'expo-router';
import {styles} from '../fonctionalites/Styles'
import { useAuthStore } from '~/fonctionalites/VariablesGlobales';
import '../fonctionalites/LoginInput.tsx';
  

export default function App() {
  const estConnecte = useAuthStore((state) => state.value);
  
  //const [estConnecte, setConnecte] = useState(getConnecte());
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
          {/* Moved buttons directly below the text */}
          {estConnecte ? (
            <>
              <Text style={styles.title}>Bienvenue sur RideW </Text>
              {/* À faire : utiliser la variable du prenom ou du nom de l'utilisateur*/}
              <Text style={styles.subtitleMoyen}>nom d'utilisateur</Text>
            </>
          ) : (
            <>
            <Text style={styles.title}>Ride/w</Text>
            <Text style={styles.subtitleMoyen}>Application de Covoiturage </Text>
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
