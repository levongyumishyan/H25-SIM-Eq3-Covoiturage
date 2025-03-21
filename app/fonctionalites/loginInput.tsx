import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './colors';
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
  };
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
    <SafeAreaView style={styles.container}>
      {estConnecte ? (
        // Connecté
        <>
          <Text style={styles.label}>Bienvenue!</Text>
          <TouchableOpacity style={styles.button} onPress={deconnection}>
            <Text style={styles.buttonText}>Se déconnecter</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Déconnecté
        <>
          <Text style={styles.label}>Déconnecté</Text>
  
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
  
          <View style={styles.linksContainer}>
            <Link href="../(tabs)/mdpOublie" style={styles.link}>Mot de passe oublié?</Link>
            <Link href="../(tabs)/inscription" style={styles.link}>Se créer un compte</Link>
          </View>
  
          <TouchableOpacity style={styles.button} onPress={verifierConnection}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </>
      )}
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

export default LoginInput;
