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
      <Text style={styles.subtitle}>Courriel</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCourriel}
        value={courriel}
        placeholder="courriel@entreprise.ca"
        placeholderTextColor={colors.couleurTexteInverse}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.subtitle}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMdp}
        value={mdp}
        placeholder="* * * * * * * * * *"
        placeholderTextColor={colors.couleurTexteInverse}
        secureTextEntry
      />

      <View style={styles.linksContainer}>
        <Link href="../(tabs)/mdpOublie" style={styles.links}>Mot de passe oublié?</Link>
        <Link href="../(tabs)/inscription" style={styles.links}>Se créer un compte</Link>
      </View>

      <TouchableOpacity style={styles.button} onPress={verifierConnection}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const stylesSheet = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.couleurTexte,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.gray900,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.couleurTexte,
    borderWidth: 1,
    borderColor: colors.grisPrincipal,
    marginBottom: 12,
  },
  button: {
    width: '100%',
    backgroundColor: colors.vertPrincipal,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: colors.couleurTexte,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default LoginInput;
