import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, ScrollView, Platform, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { couleurs } from './Couleurs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './Styles';
import Checkbox from 'expo-checkbox';
import { BASE_URL } from '../apiConfig';
import { Link } from 'expo-router';

const Inscription = () => {
  //Variables de l'utilisateur
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [dateNaissance, setDateNaissance] = useState(new Date(1970, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [telephone, setTelephone] = useState("");
  const [courriel, setCourriel] = useState("");
  const [mdp, setMdp] = useState("");
  const [mdpVerif, setMdpVerif] = useState("");

  // Variables pour savoir si l'utilisateur
  // veut être un passager ou conducteur
  const [conducteur, setConducteur] = useState(false);
  const [passager, setPassager] = useState(false);

  //Variables de la voiture (si l'utilisateur est un conducteur)
  const [modeleVoiture, setModeleVoiture] = useState("");
  const [anneeVoiture, setAnneeVoiture] = useState("");
  const [consommationVoiture, setConsommationVoiture] = useState("");


  /**
   * Permet à l'utilisateur de sélectionner une date étant
   * donné que ce n'est pas une chaîne (String)
   * @param event 
   * @param selectedDate La date selectionnée
   */
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDateNaissance(selectedDate);
    }
  };



  /**
   * Envoie au serveur du backend les informations de
   * l'utilisateur du formulaire d'inscription.
   * @returns 
   */
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
        const erreur = data.msg || JSON.stringify(data) || "Erreur inconnue";
        throw new Error(erreur);
      }

      alert("Inscription réussie !");
    } catch (error) {
      console.error("Erreur:", error);
      alert(`Erreur : ${error.message}`);
    }
  };



  // Apparence du formulaire d'inscription
  return (
    <ScrollView style={styles.scrollContainer}>
      <SafeAreaView style={styles.colonneCentree}>
        <View style={styles.ligneCentree}>
          <Text style={styles.titre}>Créer un compte</Text>
        </View>
        <View style={styles.linksContainer}>
          <Link href="../(tabs)/account" style={styles.texteAvecLien}>
            J'ai déjà un compte!
          </Link>
          <Link href="../(tabs)/" style={styles.texteAvecLien}>
            Retour
          </Link>
        </View>

        <Text style={styles.sousTitre}>Prénom</Text>
        <TextInput
          style={[styles.input, { color: couleurs.couleurTexteInverse }]}
          onChangeText={setPrenom}
          value={prenom}
          placeholder=""
          placeholderTextColor={couleurs.grisPrincipal}
          keyboardType="default"
          autoCapitalize="words"
        />

        <Text style={styles.sousTitre}>Nom</Text>
        <TextInput
          style={[styles.input, { color: couleurs.couleurTexteInverse }]}
          onChangeText={setNom}
          value={nom}
          placeholder=""
          placeholderTextColor={couleurs.grisPrincipal}
          keyboardType="default"
          autoCapitalize="words"
        />

        <Text style={styles.sousTitre}>Date de naissance</Text>
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

        <Text style={styles.sousTitre}>Téléphone</Text>
        <TextInput
          style={[styles.input, { color: couleurs.couleurTexteInverse }]}
          onChangeText={setTelephone}
          value={telephone}
          placeholder="(514) 666-6666"
          placeholderTextColor={couleurs.grisPrincipal}
          keyboardType="numeric"
          autoCapitalize="none"
        />

        <Text style={styles.sousTitre}>Courriel</Text>
        <TextInput
          style={[styles.input, { color: couleurs.couleurTexteInverse }]}
          onChangeText={setCourriel}
          value={courriel}
          placeholder="courriel@entreprise.ca"
          placeholderTextColor={couleurs.grisPrincipal}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.sousTitre}>Mot de passe</Text>
        <TextInput
          style={[styles.input, { color: couleurs.couleurTexteInverse }]}
          onChangeText={setMdp}
          value={mdp}
          placeholder="**********"
          placeholderTextColor={couleurs.grisPrincipal}
          secureTextEntry
        />

        <Text style={styles.sousTitre}>Vérifier votre mot de passe</Text>
        <TextInput
          style={[styles.input, { color: couleurs.couleurTexteInverse }]}
          onChangeText={setMdpVerif}
          value={mdpVerif}
          placeholder="**********"
          placeholderTextColor={couleurs.grisPrincipal}
          secureTextEntry
        />

        <Text style={styles.sousTitre}>Sélectionner votre rôle</Text>
        <Text style={styles.labelLeft}>
          Vous pourrez toujours changer en cours de route :)
        </Text>

        <View style={styles.checkboxContainer}>
          {!passager && (
            <View style={styles.checkboxItem}>
              <Text style={styles.sousTitre}>Conducteur</Text>
              <Checkbox
                value={conducteur}
                onValueChange={(val) => {
                  setConducteur(val);
                  if (val) setPassager(false);
                }}
                color={conducteur ? couleurs.vertPrincipal : undefined}
              />
            </View>
          )}

          {!conducteur && (
            <View style={styles.checkboxItem}>
              <Text style={styles.sousTitre}>Passager</Text>
              <Checkbox
                value={passager}
                onValueChange={(val) => {
                  setPassager(val);
                  if (val) setConducteur(false);
                }}
                color={passager ? couleurs.vertPrincipal : undefined}
              />
            </View>
          )}

          {conducteur && (
            <View style={styles.voitureContainer}>
              <Text style={styles.sousTitre}>Modèle de voiture</Text>
              <TextInput
                style={styles.input}
                onChangeText={setModeleVoiture}
                value={modeleVoiture}
                placeholder=""
                placeholderTextColor={couleurs.grisPrincipal}
              />

              <Text style={styles.sousTitre}>Année</Text>
              <TextInput
                style={styles.input}
                onChangeText={setAnneeVoiture}
                value={anneeVoiture}
                placeholder=""
                placeholderTextColor={couleurs.grisPrincipal}
                keyboardType="numeric"
              />

              <Text style={styles.sousTitre}>
                Consommation moyenne en carburant
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setConsommationVoiture}
                value={consommationVoiture}
                placeholder=""
                placeholderTextColor={couleurs.grisPrincipal}
                keyboardType="numeric"
              />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.bouton} onPress={verifierConnection}>
          <Text style={styles.boutonTexte}>S'inscrire</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Text>{"\n".repeat(10)}</Text>
    </ScrollView>
  );
};

export default Inscription;
