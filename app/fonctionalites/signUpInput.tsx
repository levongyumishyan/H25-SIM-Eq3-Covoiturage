import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './colors';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const SignUpInput = () => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const setDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: {timestamp, utcOffset},
    } = event;
  };
  
  
  const [conducteur, setConducteur] = useState(''); 
  const [passager, setPassager] = useState(''); 
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [mdpVerif, setMdpVerif] = useState('');

  // Vérification avec la userbase (Placeholder logic)
  const verifierConnection = () => { 
    if ((mdp == mdpVerif) && (mdp != null && mdp != "")) {
      alert("Connexion réussie!");
    } else {
      alert("Les deux mots de passe ne sont pas identiques ou manquants");
    }
  };

  return (
    <ScrollView>
        <SafeAreaView style={styles.container}>
        <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPrenom}
        value={prenom}
        placeholder=""
        placeholderTextColor={colors.grisPrincipal}
        keyboardType="default"
        autoCapitalize="words"
      />
      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNom}
        value={nom}
        placeholder=""
        placeholderTextColor={colors.grisPrincipal}
        keyboardType="default"
        autoCapitalize="words"
      />

      <Text style={styles.label}>Date de naissance</Text>   
      <RNDateTimePicker 
        value={new Date()} 
        onChange={setDate}
        maximumDate={new Date()} 
        minimumDate={new Date(1900,0,1)}
        display="spinner"
        />

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
      <Text style={styles.label}>Vérifier votre mot de passe</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMdpVerif}
        value={mdpVerif}
        placeholder="**********"
        placeholderTextColor={colors.grisPrincipal}
        secureTextEntry
      />



      <TouchableOpacity style={styles.button} onPress={verifierConnection}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </SafeAreaView>
    <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
    </ScrollView>
    
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

export default SignUpInput;
