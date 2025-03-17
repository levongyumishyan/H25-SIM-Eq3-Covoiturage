import { Link } from 'expo-router';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  View, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../fonctionalites/colors';
import { styles } from '../fonctionalites/styles';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const SignUpInput = () => {
  // State for form fields
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [mdpVerif, setMdpVerif] = useState('');
  const [dateNaissance, setDateNaissance] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle date change
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDateNaissance(selectedDate);
      setShowDatePicker(false); // Hide picker after selection
    }
  };

  // Vérification avec la userbase (Placeholder logic)
  const verifierConnection = () => { 
    if ((mdp === mdpVerif) && mdp !== "") {
      alert("Connexion réussie!");
    } else {
      alert("Les deux mots de passe ne sont pas identiques ou manquants");
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPrenom}
          value={prenom}
          placeholder="Entrez votre prénom"
          placeholderTextColor={colors.grisPrincipal}
          keyboardType="default"
          autoCapitalize="words"
        />

        {/* Nom Input */}
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNom}
          value={nom}
          placeholder="Entrez votre nom"
          placeholderTextColor={colors.grisPrincipal}
          keyboardType="default"
          autoCapitalize="words"
        />

        {/* Date of Birth Picker */}
        <Text style={styles.label}>Date de naissance</Text>
        <TouchableOpacity 
          style={styles.dateButton} 
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {dateNaissance.toLocaleDateString('fr-FR')}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <RNDateTimePicker
            value={dateNaissance} 
            onChange={handleDateChange}
            maximumDate={new Date()} 
            minimumDate={new Date(1900, 0, 1)}
            mode="date"
            display="spinner"
          />
        )}

        {/* Email Input */}
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

        {/* Password Inputs */}
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

        {/* Sign-Up Button */}
        <TouchableOpacity style={styles.button} onPress={verifierConnection}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpInput;
