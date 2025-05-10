import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from "./Settings";
import { Link } from 'expo-router';
import { colors } from './Colors';
import { styles } from './Styles';
import { useAuthStore } from './VariablesGlobales';
import { BASE_URL } from '../apiConfig'; // ✅ Using hosted backend

const LoginInput = () => {
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [messageErreur, setMessageErreur] = useState('');


  const estConnecte = useAuthStore((state) => state.estConnecte);
  const setConnecte = useAuthStore((state) => state.setEstConnecte);
  const nomUtilisateur = useAuthStore((state) => state.nomUtilisateur);
  const setNomUtilisateur = useAuthStore((state) => state.setNomUtilisateur);
  const setPrenomUtilisateur = useAuthStore((state) => state.setPrenomUtilisateur);
  const courrielUtilisateur = useAuthStore((state) => state.courrielUtilisateur);
  const setCourrielUtilisateur = useAuthStore((state) => state.setCourrielUtilisateur);
  const telephoneUtilisateur = useAuthStore((state) => state.telephoneUtilisateur);
  const setTelephoneUtilisateur = useAuthStore((state) => state.setTelephoneUtilisateur); 
  const userId = useAuthStore((state) => state.userId);
  const setUserId = useAuthStore((state) => state.setUserId); 

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
      
      //Attribution des variables globales
      setConnecte(true);
      setPrenomUtilisateur(data.utilisateur?.prenom || 'erreur user');
      setNomUtilisateur(data.utilisateur?.nom || 'erreur user');
      setCourrielUtilisateur(data.utilisateur?.email || "erreur email");
      setTelephoneUtilisateur(data.utilisateur?.telephone || "erreur telephone");
      setUserId(data.utilisateur?.id);


      console.log('Réponse du serveur :', data);
      console.log(courrielUtilisateur, nomUtilisateur, data.utilisateur?.telephone);
      console.log(userId);
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      setMessageErreur(error.message);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.colonneCentree}>
        {estConnecte ? (
          <>
            <Settings/>
          </>
        ) : (
          <>
            <Text style={styles.titre}>Ride/W</Text>

            <Text style={styles.sousTitre}>Courriel</Text>
            <TextInput
              style={[styles.input, { color: colors.couleurTexteInverse }]}
              onChangeText={setCourriel}
              value={courriel}
              placeholder="courriel@entreprise.ca"
              placeholderTextColor={colors.couleurTexteInverse}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.sousTitre}>Mot de passe</Text>
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

            <TouchableOpacity style={styles.bouton} onPress={verifierConnection}>
              <Text style={styles.label}>Se connecter</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginInput;
