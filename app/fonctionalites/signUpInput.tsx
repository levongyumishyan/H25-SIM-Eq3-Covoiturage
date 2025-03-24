import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './colors';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';

const SignUpInput = () => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [dateNaissance, setDateNaissance] = useState(new Date(1970,0,1));
  const [genre, setGenre] = useState(""); 

  const [telephone, setTelephone] = useState('');
  const [courriel, setCourriel] = useState('');
  const [mdp, setMdp] = useState('');
  const [mdpVerif, setMdpVerif] = useState('');

  const [conducteur, setConducteur] = useState(false); 
  const [passager, setPassager] = useState(false); 

  const [modeleVoiture, setModeleVoiture] = useState(''); 
  const [anneeVoiture, setAnneeVoiture] = useState('');
  const [kilometrageVoiture, setKilometrageVoiture] = useState('');
 
  const[adresse, setAdresse] = useState("");
  const[ville, setVille] = useState("");
  const[province, setProvince] = useState("");
  const[codePostal, setCodePostal] = useState("");

  const[urgencePrenom, setUrgencePrenom] = useState("");
  const[urgenceNom, setUrgenceNom] = useState("");
  const[urgenceTelephone, setUrgenceTelephone] = useState("");

  const[exclusiviteCourriel, setExclusiviteCourriel] = useState(false);

  const[userID, setUserID] = useState("");
  const[dateInscription, setDateInscription] = useState(Date.now());
  
  const onChangeDate = (event: DateTimePickerEvent, dateNaissance?: Date) => {
    if (dateNaissance) {
      setDateNaissance(dateNaissance);
    }
  };

  // Vérification avec la userbase (Placeholder logic)
  const verifierConnection = async () => { 
    try {
      const response = await fetch("http://" + "192.168.2.16" + ":5001/api/auth/signup", { //Changer à votre local IP /ipconfig sous Windows
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
          prenom: prenom,
          email: courriel,
          mdp: mdp,
        }),
      });
  
      const data = await response.json();
  
      console.log("Réponse du serveur :", data);
    } catch (error) {
      console.error("Erreur de connexion :", error);
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
      <DateTimePicker
        value={dateNaissance}
        mode="date"
        onChange={onChangeDate}
        maximumDate={new Date()} 
        minimumDate={new Date(1900,0,1)}
        /*display="spinner"*/
        />

        <Text style={styles.label}>Téléphone</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTelephone}
                value={telephone}
                placeholder="(514) 666-6666"
                placeholderTextColor={colors.grisPrincipal}
                keyboardType="numeric"
                autoCapitalize="none"
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
      <Text style={styles.label}>Sélectionner votre rôle</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}> Conducteur  </Text>
        <Checkbox
            value={conducteur}
            onValueChange={setConducteur} 
            color={conducteur ? colors.vertPrincipal : undefined}
            />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}> Passager  </Text>
        <Checkbox
            value={passager}
            onValueChange={setPassager} 
            color={passager ? colors.vertPrincipal : undefined}
            />
      </View>
      
      {conducteur && (
        
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Modèle de voiture</Text>
            <TextInput
                style={styles.input}
                onChangeText={setModeleVoiture}
                value={modeleVoiture}
                placeholder=""
                placeholderTextColor={colors.grisPrincipal}
                keyboardType="default"
                autoCapitalize="none"
            />
            <Text style={styles.label}>Année</Text>
            <TextInput
                style={styles.input}
                onChangeText={setAnneeVoiture}
                value={anneeVoiture}
                placeholder=""
                placeholderTextColor={colors.grisPrincipal}
                keyboardType="numeric"
                autoCapitalize="none"
            />
            <Text style={styles.label}>Kilométrage</Text>
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
  section: {
    flexDirection: 'row',
    alignItems: 'center',
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
