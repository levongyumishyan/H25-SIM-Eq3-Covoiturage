import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./Styles";
import { colors } from "./Colors";
import { BASE_URL } from "~/apiConfig";
import { useAuthStore } from "./VariablesGlobales";
import logo from "../assets/images/logo.png";


//format pour l'affichage du numéro de téléphone standardisé
const formatPhone = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const Settings = () => {
  //Global
  const {
    estConnecte,
    setEstConnecte,
    userId,
    prenomUtilisateur,
    nomUtilisateur,
    courrielUtilisateur,
    telephoneUtilisateur,
    setPrenomUtilisateur,
    setNomUtilisateur,
    setCourrielUtilisateur,
    setTelephoneUtilisateur,
    setUserId
  } = useAuthStore();

  //Local
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [editingField, setEditingField] = useState(null);
  //Modification de ces dernières
  useEffect(() => {
    setPrenom(prenomUtilisateur || "");
    setNom(nomUtilisateur || "");
    setEmail(courrielUtilisateur || "");
    setTelephone(telephoneUtilisateur || "");
  }, []);


  //Enregistrement des nouvelles informations utilisateur (backend)
  const handleSave = async () => {
    if (!userId) {
      alert("Erreur : utilisateur non identifié.");
      return;
    }

    const payload = {
      id: userId,
      prenom,
      nom,
      email,
      telephone,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/auth/updateUserInfos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Erreur inconnue");

      setPrenomUtilisateur(prenom);
      setNomUtilisateur(nom);
      setCourrielUtilisateur(email);
      setTelephoneUtilisateur(telephone);

      alert("Informations mises à jour !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des données:", error);
      alert(`Erreur : ${error.message}`);
    }
  };


  //Déconnection
  const handleLogout = async () => {
    setEstConnecte(false);
    setPrenomUtilisateur('');
    setNomUtilisateur('');
    setCourrielUtilisateur('');
    setTelephoneUtilisateur('');
    setUserId(null);

    alert("Déconnexion réussie.");
  };


  //Affichage de chacunes des informations modifiables
  const renderField = (label, value, setValue, fieldKey, keyboardType = "default") => {
    const isEditing = editingField === fieldKey;
    const formattedValue =
      fieldKey === "telephone" && !isEditing ? formatPhone(value) : value;

    const handleTextChange = (text) => {
      if (fieldKey === "telephone") {
        const cleaned = text.replace(/\D/g, "");
        setValue(cleaned);
      } else {
        setValue(text);
      }
    };

    return (
      <TouchableOpacity
        onPress={() => setEditingField(fieldKey)}
        activeOpacity={0.9}
        style={{ width: "100%", marginBottom: 15 }}
      >
        {isEditing ? (
          <TextInput
            autoFocus
            style={[styles.inputSettings, { color: colors.couleurTexteInverse }]}
            value={formattedValue}
            onChangeText={handleTextChange}
            keyboardType={keyboardType}
            onBlur={() => setEditingField(null)}
            placeholder={label}
            placeholderTextColor={colors.grisPrincipal}
          />
        ) : (
          <View>
            <Text style={[styles.labelLeft, { color: colors.couleurTexteInverse }]}>
              {label}
            </Text>
            <Text style={[styles.petitTexte, { color: colors.couleurTexteInverse }]}>
              {formattedValue || "(Cliquez pour ajouter)"}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };


  //PAGE
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.colonneCentree, { paddingVertical: 30 }]}>
        <Image
          source={logo}
          style={{
            alignContent: 'center',
            width: 280,
            height: 280,
            top: -120,
            resizeMode: 'contain',
            marginBottom: -300,
          }}
        />

        <View style={styles.card}>
          <Text style={[styles.sousTitre, { color: colors.couleurTexteInverse, marginBottom: 20 }]}>
            Réglages utilisateur
          </Text>

          {renderField("Prénom", prenom, setPrenom, "prenom")}
          {renderField("Nom", nom, setNom, "nom")}
          {renderField("Courriel", email, setEmail, "email", "email-address")}
          {renderField("Téléphone", telephone, setTelephone, "telephone", "phone-pad")}

          <View style={{ marginBottom: 15 }}>
            <TouchableOpacity style={styles.bouton} onPress={handleSave}>
              <Text style={styles.boutonTexte}>💾 Sauvegarder</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.bouton} onPress={handleLogout}>
              <Text style={styles.boutonTexte}>🚪 Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
