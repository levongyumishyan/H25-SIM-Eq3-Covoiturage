import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './Styles';
import { BASE_URL } from '../apiConfig';
import { useAuthStore } from './VariablesGlobales';

const Trajet = ({ ride, pickupStreet, targetStreet, onClose }) => {
  const currentUserId = useAuthStore((state) => state.userId);

  const handleJoinRide = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/trajets/${ride._id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUserId }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.msg || 'Erreur lors de la planification');

      console.log('✅ Trajet rejoint avec succès:', result);

      Alert.alert('Succès', 'Vous avez rejoint ce trajet.');

      onClose(); // ✅ Close bottom sheet
    } catch (err) {
      console.error('❌ Erreur lors de la requête de planification:', err.message);
      Alert.alert('Erreur', err.message || 'Impossible de rejoindre le trajet.');
    }
  };

  return (
    <View style={[styles.card, { borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: 0 }]}>
      <Text style={styles.sousTitre}>Trajet trouvé</Text>

      <View style={{ marginBottom: 12 }}>
        <Text style={styles.label}>Départ</Text>
        <Text style={styles.petitTexte}>{pickupStreet || 'Adresse inconnue'}</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={styles.labelInverseCentered}>Destination</Text>
        <Text style={styles.petitTexte}>{targetStreet || 'Adresse inconnue'}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bouton} onPress={handleJoinRide}>
          <Text style={styles.boutonTexte}>Rejoindre ce trajet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.bouton, styles.contourBouton]} onPress={onClose}>
          <Text style={[styles.boutonTexte, styles.contourBoutonTexte]}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Trajet;
