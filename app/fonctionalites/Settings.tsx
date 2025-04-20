import { useState } from "react";
import { useAuthStore } from "./VariablesGlobales";
import { SafeAreaView, TouchableOpacity, View, Text, TextInput } from "react-native";
import { styles } from "./Styles";
import React from "react";
import { colors } from "./Colors";

const Settings = () => {
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [messageErreur, setMessageErreur] = useState('');


  const estConnecte = useAuthStore((state) => state.estConnecte);
  const setConnecte = useAuthStore((state) => state.setEstConnecte);
  const nomUtilisateur = useAuthStore((state) => state.nomUtilisateur);
  const setNomUtilisateur = useAuthStore((state) => state.setNomUtilisateur);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredColumn}>
        {estConnecte ? (
          <>
            <Text style={styles.subtitle}>Réglages utilisateur</Text>
            <Text style={styles.smallText}>{nomUtilisateur}</Text>
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