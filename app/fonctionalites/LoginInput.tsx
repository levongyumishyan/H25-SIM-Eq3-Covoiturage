import { Link } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { couleurs } from './Couleurs';
import { styles } from './Styles';
import { localIP_test } from './VariablesGlobales';

const LoginInput = () => {
  const palette = couleurs(); // ✅ Appel de la fonction couleurs()
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [estConnecte, setConnecte] = useState(false);
  const [messageErreur, setMessageErreur] = useState('');

  const verifierConnection = async () => {
    try {
      const response = await fetch(`http://${localIP_test}:5001/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: courriel,
          mdp: mdp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Une erreur est survenue');
      }

      console.log('Réponse du serveur :', data);
      setMessageErreur('');
      setConnecte(true);
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      setMessageErreur(error.message);
    }
  };

  const deconnection = async () => {
    try {
      setConnecte(false);
      const response2 = await fetch(`http://${localIP_test}:5001/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: courriel,
          mdp: mdp,
        }),
      });

      const data = await response2.json();
      console.log('Réponse du serveur :', data);
    } catch (error) {
      console.error('Erreur de déconnexion :', error);
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
            placeholderTextColor={palette.couleurTexte}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.subtitle}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMdp}
            value={mdp}
            placeholder="* * * * * * * * * *"
            placeholderTextColor={palette.couleurTexte}
            secureTextEntry
          />

          {messageErreur ? (
            <Text style={{ color: 'red', textAlign: 'center' }}>{messageErreur}</Text>
          ) : null}

          <View style={styles.linksContainer}>
            <Link href="../(tabs)/mdpOublie" style={styles.links}>
              Mot de passe oublié?
            </Link>
            <Link href="../(tabs)/inscription" style={styles.links}>
              Se créer un compte
            </Link>
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