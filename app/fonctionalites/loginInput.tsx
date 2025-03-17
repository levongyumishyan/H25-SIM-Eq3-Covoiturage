import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './colors';
import {styles} from '../fonctionalites/styles'


const LoginInput = () => {
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');

  // Vérification avec la userbase (Placeholder logic)
  const verifierConnection = () => { 
    if (courriel === "admin" && mdp === "password") {
      alert("Connexion réussie!");
    } else {
      alert("Échec de connexion :(");
    }
  };

  return (
    <SafeAreaView style={styles.textContainer}>
      <Text style={styles.label}>Courriel</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCourriel}
        value={courriel}
        placeholder="courriel@entreprise.ca"
        placeholderTextColor={colors.couleurTexte}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Mot de passe</Text>
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

      <SafeAreaView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={verifierConnection}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};


export default LoginInput;
