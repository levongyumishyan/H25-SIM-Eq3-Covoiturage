
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { styles } from './Styles';
import { colors } from './Colors';
import { BASE_URL } from '~/apiConfig';
import { useAuthStore } from './VariablesGlobales';

const MAPBOX_TOKEN = Constants.expoConfig?.extra?.mapboxToken;

const SearchBox = forwardRef(({ onSelect }, ref) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [pendingTargetCoords, setPendingTargetCoords] = useState(null);

  const setTargetLat = useAuthStore((state) => state.setTargetLat);
  const setTargetLong = useAuthStore((state) => state.setTargetLong);

  useImperativeHandle(ref, () => ({
    confirmSchedule,
  }));

  useEffect(() => {
    (async () => {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      console.log("coordonnées actuelles raw: " + location);
      S
    })();
  }, []);

  useEffect(() => {
    if (input.trim() === '') return setSuggestions([]);
    const fetchSuggestions = async () => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        input
      )}.json?proximity=${location?.longitude},${location?.latitude}&autocomplete=true&access_token=${process.env.EXPO_PUBLIC_ACCESS_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data.features || []);
    };
    if (location) fetchSuggestions();
  }, [input, location]);

  const handleSelect = (place_name, coords) => {
    setSelectedAddress(place_name);
    setPendingTargetCoords(coords);
    console.log(coords[1]);
    setTargetLong(coords[0]);
    setTargetLat(coords[1]);
    setSuggestions([]);
    onSelect?.();
  };

  const confirmSchedule = async (schedule) => {
    if (!location || !pendingTargetCoords) return;
    try {
      const body = {
        long: location.longitude,
        lat: location.latitude,
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

  const renderSuggestions = ({ item }) => {
    const { place_name, geometry } = item;
    const coords = geometry?.coordinates ?? [];
    const isSelected = selectedAddress === place_name;
    return (
      <TouchableOpacity
        style={styles.rideItem}
        onPress={() => handleSelect(place_name, coords)}
      >
        <View>
          <Text
            style={{
              ...styles.labelInverse,
              color: isSelected ? colors.blanc : colors.noir,
              textDecorationLine: isSelected ? 'underline' : 'none'
            }}
          >
            {place_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.searchBoxWrapper, {
      backgroundColor: colors.blanc,
      borderRadius: 12,
      elevation: 5,
      padding: 10,
    }]}>
      <View style={styles.ligneCentree}>
        <Ionicons name="search" size={30} color={colors.noir} style={styles.searchIcon} />
        <TextInput
          style={styles.labelInverse}
          placeholder={'Où allez-vous ?'}
          placeholderTextColor={colors.noir}
          value={input}
          onChangeText={setInput}
        />
      </View>

      {suggestions.length > 0 && (
        <FlatList
          style={{ marginTop: 10, maxHeight: 180 }} // limit size if needed
          data={suggestions}
          keyExtractor={(item, index) => item.id + index}
          renderItem={renderSuggestions}
        />
      )}
    </View>

  );
});

export default SearchBox;
