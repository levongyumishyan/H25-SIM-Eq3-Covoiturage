import { useState } from "react";
import { useAuthStore } from "./VariablesGlobales";
import { SafeAreaView, TouchableOpacity, View, Text, TextInput } from "react-native";
import { styles } from "./Styles";
import React from "react";
import { colors } from "./Colors";
import { BASE_URL } from "~/apiConfig";

const Settings = () => {
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [messageErreur, setMessageErreur] = useState('');


  const estConnecte = useAuthStore((state) => state.estConnecte);
  const setConnecte = useAuthStore((state) => state.setEstConnecte);
  const nomUtilisateur = useAuthStore((state) => state.nomUtilisateur);
  const setNomUtilisateur = useAuthStore((state) => state.setNomUtilisateur);
  const courrielUtilisateur = useAuthStore((state) => state.courrielUtilisateur);
  const setCourrielUtilisateur = useAuthStore((state) => state.setCourrielUtilisateur);  
  const telephoneUtilisateur = useAuthStore((state) => state.telephoneUtilisateur);
  const setTelephoneUtilisateur = useAuthStore((state) => state.setTelephoneUtilisateur);  
  const userId = useAuthStore((state) => state.userId);
  const setUserId = useAuthStore((state) => state.setUserId); 

    const updateUserInfos = async () => {
    
      try {
        const response = await fetch(`${BASE_URL}/api/auth/updateUserInfos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: userId,
            nom: nomUtilisateur,
            email: courrielUtilisateur,
            telephone: telephoneUtilisateur,
          }),
        });
    
        const data = await response.json();
    
        console.log("Réponse serveur:", data);
    
        if (!response.ok) {
          // Afficher message d'erreur du backend s’il existe
          const erreur = data.msg || JSON.stringify(data) || 'Erreur inconnue';
          throw new Error(erreur);
        }
    
        alert("Informations à jour!");
      } catch (error) {
        console.error("Erreur:", error);
        alert(`Erreur : ${error.message}`);
      }
    };
    
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredColumn}>
        {estConnecte ? (
          <>
            <Text style={styles.subtitle}>Réglages utilisateur</Text>

            <Text style={styles.smallText}>Nom:{nomUtilisateur}</Text>
            <Text style={styles.smallText}>Courriel:</Text>
            <TextInput
                      style={[styles.inputSettings, { color: colors.couleurTexteInverse }]}
                      onChangeText={setCourrielUtilisateur}
                      value={courrielUtilisateur}
                      placeholder=""
                      placeholderTextColor={colors.grisPrincipal}
                      keyboardType="default"
                      autoCapitalize="words"
                    />
            <Text style={styles.smallText}>Telephone:</Text>
            <TextInput
                      style={[styles.inputSettings, { color: colors.couleurTexteInverse }]}
                      onChangeText={setTelephoneUtilisateur}
                      value={telephoneUtilisateur}
                      placeholder=""
                      placeholderTextColor={colors.grisPrincipal}
                      keyboardType="default"
                      autoCapitalize="words"
                    />

            <TouchableOpacity style={styles.button} onPress={updateUserInfos}>
                          <Text style={styles.buttonText}>Mettre à jour les informations</Text>
                        </TouchableOpacity>

          </>
        ) : (
          <>
            <Text style={styles.title}>Ride/W</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Settings;