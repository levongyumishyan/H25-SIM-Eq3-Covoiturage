
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
import Constants from 'expo-constants';
import { styles } from './Styles';
import { couleurs } from './Couleurs';
import { BASE_URL } from '~/apiConfig';
import { useAuthStore } from './VariablesGlobales';

const MAPBOX_TOKEN = Constants.expoConfig?.extra?.mapboxToken;

const BoiteDeRecherche = forwardRef(({ onSelect }, ref) => {
  const [input, setInput] = useState(''); // Ce que l'utilisateur cherchera dans la boite de recherche (SearchBox)
  const [suggestions, setSuggestions] = useState([]); 
  const [position, setPosition] = useState(null);
  const [adresseSelectionnee, setAdresseSelectionnee] = useState(null);
  // Variables ci-dessous servent à stocker temporairement les coordonnées de la destination avant que l'utilisateur finit son choix
  const [pendingTargetCoords, setPendingTargetCoords] = useState(null);

  const setTargetLat = useAuthStore((state) => state.setTargetLat);
  const setTargetLong = useAuthStore((state) => state.setTargetLong);

  useImperativeHandle(ref, () => ({
    confirmerHoraire,
  }));

  useEffect(() => {
    (async () => {
      const loc = await Position.getCurrentPositionAsync({});
      setPosition(loc.coords);
      console.log("coordonnées actuelles raw: " + position);
    })();
  }, []);

    /**
   * La boite de recherche peut suggérer des adresses 
   * qui correspond possiblement à ce que 
   * l'utilisateur cherche comme adresse.
   */
  useEffect(() => {
    if (input.trim() === '') return setSuggestions([]);
    const fetchSuggestions = async () => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        input
      )}.json?proximity=${position?.longitude},${position?.latitude}&autocomplete=true&access_token=${process.env.EXPO_PUBLIC_ACCESS_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data.features || []);
    };
    if (position) fetchSuggestions();
  }, [input, position]);

  /**
   * Enregistre le nom et les coordonnées pour ensuite 
   * afficher la destination sur la carte.
   * @param nomDuLieu Le nom de la destination
   * @param coords Les coordonnées de la destination
   */
  const gererSelection = (nomDuLieu, coords) => {
    setAdresseSelectionnee(nomDuLieu);
    setPendingTargetCoords(coords);
    console.log(coords[1]);
    setTargetLong(coords[0]);
    setTargetLat(coords[1]);
    setSuggestions([]);
    onSelect?.();
  };

  /**
   * Envoie les informations du trajet sélectionné
   * au serveur du backend.
   * @param horaire L'horaire choisi par l'utilisateur
   * @returns 
   */
  const confirmerHoraire = async (horaire) => {
    if (!position || !pendingTargetCoords) return;
    try {
      const body = {
        long: position.longitude,
        lat: position.latitude,
        targetLong: pendingTargetCoords[0],
        targetLat: pendingTargetCoords[1],
      };

      const response = await fetch(`${BASE_URL}/api/trajets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error ${response.status}: ${text}`);
      }

      const result = await response.json();
      console.log("Trajet ajouté:", result);
    } catch (error) {
      console.error("Erreur ajout trajet:", error.message);
    }
  };

  /**
   * 
   * @param item0 
   * @returns 
   */
  const donnerSuggestions = ({ item }) => {
    const { nomDuLieu, geometrie } = item;
    const coordonnees = geometrie?.coordinates ?? [];
    const estSelectionne = adresseSelectionnee === nomDuLieu;
    return (
      <TouchableOpacity
        style={styles.trajetItem}
        onPress={() => gererSelection(nomDuLieu, coordonnees)}
      >
        <View>
          <Text
            style={{
              ...styles.labelInverse,
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
      elevation: 5,
      padding: 10,
    }]}>
      <View style={styles.ligneCentree}>
        <Ionicons name="search" size={30} color={couleurs.noir} style={styles.searchIcon} />
        <TextInput
          style={styles.labelInverse}
          placeholder={'Où allez-vous ?'}
          placeholderTextColor={couleurs.noir}
          value={input}
          onChangeText={setInput}
        />
      </View>

      {suggestions.length > 0 && (
        <FlatList
          style={{ marginTop: 10, maxHeight: 180 }} // Limiter la taille si nécessaire
          data={suggestions}
          keyExtractor={(item, index) => item.id + index}
          renderItem={donnerSuggestions}
        />
      )}
    </View>

  );
});

export default BoiteDeRecherche;
