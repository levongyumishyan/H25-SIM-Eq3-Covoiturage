import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { colors } from './Colors';
import { styles } from './Styles';
import { localIP, useAuthStore } from './VariablesGlobales';

const LoginInput = () => {
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [messageErreur, setMessageErreur] = useState('');

  const estConnecte = useAuthStore((state) => state.value);
  const setConnecte = useAuthStore((state) => state.setEstConnecte);

  const verifierConnection = async () => {
    try {
      const response = await fetch(`http://${localIP}:5001/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: courriel, mdp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Une erreur est survenue');

      setMessageErreur('');
      setConnecte(true);
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      setMessageErreur(error.message);
    }
  };

  const deconnection = async () => {
    try {
      const response = await fetch(`http://${localIP}:5001/api/auth/logout`, {
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
    <SafeAreaView style= {styles.content}>
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
          <Text style={styles.subtitleMoyen}>Courriel</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCourriel}
            value={courriel}
            placeholder="courriel@entreprise.ca"
            placeholderTextColor={colors.couleurTexte}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.subtitleMoyen}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMdp}
            value={mdp}
            placeholder="* * * * * * * * * *"
            placeholderTextColor={colors.couleurTexte}
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
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
    </SafeAreaView>
    
  );
};

export default LoginInput;
