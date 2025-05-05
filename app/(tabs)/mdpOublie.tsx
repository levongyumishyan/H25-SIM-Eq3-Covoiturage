import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { couleurs } from "../fonctionalites/Couleurs";
import { styles } from "../fonctionalites/Styles";

export default function Index() {
  const [courriel, setCourriel] = useState('');

  const envoieCourrielVerif = () => { 
    {/*Envoie du courriel*/}
  };
  return (
      <View style={styles.container}>
        <View style={styles.centeredColumn}>
        <Text style={styles.title}>Courriel</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCourriel}
              value={courriel}
              placeholder="courriel@entreprise.ca"
              placeholderTextColor={couleurs.grisPrincipal}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={envoieCourrielVerif}>
              <Text style={styles.label}>Envoyer le lien</Text>
            </TouchableOpacity>
            </View>

          
          </View>

        </View>

    
  );

  
}
