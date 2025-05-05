import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './Styles';
import Checkbox from 'expo-checkbox';
import { BASE_URL } from '../apiConfig';
import { Link } from 'expo-router';

const SignUpInput = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [dateNaissance, setDateNaissance] = useState(new Date(1970, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [telephone, setTelephone] = useState("");
  const [courriel, setCourriel] = useState("");
  const [mdp, setMdp] = useState("");
  const [mdpVerif, setMdpVerif] = useState("");

  const [conducteur, setConducteur] = useState(false);
  const [passager, setPassager] = useState(false);

  const [modeleVoiture, setModeleVoiture] = useState("");
  const [anneeVoiture, setAnneeVoiture] = useState("");
  const [consommationVoiture, setConsommationVoiture] = useState("");

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios"); // Keep open on iOS
    if (selectedDate) {
      setDateNaissance(selectedDate);
    }
  };

  const verifierConnection = async () => {
    if (mdp !== mdpVerif) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom,
          prenom,
          email: courriel,
          mdp,
          dateNaissance,
          telephone,
          conducteur,
          passager,
          modeleVoiture,
          anneeVoiture,
          consommationVoiture,
        }),
      });

      const data = await response.json();

      console.log("Réponse serveur:", data);

      if (!response.ok) {
        // Afficher message d'erreur du backend s’il existe
        const erreur = data.msg || JSON.stringify(data) || "Erreur inconnue";
        throw new Error(erreur);
      }

      alert("Inscription réussie !");
    } catch (error) {
      console.error("Erreur:", error);
      alert(`Erreur : ${error.message}`);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <SafeAreaView style={styles.centeredColumn}>
        <View style={styles.centeredRow}>
          <Text style={styles.title}>Créer un compte</Text>
        </View>
        <View style={styles.linksContainer}>
          <Link href="../(tabs)/account" style={styles.linkText}>
            J'ai déjà un compte!
          </Link>
          <Link href="../(tabs)/" style={styles.linkText}>
            Retour
          </Link>
        </View>

        <Text style={styles.subtitle}>Prénom</Text>
        <TextInput
          style={[styles.input, { color: colors.couleurTexteInverse }]}
          onChangeText={setPrenom}
          value={prenom}
          placeholder=""
          placeholderTextColor={colors.grisPrincipal}
          keyboardType="default"
          autoCapitalize="words"
        />

        <Text style={styles.subtitle}>Nom</Text>
        <TextInput
          style={[styles.input, { color: colors.couleurTexteInverse }]}
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
            display="spinner"
            onChange={handleDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
          />
        )}

        <Text style={styles.subtitle}>Téléphone</Text>
        <TextInput
          style={[styles.input, { color: colors.couleurTexteInverse }]}
          onChangeText={setTelephone}
          value={telephone}
          placeholder="(514) 666-6666"
          placeholderTextColor={colors.grisPrincipal}
          keyboardType="numeric"
          autoCapitalize="none"
        />

        <Text style={styles.subtitle}>Courriel</Text>
        <TextInput
          style={[styles.input, { color: colors.couleurTexteInverse }]}
          onChangeText={setCourriel}
          value={courriel}
          placeholder="courriel@entreprise.ca"
          placeholderTextColor={colors.grisPrincipal}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.subtitle}>Mot de passe</Text>
        <TextInput
          style={[styles.input, { color: colors.couleurTexteInverse }]}
          onChangeText={setMdp}
          value={mdp}
          placeholder="**********"
          placeholderTextColor={colors.grisPrincipal}
          secureTextEntry
        />

        <Text style={styles.subtitle}>Vérifier votre mot de passe</Text>
        <TextInput
          style={[styles.input, { color: colors.couleurTexteInverse }]}
          onChangeText={setMdpVerif}
          value={mdpVerif}
          placeholder="**********"
          placeholderTextColor={colors.grisPrincipal}
          secureTextEntry
        />

        <Text style={styles.subtitle}>Sélectionner votre rôle</Text>
        <Text style={styles.labelLeft}>
          Vous pourrez toujours changer en cours de route :)
        </Text>

        <View style={styles.checkboxContainer}>
          {!passager && (
            <View style={styles.checkboxItem}>
              <Text style={styles.subtitle}>Conducteur</Text>
              <Checkbox
                value={conducteur}
                onValueChange={(val) => {
                  setConducteur(val);
                  if (val) setPassager(false);
                }}
                color={conducteur ? colors.vertPrincipal : undefined}
              />
            </View>
          )}

          {!conducteur && (
            <View style={styles.checkboxItem}>
              <Text style={styles.subtitle}>Passager</Text>
              <Checkbox
                value={passager}
                onValueChange={(val) => {
                  setPassager(val);
                  if (val) setConducteur(false);
                }}
                color={passager ? colors.vertPrincipal : undefined}
              />
            </View>
          )}

          {conducteur && (
            <View style={styles.voitureContainer}>
              <Text style={styles.subtitle}>Modèle de voiture</Text>
              <TextInput
                style={styles.input}
                onChangeText={setModeleVoiture}
                value={modeleVoiture}
                placeholder=""
                placeholderTextColor={colors.grisPrincipal}
              />

              <Text style={styles.subtitle}>Année</Text>
              <TextInput
                style={styles.input}
                onChangeText={setAnneeVoiture}
                value={anneeVoiture}
                placeholder=""
                placeholderTextColor={colors.grisPrincipal}
                keyboardType="numeric"
              />

              <Text style={styles.subtitle}>
                Consommation moyenne en carburant
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setConsommationVoiture}
                value={consommationVoiture}
                placeholder=""
                placeholderTextColor={colors.grisPrincipal}
                keyboardType="numeric"
              />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={verifierConnection}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Text>{"\n".repeat(10)}</Text>
    </ScrollView>
  );
};

export default SignUpInput;
