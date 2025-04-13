import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { couleurs } from '../fonctionalites/Couleurs';

export default function Index() {
  const [courriel, setCourriel] = useState('');

  const palette = couleurs();

  const envoieCourrielVerif = () => { 
    {/*Envoie du courriel*/}
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.arrierePlan,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      width: "100%",
    },
    label: {
      alignSelf: 'flex-start',
      fontSize: 16,
      fontWeight: 'bold',
      color: palette.couleurTexte,
      marginBottom: 6,
    },
    input: {  
      width: '100%',
      height: 50,
      backgroundColor: palette.grisPrincipal,
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: 16,
      color: palette.couleurTexte,
      borderWidth: 1,
      borderColor: palette.grisPrincipal,
      marginBottom: 12,
    },
    linksContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    link: {
      color: palette.vertPrincipal,
      fontWeight: 'bold',
      fontSize: 14,
    },
    button: {
      width: '100%',
      backgroundColor: palette.vertPrincipal,
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
      color: palette.couleurTexte,
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Courriel</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCourriel}
              value={courriel}
              placeholder="courriel@entreprise.ca"
              placeholderTextColor={palette.grisPrincipal}
              keyboardType="email-address"
              autoCapitalize="none"
            />
      
      
      
            <TouchableOpacity style={styles.button} onPress={envoieCourrielVerif}>
              <Text style={styles.buttonText}>Envoyer le lien de réinitialisation</Text>
            </TouchableOpacity>
          </SafeAreaView>
    </View>

    
  );

  
}
