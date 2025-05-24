import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import * as Position from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Styles';
import { couleurs } from './Couleurs';
import { BASE_URL } from '~/apiConfig';
import { useAuthStore } from './VariablesGlobales';

// Type définissant les props attendues par le composant
type BoiteDeRechercheProps = {
  onSelect?: () => void; // Callback optionnel appelé lors de la sélection d'une adresse
};

/**
 * Composant de recherche d'adresses avec autocomplétion
 * Utilise l'API Mapbox pour suggérer des adresses basées sur la saisie utilisateur
 * Permet la sélection d'une destination et la création de trajets
 */
const BoiteDeRecherche = forwardRef(({ onSelect }: BoiteDeRechercheProps, ref) => {
  // État pour stocker la saisie utilisateur dans le champ de recherche
  const [input, setInput] = useState(''); // Ce que l'utilisateur cherchera dans la boite de recherche (SearchBox)
  
  // État pour stocker les suggestions d'adresses retournées par l'API Mapbox
  const [suggestions, setSuggestions] = useState([]); 
  
  // État pour stocker la position actuelle de l'utilisateur (géolocalisation)
  const [position, setPosition] = useState(null);
  
  // État pour stocker l'adresse actuellement sélectionnée par l'utilisateur
  const [adresseSelectionnee, setAdresseSelectionnee] = useState(null);
  
  // Variables ci-dessous servent à stocker temporairement les coordonnées de la destination avant que l'utilisateur finit son choix
  const [pendingTargetCoords, setPendingTargetCoords] = useState(null);

  // Fonctions du store global pour sauvegarder les coordonnées de destination
  const setTargetLat = useAuthStore((state) => state.setTargetLat);
  const setTargetLong = useAuthStore((state) => state.setTargetLong);

  /**
   * Expose la fonction confirmerHoraire au composant parent via la ref
   * Permet au parent d'appeler cette fonction pour finaliser la création du trajet
   */
  useImperativeHandle(ref, () => ({
    confirmerHoraire,
  }));

  /**
   * Effet pour obtenir la position actuelle de l'utilisateur au montage du composant
   * Nécessaire pour fournir un contexte géographique aux suggestions d'adresses
   */
  useEffect(() => {
    (async () => {
      const loc = await Position.getCurrentPositionAsync({});
      setPosition(loc.coords);
    })();
  }, []);

  /**
   * Effet pour récupérer les suggestions d'adresses depuis l'API Mapbox
   * La boite de recherche peut suggérer des adresses 
   * qui correspondent possiblement à ce que 
   * l'utilisateur cherche comme adresse.
   * Se déclenche à chaque modification de la saisie utilisateur
   */
  useEffect(() => {
    // Si le champ est vide, effacer les suggestions
    if (input.trim() === '') return setSuggestions([]);
    
    const fetchSuggestions = async () => {
      // Construction de l'URL de l'API Mapbox Geocoding avec proximité basée sur la position utilisateur
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        input
      )}.json?proximity=${position?.longitude},${position?.latitude}&autocomplete=true&access_token=${process.env.EXPO_PUBLIC_ACCESS_KEY}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      // Mise à jour des suggestions avec les résultats de l'API
      setSuggestions(data.features || []);
    };
    
    // Exécuter la recherche seulement si la position est disponible
    if (position) fetchSuggestions();
  }, [input, position]);

  /**
   * Gère la sélection d'une adresse suggérée par l'utilisateur
   * Enregistre le nom et les coordonnées pour ensuite 
   * afficher la destination sur la carte.
   * @param {string} nomDuLieu Le nom de la destination sélectionnée
   * @param {Array} coords Les coordonnées [longitude, latitude] de la destination
   */
  const gererSelection = (nomDuLieu, coords) => {
    setAdresseSelectionnee(nomDuLieu); // Marquer cette adresse comme sélectionnée
    setPendingTargetCoords(coords); // Stocker temporairement les coordonnées
    
    // Sauvegarder les coordonnées dans le store global
    setTargetLong(coords[0]);
    setTargetLat(coords[1]);
    
    setSuggestions([]); // Effacer les suggestions après sélection
    onSelect?.(); // Appeler le callback du parent si fourni
  };

  /**
   * Finalise la création du trajet en envoyant les données au serveur
   * Envoie les informations du trajet sélectionné
   * au serveur du backend.
   * @param {Object} horaire L'horaire choisi par l'utilisateur (jours et heure)
   * @returns {void} Retourne prématurément si les données requises sont manquantes
   */
  const confirmerHoraire = async (horaire) => {
    // Validation: s'assurer que la position et la destination sont disponibles
    if (!position || !pendingTargetCoords) return;
    
    try {
      // Construction du payload avec les coordonnées de départ et destination
      const body = {
        long: position.longitude, // Longitude de départ (position actuelle)
        lat: position.latitude, // Latitude de départ (position actuelle)
        targetLong: pendingTargetCoords[0], // Longitude de destination
        targetLat: pendingTargetCoords[1], // Latitude de destination
      };

      // Appel API pour créer le nouveau trajet
      const response = await fetch(`${BASE_URL}/api/trajets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // Vérification du succès de la requête
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error ${response.status}: ${text}`);
      }

      const result = await response.json();
      // TODO: Possibilité d'ajouter ici une notification de succès ou une redirection
    } catch (error) {
      console.error("Erreur ajout trajet:", error.message);
      // TODO: Possibilité d'ajouter ici une notification d'erreur à l'utilisateur
    }
  };

  /**
   * Fonction de rendu pour chaque élément de suggestion dans la FlatList
   * Affiche le nom de lieu avec un style différent si l'élément est sélectionné
   * @param {Object} item Objet contenant les données de la suggestion
   * @returns {JSX.Element} Composant TouchableOpacity représentant une suggestion
   */
  const donnerSuggestions = ({ item }) => {
    const nomDuLieu = item.place_name; // Propriété correcte pour le nom depuis l'API Mapbox
    const coordonnees = item.geometry?.coordinates ?? []; // Coordonnées avec fallback sur tableau vide
    const estSelectionne = adresseSelectionnee === nomDuLieu; // Vérification si cette suggestion est actuellement sélectionnée
    
    return (
      <TouchableOpacity
        style={styles.trajetItem}
        onPress={() => gererSelection(nomDuLieu, coordonnees)}
      >
        <View>
          <Text
            style={{
              ...styles.labelInverse,
              // Style conditionnel basé sur l'état de sélection
              color: estSelectionne ? couleurs.blanc : couleurs.noir,
              textDecorationLine: estSelectionne ? 'underline' : 'none'
            }}
          >
            {nomDuLieu}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.searchBoxWrapper, {
      backgroundColor: couleurs.blanc,
      borderRadius: 12,
      elevation: 5, // Ombre pour Android
      padding: 10,
    }]}>
      {/* Container principal de la barre de recherche */}
      <View style={styles.ligneCentree}>
        {/* Icône de recherche */}
        <Ionicons name="search" size={30} color={couleurs.noir} style={styles.searchIcon} />
        
        {/* Champ de saisie pour la recherche d'adresses */}
        <TextInput
          style={styles.labelInverse}
          placeholder={'Où allez-vous ?'}
          placeholderTextColor={couleurs.noir}
          value={input}
          onChangeText={setInput} // Mise à jour de l'état à chaque modification
        />
      </View>

      {/* Liste déroulante des suggestions - affichée seulement si il y a des suggestions */}
      {suggestions.length > 0 && (
        <FlatList
          style={{ marginTop: 10, maxHeight: 180 }} // Limitation de la hauteur pour éviter le débordement
          data={suggestions}
          keyExtractor={(item, index) => item.id ?? item.place_name + index} // Clé unique avec fallback
          renderItem={donnerSuggestions} // Fonction de rendu pour chaque suggestion
        />
      )}
    </View>
  );
});

export default BoiteDeRecherche;