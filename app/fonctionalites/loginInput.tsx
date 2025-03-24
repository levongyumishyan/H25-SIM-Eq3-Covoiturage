import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './colors';
import {styles} from '../fonctionalites/styles'
import { localIP_test } from './variablesGlobales';


const LoginInput = () => {
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [estConnecte, setConnecte] = useState(false);


  // Vérification avec la userbase (Placeholder logic)
  const verifierConnection = async () => { 
    try {
      setConnecte(true);//à changer par la réponse du serveur p/r à l'utilisateur
      const response = await fetch("http://" + localIP_test + ":5001/api/auth/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: courriel,
          mdp: mdp,
        }),
      });
  
      const data = await response.json();
  
      console.log("Réponse du serveur :", data);
      

    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  }
    const deconnection = async () => { 
      try {
        setConnecte(false); //à changer par la réponse du serveur p/r à l'utilisateur
        const response2 = await fetch("http://" + localIP_test + ":5001/api/auth/logout", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: courriel,
            mdp: mdp,
          }),
        });
  
    
        const data = await response2.json();
    
        console.log("Réponse du serveur :", data);
      } catch (error) {
        console.error("Erreur de deconnexion :", error);
      }
    };

  return (
    <SafeAreaView style={styles.textContainer}>
      {estConnecte ? (
        <>
        <Text style={styles.title}>Bienvenue!</Text>
          <TouchableOpacity style={styles.button} onPress={deconnection}>
            <Text style={styles.buttonText}>Se déconnecter</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
        <Text style={styles.title}>Ride/W</Text>
        <Text style={styles.subtitle}>Courriel</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCourriel}
        value={courriel}
        placeholder="courriel@entreprise.ca"
        placeholderTextColor={colors.couleurTexte}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.subtitle}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMdp}
        value={mdp}
        placeholder="* * * * * * * * * *"
        placeholderTextColor={colors.couleurTexte}
        secureTextEntry
      />

      <View style={styles.linksContainer}>
        <Link href="../(tabs)/mdpOublie" style={styles.links}>Mot de passe oublié?</Link>
        <Link href="../(tabs)/inscription" style={styles.links}>Se créer un compte</Link>
      </View>

      <TouchableOpacity style={styles.button} onPress={verifierConnection}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      </>
      )}



      
    </SafeAreaView>
  );
};


export default LoginInput;
