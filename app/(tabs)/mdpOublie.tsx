import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { colors } from "../fonctionalites/Colors";
import { styles } from "../fonctionalites/Styles";
import { Link } from "expo-router";

export default function Index() {
  const [courriel, setCourriel] = useState('');

  const envoieCourrielVerif = () => {
    {/*Envoie du courriel, la fonction n'est pas disponible étant donné qu'il aurait fallu créer un e-mail de compagnie pour pouvoir recevoir et envoyer*/ }
    alert("Un courriel vous sera envoyé. Sinon, contactez le support de Ride/W.");
  };
  return (
    <View style={styles.container}>
      <View style={styles.colonneCentree}>
        <Text style={styles.titre}>Courriel</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCourriel}
          value={courriel}
          placeholder="courriel@entreprise.ca"
          placeholderTextColor={colors.grisPrincipal}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.bouton} onPress={envoieCourrielVerif}>
            <Text style={styles.label}>Envoyer le lien</Text>
          </TouchableOpacity>
        </View>
        <Link href="../(tabs)/" style={styles.linkText}>
          Retour
        </Link>
      </View>
    </View>
  );
}