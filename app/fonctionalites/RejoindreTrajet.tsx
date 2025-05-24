import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Styles';
import { couleurs } from './Couleurs';
import { BASE_URL } from '../apiConfig';
import { useAuthStore } from './VariablesGlobales';

/**
 * Composant BottomSheet pour afficher les détails d'un trajet et permettre l'inscription/désinscription
 * @param {Object} ride - Objet contenant les informations du trajet sélectionné
 * @param {boolean} visible - État de visibilité du BottomSheet
 * @param {Function} onClose - Fonction de callback appelée lors de la fermeture
 */
const TrajetBottomSheet = ({ ride, visible, onClose }) => {
  // Référence pour contrôler le BottomSheet programmatiquement
  const sheetRef = useRef(null);
  
  // ID de l'utilisateur actuel depuis le store global
  const currentUserId = useAuthStore((state) => state.userId);
  
  // Points d'ancrage du BottomSheet - mémorisés pour éviter les re-renders
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  /**
   * Effet pour synchroniser l'état visible avec l'ouverture/fermeture du BottomSheet
   * Contrôle automatiquement l'expansion et la fermeture basé sur la prop visible
   */
  useEffect(() => {
    if (visible && sheetRef.current) {
      sheetRef.current.expand(); // Ouvre le BottomSheet si visible devient true
    } else if (!visible && sheetRef.current) {
      sheetRef.current.close(); // Ferme le BottomSheet si visible devient false
    }
  }, [visible]);

  /**
   * Gestionnaire de changement d'état du BottomSheet
   * Appelle onClose quand le sheet est complètement fermé (index -1)
   */
  const handleSheetChange = useCallback((index) => {
    if (index === -1) {
      onClose?.(); // Appel sécurisé avec optional chaining
    }
  }, [onClose]);

  /**
   * Fonction pour gérer l'inscription d'un utilisateur à un trajet
   * Effectue un appel API POST vers l'endpoint /join
   */
  const gererRejoindreTrajet = async () => {
    // Validation des données requises avant l'appel API
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

      // Parse de la réponse en texte puis en JSON pour une meilleure gestion d'erreur
      const raw = await response.text();
      const result = JSON.parse(raw);

      if (!response.ok) {
        // Affichage du message d'erreur spécifique ou générique
        Alert.alert('Erreur', result.msg || 'Erreur lors de la planification');
        return;
      }

      // Succès: afficher confirmation et fermer le sheet
      Alert.alert('Succès', 'Vous avez rejoint ce trajet.');
      sheetRef.current?.close();
      onClose?.();
    } catch (err) {
      // Gestion des erreurs réseau ou de parsing
      Alert.alert('Erreur', 'Impossible de rejoindre le trajet.');
    }
  };

  /**
   * Fonction pour gérer la désinscription d'un utilisateur d'un trajet
   * Effectue un appel API POST vers l'endpoint /unjoin
   */
  const gererDesinscriptionTrajet = async () => {
    // Validation des données requises avant l'appel API
    if (!currentUserId || !ride?._id) {
      Alert.alert('Erreur', 'Informations utilisateur ou trajet manquantes.');
      return;
    }

    const url = `${BASE_URL}/api/trajets/${ride._id}/unjoin`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId }),
      });

      // Parse de la réponse en texte puis en JSON pour une meilleure gestion d'erreur
      const raw = await response.text();
      const result = JSON.parse(raw);

      if (!response.ok) {
        // Affichage du message d'erreur spécifique ou générique
        Alert.alert('Erreur', result.msg || 'Erreur lors de la désinscription');
        return;
      }

      // Succès: afficher confirmation et fermer le sheet
      Alert.alert('Désinscription', 'Vous avez quitté ce trajet.');
      sheetRef.current?.close();
      onClose?.();
    } catch (err) {
      // Gestion des erreurs réseau ou de parsing
      Alert.alert('Erreur', 'Impossible de quitter le trajet.');
    }
  };

  // Référence sécurisée au trajet actuel avec fallback sur objet vide
  const trajetActuel = ride || {};
  
  // Ordre des jours de la semaine pour le tri correct
  const joursDeSemaine = ['LU', 'MA', 'ME', 'JE', 'VE', 'SA', 'DI'];

  /**
   * Traitement et formatage des jours de la semaine du trajet
   * Trie les jours selon l'ordre logique et les joint par des virgules
   * Utilise scheduleDays depuis le backend au lieu de joursDuHoraire
   */
  const joursDuHoraire = trajetActuel?.scheduleDays?.length
    ? [...trajetActuel.scheduleDays] // Copie pour éviter la mutation
        .sort((a, b) => joursDeSemaine.indexOf(a) - joursDeSemaine.indexOf(b)) // Tri selon l'ordre des jours
        .join(', ') // Formatage pour l'affichage
    : null; // Null si pas de jours valides

  // Vérification de la validité des données de jours
  const hasValidDays = joursDuHoraire !== null;

  // Garde de sécurité: retourne null si aucun trajet n'est fourni
  if (!ride) {
    Alert.alert('Erreur', 'Aucun trajet sélectionné.');
    return null;
  }

  // Extraction des données du trajet avec valeurs par défaut
  const scheduleTime = trajetActuel?.scheduleTime || 'Heure non spécifiée';
  const nbDeSieges = trajetActuel?.places;

  /**
   * Vérification si l'utilisateur actuel a déjà rejoint ce trajet
   * Vérifie à la fois l'ID direct et l'ID dans un objet passager
   */
  const alreadyJoined = trajetActuel?.passengers?.some(
    (p) => p === currentUserId || p?._id === currentUserId
  );

  /**
   * Vérification si le trajet est complet (plus de places disponibles)
   * Compare le nombre de passagers avec le nombre de places totales
   */
  const estRempli =
    Array.isArray(trajetActuel?.passengers) &&
    trajetActuel?.passengers.length >= trajetActuel?.places;

  return (
    <BottomSheet
      ref={sheetRef}
      index={visible ? 0 : -1} // Index conditionnel basé sur la visibilité
      snapPoints={snapPoints}
      enablePanDownToClose // Permet la fermeture par glissement vers le bas
      onChange={handleSheetChange}
      onAnimate={(fromIndex, toIndex) => {
        // Callback d'animation - actuellement vide mais disponible pour futures fonctionnalités
      }}
    >
      <BottomSheetView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        {/* Bouton de fermeture positionné en haut à droite */}
        <TouchableOpacity
          onPress={() => {
            sheetRef.current?.close();
          }}
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}
        >
          <Ionicons name="close" size={24} color={couleurs.grisPrincipal} />
        </TouchableOpacity>

        {/* Titre principal du BottomSheet */}
        <Text style={[styles.sousTitre, { marginTop: 20, color: couleurs.couleurTexteInverse }]}>
          Trajet proposé
        </Text>

        {/* Affichage du nom du proposant du trajet */}
        <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse, marginBottom: 16 }]}>
          Proposé par {trajetActuel?.userId?.prenom && trajetActuel?.userId?.nom
            ? `${trajetActuel.userId.prenom} ${trajetActuel.userId.nom}` // Nom complet si disponible
            : 'utilisateur inconnu'} {/* Fallback si données manquantes */}
        </Text>

        {/* Section des informations de départ */}
        <View style={{ marginBottom: 12 }}>
          <Text style={[styles.label, { color: couleurs.couleurTexteInverse }]}>Point de départ</Text>
          <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
            {trajetActuel?.pickupAddress || 'Adresse inconnue'}
          </Text>
        </View>

        {/* Section des informations de destination */}
        <View style={{ marginBottom: 12 }}>
          <Text style={[styles.label, { color: couleurs.couleurTexteInverse }]}>Destination</Text>
          <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
            {trajetActuel?.targetAddress || 'Adresse inconnue'}
          </Text>
        </View>

        {/* Section d'affichage de la distance */}
        <View style={{ marginBottom: 12 }}>
          <Text style={[styles.label, { color: couleurs.couleurTexteInverse }]}>Distance</Text>
          <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
            {trajetActuel?.distance ? `${trajetActuel.distance.toFixed(1)} km` : 'Distance inconnue'}
          </Text>
        </View>

        {/* Section d'affichage des jours et horaires */}
        <View style={{ marginBottom: 12 }}>
          <Text style={[styles.label, { color: couleurs.couleurTexteInverse }]}>Jours</Text>
          {/* Affichage conditionnel des jours selon leur validité */}
          {hasValidDays ? (
            <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
              {joursDuHoraire}
            </Text>
          ) : (
            <Text style={[styles.petitTexte, { color: 'red', fontStyle: 'italic' }]}>
              Erreur: Jours non définis pour ce trajet
            </Text>
          )}

          {/* Sous-section pour l'heure */}
          <Text style={[styles.label, { color: couleurs.couleurTexteInverse, marginTop: 10 }]}>
            Heure
          </Text>
          <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
            {scheduleTime}
          </Text>
        </View>

        {/* Section d'affichage des places disponibles */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.label, { color: couleurs.couleurTexteInverse }]}>Places disponibles</Text>
          <Text style={[styles.petitTexte, { color: couleurs.couleurTexteInverse }]}>
            {nbDeSieges ? `${nbDeSieges} place${nbDeSieges > 1 ? 's' : ''}` : 'Non spécifié'}
          </Text>
        </View>

        {/* Container pour le bouton d'action principal */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.bouton,
              // Style conditionnel: grisé si jours invalides ou trajet complet (et pas déjà inscrit)
              (!hasValidDays || (estRempli && !alreadyJoined)) && { backgroundColor: couleurs.grisSecondaire },
            ]}
            // Désactivation conditionnelle du bouton
            disabled={!hasValidDays || (estRempli && !alreadyJoined)}
            onPress={() => {
              // Logique conditionnelle: désinscription si déjà inscrit, sinon inscription
              if (alreadyJoined) {
                gererDesinscriptionTrajet();
              } else {
                gererRejoindreTrajet();
              }
            }}
          >
            {/* Texte du bouton adaptatif selon l'état */}
            <Text style={[styles.boutonTexte, { color: couleurs.couleurTexte }]}>
              {!hasValidDays
                ? 'Trajet invalide' // Si pas de jours valides
                : alreadyJoined
                ? 'Quitter ce trajet' // Si déjà inscrit
                : estRempli
                ? 'Complet' // Si trajet plein
                : 'Rejoindre ce trajet'} {/* Action par défaut */}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default TrajetBottomSheet;