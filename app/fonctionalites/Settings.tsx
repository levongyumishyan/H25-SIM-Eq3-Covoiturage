import { useState } from "react";
import { useAuthStore } from "./VariablesGlobales";
import { SafeAreaView, TouchableOpacity, View, Text, TextInput } from "react-native";
import { styles } from "./Styles";
import React from "react";
import { colors } from "./Colors";
import { BASE_URL } from "~/apiConfig";

const Settings = () => {
  const [editingNom, setEditingNom] = useState(false);
  const [editingCourriel, setEditingCourriel] = useState(false);
  const [editingTelephone, setEditingTelephone] = useState(false);

  const estConnecte = useAuthStore((state) => state.estConnecte);
  const setConnecte = useAuthStore((state) => state.setEstConnecte);
  const nomUtilisateur = useAuthStore((state) => state.nomUtilisateur);
  const setNomUtilisateur = useAuthStore((state) => state.setNomUtilisateur);
  const courrielUtilisateur = useAuthStore((state) => state.courrielUtilisateur);
  const setCourrielUtilisateur = useAuthStore((state) => state.setCourrielUtilisateur);
  const telephoneUtilisateur = useAuthStore((state) => state.telephoneUtilisateur);
  const setTelephoneUtilisateur = useAuthStore((state) => state.setTelephoneUtilisateur);
  const userId = useAuthStore((state) => state.userId);
  const setUserId = useAuthStore((state) => state.setUserId);

  const deconnection = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: courrielUtilisateur }),
      });

      const data = await response.json();
      console.log('Réponse du serveur :', data);
      setConnecte(false);
    } catch (error) {
      console.error('Erreur de déconnexion :', error);
    }
  };

  const updateUserInfos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/updateUserInfos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          nom: nomUtilisateur,
          email: courrielUtilisateur,
          telephone: telephoneUtilisateur,
        }),
      });

      const data = await response.json();
      console.log("Réponse serveur:", data);

      if (!response.ok) {
        const erreur = data.msg || JSON.stringify(data) || 'Erreur inconnue';
        throw new Error(erreur);
      }
      alert("Informations à jour!");
    } catch (error) {
      console.error("Erreur:", error);
      alert(`Erreur : ${error.message}`);
    }
  };

  return (
      <View style={styles.centeredColumn}>
        {estConnecte ? (
          <>
            <Text style={styles.subtitle}>Réglages utilisateur</Text>

            {/* NOM */}
            <TouchableOpacity onPress={() => setEditingNom(true)}>
              {editingNom ? (
                <TextInput
                  style={[styles.inputSettings, { color: colors.couleurTexteInverse }]}
                  onChangeText={setNomUtilisateur}
                  value={nomUtilisateur}
                  placeholder="Nom"
                  placeholderTextColor={colors.grisPrincipal}
                  onBlur={() => setEditingNom(false)}
                  autoFocus
                />
              ) : (
                <Text style={styles.subtitle}>Nom: {nomUtilisateur || "(Cliquez pour ajouter)"}</Text>
              )}
            </TouchableOpacity>

            {/* COURRIEL */}
            <TouchableOpacity onPress={() => setEditingCourriel(true)}>
              {editingCourriel ? (
                <TextInput
                  style={[styles.inputSettings, { color: colors.couleurTexteInverse }]}
                  onChangeText={setCourrielUtilisateur}
                  value={courrielUtilisateur}
                  placeholder="Courriel"
                  placeholderTextColor={colors.grisPrincipal}
                  keyboardType="email-address"
                  onBlur={() => setEditingCourriel(false)}
                  autoFocus
                />
              ) : (
                <Text style={styles.subtitle}>Courriel: {courrielUtilisateur || "(Cliquez pour ajouter)"}</Text>
              )}
            </TouchableOpacity>

            {/* TÉLÉPHONE */}
            <TouchableOpacity onPress={() => setEditingTelephone(true)}>
              {editingTelephone ? (
                <TextInput
                  style={[styles.inputSettings, { color: colors.couleurTexteInverse }]}
                  onChangeText={setTelephoneUtilisateur}
                  value={telephoneUtilisateur}
                  placeholder="Téléphone"
                  placeholderTextColor={colors.grisPrincipal}
                  keyboardType="phone-pad"
                  onBlur={() => setEditingTelephone(false)}
                  autoFocus
                />
              ) : (
                <Text style={styles.subtitle}>Téléphone: {telephoneUtilisateur || "(Cliquez pour ajouter)"}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={updateUserInfos}>
              <Text style={styles.buttonText}>Mettre à jour</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={deconnection}>
              <Text style={styles.buttonText}>Se déconnecter</Text>
            </TouchableOpacity>

          </>
        ) : (
          <Text style={styles.title}>Ride/W</Text>
        )}
      </View>
  );
};

export default Settings;
