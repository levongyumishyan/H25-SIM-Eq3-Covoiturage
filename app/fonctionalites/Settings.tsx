import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "./Styles";
import { colors } from "./Colors";
import { BASE_URL } from "~/apiConfig";
import { useAuthStore } from "./VariablesGlobales";

// Format phone number like (514) 123-4567
const formatPhone = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const Settings = () => {
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
  } = useAuthStore();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    console.log("🧠 Auth context loaded:", {
      userId,
      prenomUtilisateur,
      nomUtilisateur,
      courrielUtilisateur,
      telephoneUtilisateur,
    });

    setPrenom(prenomUtilisateur || "");
    setNom(nomUtilisateur || "");
    setEmail(courrielUtilisateur || "");
    setTelephone(telephoneUtilisateur || "");
  }, []);

  const handleSave = async () => {
    if (!userId) {
      console.error("❌ Cannot save: userId is undefined.");
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

    console.log("📤 Sending payload:", payload);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/updateUserInfos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("✅ Server response:", res.status, data);

      if (!res.ok) throw new Error(data.msg || "Erreur inconnue");

      // Sync global state on success
      setPrenomUtilisateur(prenom);
      setNomUtilisateur(nom);
      setCourrielUtilisateur(email);
      setTelephoneUtilisateur(telephone);

      alert("✅ Informations mises à jour !");
    } catch (error) {
      console.error("❌ Error saving:", error);
      alert(`Erreur : ${error.message}`);
    }
  };

  const handleLogout = async () => {
    if (!email) {
      alert("Adresse courriel introuvable pour la déconnexion.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("🚪 Logout response:", res.status, data);

      if (!res.ok) throw new Error(data.msg || "Échec de la déconnexion");

      setEstConnecte(false);
      alert("Déconnexion réussie.");
    } catch (e) {
      console.error("❌ Logout failed:", e.message);
      alert("Erreur de déconnexion");
    }
  };

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

  if (!estConnecte) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.colonneCentree}>
          <Text style={[styles.titre, { color: colors.couleurTexteInverse }]}>
            Ride/W
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.colonneCentree, { paddingVertical: 30 }]}>
        <View style={[styles.card, { width: "100%", maxWidth: 500 }]}>
          <Text style={[styles.sousTitre, { color: colors.couleurTexteInverse, marginBottom: 20 }]}>
            Réglages utilisateur
          </Text>

          {renderField("Prénom", prenom, setPrenom, "prenom")}
          {renderField("Nom", nom, setNom, "nom")}
          {renderField("Courriel", email, setEmail, "email", "email-address")}
          {renderField("Téléphone", telephone, setTelephone, "telephone", "phone-pad")}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bouton} onPress={handleSave}>
              <Text style={styles.boutonTexte}>💾 Sauvegarder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bouton, styles.contourBouton]}
              onPress={handleLogout}
            >
              <Text
                style={[
                  styles.boutonTexte,
                  styles.contourBoutonTexte,
                  { color: colors.couleurTexteInverse },
                ]}
              >
                🚪 Se déconnecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
