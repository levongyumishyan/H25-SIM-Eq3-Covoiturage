import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from "./Settings";
import { Link } from 'expo-router';
import { colors } from './Colors';
import { styles } from './Styles';
import { useAuthStore } from './VariablesGlobales';
import { BASE_URL } from '../apiConfig';

const LoginInput = () => {
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [messageErreur, setMessageErreur] = useState('');

  const estConnecte = useAuthStore((state) => state.estConnecte);
  const setConnecte = useAuthStore((state) => state.setEstConnecte);
  const setNomUtilisateur = useAuthStore((state) => state.setNomUtilisateur);
  const setPrenomUtilisateur = useAuthStore((state) => state.setPrenomUtilisateur);
  const setCourrielUtilisateur = useAuthStore((state) => state.setCourrielUtilisateur);
  const setTelephoneUtilisateur = useAuthStore((state) => state.setTelephoneUtilisateur);
  const setUserId = useAuthStore((state) => state.setUserId);

  const verifierConnection = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: courriel, mdp }),
      });

      const contentType = response.headers.get('Content-Type');
      const raw = await response.text();
      console.log("📦 RAW RESPONSE:", raw);

      if (!response.ok) {
        let message = 'Erreur inconnue';
        if (contentType && contentType.includes('application/json')) {
          try {
            const data = JSON.parse(raw);
            message = data.msg || (data.errors && data.errors[0]?.msg) || message;
          } catch (parseError) {
            message = "Erreur lors de l'analyse JSON de la réponse.";
          }
        } else {
          message = `Réponse inattendue du serveur : ${raw.slice(0, 100)}`;
        }
        throw new Error(message);
      }

      let data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        throw new Error("Réponse serveur illisible (non-JSON)");
      }

      if (!data.utilisateur) throw new Error("Réponse invalide du serveur.");

      setConnecte(true);
      setPrenomUtilisateur(data.utilisateur.prenom);
      setNomUtilisateur(data.utilisateur.nom);
      setCourrielUtilisateur(data.utilisateur.email);
      setTelephoneUtilisateur(data.utilisateur.telephone);
      setUserId(data.utilisateur.id);

      console.log('✅ Utilisateur connecté :', data.utilisateur);
    } catch (error) {
      console.error('❌ Erreur de connexion :', error.message);
      setMessageErreur(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.colonneCentree}>
        {estConnecte ? (
          <Settings />
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
