import React, { useRef, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Styles';
import { colors } from './Colors';
import { BASE_URL } from '../apiConfig';
import { useAuthStore } from './VariablesGlobales';

const TrajetBottomSheet = ({ ride, pickupStreet, targetStreet, distanceKm, visible, onClose }) => {
  const sheetRef = useRef(null);
  const currentUserId = useAuthStore((state) => state.userId);
  const snapPoints = useMemo(() => ['65%'], []);

  const handleSheetChange = useCallback((index) => {
    if (index === -1) onClose?.();
  }, []);

  const handleJoinRide = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/trajets/${ride._id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.msg || 'Erreur lors de la planification');

      console.log('✅ Trajet rejoint avec succès:', result);
      Alert.alert('Succès', 'Vous avez rejoint ce trajet.');
      sheetRef.current?.close();
      onClose?.();
    } catch (err) {
      console.error('❌ Erreur lors de la requête de planification:', err.message);
      Alert.alert('Erreur', 'Impossible de rejoindre le trajet.');
    }
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChange}
    >
      <BottomSheetView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        {/* ✕ Close Button */}
        <TouchableOpacity
          onPress={() => sheetRef.current?.close()}
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}
        >
          <Ionicons name="close" size={24} color={colors.grisPrincipal} />
        </TouchableOpacity>

        <Text style={[styles.sousTitre, { marginTop: 20, color: colors.couleurTexteInverse }]}>
          Trajet proposé
        </Text>

        <Text style={[styles.petitTexte, { color: colors.couleurTexteInverse, marginBottom: 16 }]}>
          Proposé par {ride?.prenom || 'utilisateur inconnu'}
        </Text>

        <View style={{ marginBottom: 12 }}>
          <Text style={[styles.label, { color: colors.couleurTexteInverse }]}>Point de départ</Text>
          <Text style={[styles.petitTexte, { color: colors.couleurTexteInverse }]}>
            {pickupStreet || 'Adresse inconnue'}
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={[styles.label, { color: colors.couleurTexteInverse }]}>Destination</Text>
          <Text style={[styles.petitTexte, { color: colors.couleurTexteInverse }]}>
            {targetStreet || 'Adresse inconnue'}
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.label, { color: colors.couleurTexteInverse }]}>Distance</Text>
          <Text style={[styles.petitTexte, { color: colors.couleurTexteInverse }]}>
            {distanceKm ? `${distanceKm.toFixed(1)} km` : 'Distance inconnue'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.bouton} onPress={handleJoinRide}>
            <Text style={[styles.boutonTexte, { color: colors.couleurTexteInverse }]}>
              Rejoindre ce trajet
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default TrajetBottomSheet;
