import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { colors } from './Colors';
import { styles } from './Styles';
import { useAuthStore } from './VariablesGlobales';
import { BASE_URL } from '../apiConfig'; // ✅ Using hosted backend

const LoginInput = () => {
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [messageErreur, setMessageErreur] = useState('');
  const [nomUtilisateur, setNomUtilisateurLocal] = useState('');

  const estConnecte = useAuthStore((state) => state.value);
  const setConnecte = useAuthStore((state) => state.setEstConnecte);
  const setNomUtilisateur = useAuthStore((state) => state.setNomUtilisateur);

  const verifierConnection = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: courriel, mdp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Une erreur est survenue');

      setMessageErreur('');
      setConnecte(true);
      setNomUtilisateur(data.utilisateur?.nom || 'utilisateur');
      setNomUtilisateurLocal(data.utilisateur?.nom || 'utilisateur');
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      setMessageErreur(error.message);
    }
  };

  const deconnection = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: courriel, mdp }),
      });

      const data = await response.json();
      console.log('Réponse du serveur :', data);
      setConnecte(false);
    } catch (error) {
      console.error('Erreur de déconnexion :', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredColumn}>
        {estConnecte ? (
          <>
            <Text style={styles.subtitle}>Bienvenue! {nomUtilisateur ? `, ${nomUtilisateur}` : ''}</Text>
            <TouchableOpacity style={styles.button} onPress={deconnection}>
              <Text style={styles.buttonText}>Se déconnecter</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Ride/W</Text>

            <Text style={styles.subtitle}>Courriel</Text>
            <TextInput
              style={[styles.input, { color: colors.couleurTexteInverse }]}
              onChangeText={setCourriel}
              value={courriel}
              placeholder="courriel@entreprise.ca"
              placeholderTextColor={colors.couleurTexteInverse}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.subtitle}>Mot de passe</Text>
            <TextInput
              style={[styles.input, { color: colors.couleurTexteInverse }]}
              onChangeText={setMdp}
              value={mdp}
              placeholder="**********"
              placeholderTextColor={colors.couleurTexteInverse}
              secureTextEntry
            />

            {messageErreur ? (
              <Text style={{ color: 'red', textAlign: 'center' }}>{messageErreur}</Text>
            ) : null}

            <View style={styles.linksContainer}>
              <Link href="../(tabs)/mdpOublie" style={styles.linkText}>Mot de passe oublié?</Link>
              <Link href="../(tabs)/inscription" style={styles.linkText}>Se créer un compte</Link>
            </View>

            <TouchableOpacity style={styles.button} onPress={verifierConnection}>
              <Text style={styles.label}>Se connecter</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginInput;
