import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Styles';
import { couleurs } from './Couleurs';
import { BASE_URL } from '../apiConfig';
import { useAuthStore } from './VariablesGlobales';

const TrajetBottomSheet = ({ ride, visible, onClose }) => {
  const sheetRef = useRef(null);
  const currentUserId = useAuthStore((state) => state.userId);
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const handleSheetChange = useCallback((index) => {
    if (index === -1) onClose?.();
  }, []);

  /**
   * Avertit le serveur du backend qu'un utilisateur se 
   * joigne à un trajet offert par un conducteur.
   * @returns 
   */
  const gererRejoindreTrajet = async () => {
    if (!currentUserId || !ride?._id) {
      Alert.alert('Erreur', 'Informations utilisateur ou trajet manquantes.');
      return;
    }

    const url = `${BASE_URL}/api/trajets/${ride._id}/join`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId }),
      });

      const raw = await response.text();
      const result = JSON.parse(raw);

      if (!response.ok) {
        Alert.alert('Erreur', result.msg || 'Erreur lors de la planification');
        return;
      }

      Alert.alert('Succès', 'Vous avez rejoint ce trajet.');
      sheetRef.current?.close();
      onClose?.();
    } catch (err) {
      console.error('❌ Erreur de requête:', err.message);
      Alert.alert('Erreur', 'Impossible de rejoindre le trajet.');
    }
  };

  /**
   * Informe le serveur du backend que l'utilisateur s'est
   * désinscrit d'un trajet offert par un conducteur.
   * @returns 
   */
  const gererDesinscriptionTrajet = async () => {
    const url = `${BASE_URL}/api/trajets/${ride._id}/unjoin`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId }),
      });

      const raw = await response.text();
      const result = JSON.parse(raw);

      if (!response.ok) {
        Alert.alert('Erreur', result.msg || 'Erreur lors de la désinscription');
        return;
      }

      Alert.alert('Désinscription', 'Vous avez quitté ce trajet.');
      sheetRef.current?.close();
      onClose?.();
    } catch (err) {
      console.error('❌ Erreur de désinscription:', err.message);
      Alert.alert('Erreur', 'Impossible de quitter le trajet.');
    }
  };

  useEffect(() => {
    console.log('🚗 ride passed to BottomSheet:', ride);
  }, [ride]);

  const currentRide = ride || {};
  const weekdayOrder = ['LU', 'MA', 'ME', 'JE', 'VE', 'SA', 'DI'];

  const scheduleDays = currentRide?.scheduleDays?.length
    ? [...currentRide.scheduleDays]
        .sort((a, b) => weekdayOrder.indexOf(a) - weekdayOrder.indexOf(b))
        .join(', ')
    : 'Non spécifié';

  const scheduleTime = currentRide?.scheduleTime || 'Heure non spécifiée';
  const numberOfSeats = currentRide?.places;

  const alreadyJoined = currentRide?.passengers?.some(
    (p) => p === currentUserId || p?._id === currentUserId
  );

  const isFull =
    Array.isArray(currentRide?.passengers) &&
    currentRide?.passengers.length >= currentRide?.places;

  return (
    <BottomSheet
      ref={sheetRef}
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChange}
    >
      <BottomSheetView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        <TouchableOpacity
          onPress={() => sheetRef.current?.close()}
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}
        >
          <Ionicons name="close" size={24} color={couleurs.grisPrincipal} />
        </TouchableOpacity>

        <Text style={[styles.sousTitre, { marginTop: 20, color: couleurs.couleurTexteInverse }]}>
          Trajet proposé
        </Text>

        <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse, marginBottom: 16 }]}>
          Proposé par {currentRide?.userId?.prenom && currentRide?.userId?.nom
            ? `${currentRide.userId.prenom} ${currentRide.userId.nom}`
            : 'utilisateur inconnu'}
        </Text>

        <View style={{ marginBottom: 12 }}>
          <Text style={[styles.label, { color: couleurs.couleurTexteInverse }]}>Point de départ</Text>
          <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
            {currentRide?.pickupAddress || 'Adresse inconnue'}
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={[styles.label, { color: couleurs.couleurTexteInverse }]}>Destination</Text>
          <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
            {currentRide?.targetAddress || 'Adresse inconnue'}
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={[styles.label, { color: couleurs.couleurTexteInverse }]}>Distance</Text>
          <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
            {currentRide?.distance ? `${currentRide.distance.toFixed(1)} km` : 'Distance inconnue'}
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={[styles.label, { color: couleurs.couleurTexteInverse }]}>Jours</Text>
          <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
            {scheduleDays}
          </Text>

          <Text style={[styles.label, { color: couleurs.couleurTexteInverse, marginTop: 10 }]}>
            Heure
          </Text>
          <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
            {scheduleTime}
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.label, { color: couleurs.couleurTexteInverse }]}>Places disponibles</Text>
          <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
            {numberOfSeats ? `${numberOfSeats} place${numberOfSeats > 1 ? 's' : ''}` : 'Non spécifié'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.bouton,
              isFull && !alreadyJoined && { backgroundColor: couleurs.grisSecondaire },
            ]}
            disabled={isFull && !alreadyJoined}
            onPress={alreadyJoined ? gererDesinscriptionTrajet : gererRejoindreTrajet}
          >
            <Text style={[styles.boutonTexte, { color: couleurs.couleurTexte }]}>
              {alreadyJoined
                ? 'Quitter ce trajet'
                : isFull
                ? 'Complet'
                : 'Rejoindre ce trajet'}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default TrajetBottomSheet;
