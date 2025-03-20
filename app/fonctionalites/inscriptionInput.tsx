import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './colors';
import axios from 'axios';

const InscriptionInput = () => {
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');


  // Vérification avec la userbase (Placeholder logic)
  const verifierConnection = (e) => 
  {
    e.preventDefault()
    axios.post('https://localhost:8001/users', {courriel, mdp})
    .then(result => console.log(result))
    .catch(err=> console.log(err))
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Courriel</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCourriel}
        value={courriel}
        placeholder="courriel@entreprise.ca"
        placeholderTextColor={colors.grisPrincipal}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMdp}
        value={mdp}
        placeholder="**********"
        placeholderTextColor={colors.grisPrincipal}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={verifierConnection}>

        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
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
  linksContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  link: {
    color: colors.vertPrincipal,
    fontWeight: 'bold',
    fontSize: 14,
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

export default InscriptionInput;