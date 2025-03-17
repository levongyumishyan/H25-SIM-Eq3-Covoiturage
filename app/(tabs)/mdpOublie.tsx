import { Text, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { colors } from "../fonctionalites/colors";
import { styles } from "../fonctionalites/styles"

export default function Index() {
  const [courriel, setCourriel] = useState('');

  const envoieCourrielVerif = () => { 
    {/*Envoie du courriel*/}
  };

  return (
    <SafeAreaView style={styles.container}>
         <Text style={styles.title}>Entrez votre courriel</Text>
         <TextInput
           style={styles.input}
           onChangeText={setCourriel}
           value={courriel}
           placeholder="courriel@entreprise.ca"
           placeholderTextColor={colors.couleurTexte}
           keyboardType="email-address"
           autoCapitalize="none"></TextInput>
        <TouchableOpacity style={styles.button} onPress={envoieCourrielVerif}>
        <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
        
      </SafeAreaView>
    
  );

  
}
  