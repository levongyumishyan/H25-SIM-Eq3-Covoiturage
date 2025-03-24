import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import {styles} from '../fonctionalites/styles'
import Checkbox from 'expo-checkbox';

const SignUpInput = () => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [dateNaissance, setDateNaissance] = useState(new Date(1970, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [telephone, setTelephone] = useState('');
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [mdpVerif, setMdpVerif] = useState('');

  const [conducteur, setConducteur] = useState(false);
  const [passager, setPassager] = useState(false);

  const [modeleVoiture, setModeleVoiture] = useState('');
  const [anneeVoiture, setAnneeVoiture] = useState('');
  const [kilometrageVoiture, setKilometrageVoiture] = useState('');

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // On iOS, keep showing; on Android, hide after selection
    if (selectedDate) {
      setDateNaissance(selectedDate);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.subtitle}>Prénom</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPrenom}
          value={prenom}
          placeholder=""
          placeholderTextColor={colors.grisPrincipal}
          keyboardType="default"
          autoCapitalize="words"
        />

        <Text style={styles.subtitle}>Nom</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNom}
          value={nom}
          placeholder=""
          placeholderTextColor={colors.grisPrincipal}
          keyboardType="default"
          autoCapitalize="words"
        />

        <Text style={styles.subtitle}>Date de naissance</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.datePickerText}>
            {dateNaissance.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dateNaissance}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
          />
        )}

        <Text style={styles.subtitle}>Téléphone</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTelephone}
          value={telephone}
          placeholder="(514) 666-6666"
          placeholderTextColor={colors.grisPrincipal}
          keyboardType="numeric"
          autoCapitalize="none"
        />

        <Text style={styles.subtitle}>Courriel</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCourriel}
          value={courriel}
          placeholder="courriel@entreprise.ca"
          placeholderTextColor={colors.grisPrincipal}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.subtitle}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMdp}
          value={mdp}
          placeholder="**********"
          placeholderTextColor={colors.grisPrincipal}
          secureTextEntry
        />

        <Text style={styles.subtitle}>Vérifier votre mot de passe</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMdpVerif}
          value={mdpVerif}
          placeholder="**********"
          placeholderTextColor={colors.grisPrincipal}
          secureTextEntry
        />

        <Text style={styles.subtitle}>Sélectionner votre rôle</Text>

        <View style={styles.container}>
          <Text style={styles.subtitle}>Conducteur</Text>
          <Checkbox
            value={conducteur}
            onValueChange={setConducteur}
            color={conducteur ? colors.vertPrincipal : undefined}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitle}>Passager</Text>
          <Checkbox
            value={passager}
            onValueChange={setPassager}
            color={passager ? colors.vertPrincipal : undefined}
          />
        </View>

        {conducteur && (
          <SafeAreaView style={styles.container}>
            <Text style={styles.subtitle}>Modèle de voiture</Text>
            <TextInput
              style={styles.input}
              onChangeText={setModeleVoiture}
              value={modeleVoiture}
              placeholder=""
              placeholderTextColor={colors.grisPrincipal}
              keyboardType="default"
              autoCapitalize="none"
            />

            <Text style={styles.subtitle}>Année</Text>
            <TextInput
              style={styles.input}
              onChangeText={setAnneeVoiture}
              value={anneeVoiture}
              placeholder=""
              placeholderTextColor={colors.grisPrincipal}
              keyboardType="numeric"
              autoCapitalize="none"
            />

            <Text style={styles.subtitle}>Kilométrage</Text>
            <TextInput
              style={styles.input}
              onChangeText={setKilometrageVoiture}
              value={kilometrageVoiture}
              placeholder=""
              placeholderTextColor={colors.grisPrincipal}
              keyboardType="numeric"
              autoCapitalize="none"
            />
          </SafeAreaView>
        )}

        <TouchableOpacity style={styles.button} onPress={() => alert('Formulaire prêt à soumettre')}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Text>{"\n".repeat(10)}</Text>
    </ScrollView>
  );
};

export default SignUpInput;
