import React, { useState, useEffect } from 'react';
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

const MAPBOX_TOKEN = Constants.expoConfig?.extra?.mapboxToken;

const SearchBox = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    if (input.trim() === '') {
      setSuggestions([]); // Clear suggestions if input is empty
      return;
    }

    const fetchSuggestions = async () => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        input
      )}.json?proximity=${location.longitude},${location.latitude}&autocomplete=true&access_token=${process.env.EXPO_PUBLIC_ACCESS_KEY}`;

    
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data.features || []);
      console.log('Suggestions:', data.features);
    
    };

    fetchSuggestions();
  }, [input, location]);

  const renderSuggestions = ({ item }) => {
    const { place_name, geometry, properties } = item;
    const coords = geometry?.coordinates ?? [];

    return (
      <TouchableOpacity
        style={styles.rideItem}
        onPress={() => {
          console.log(`Selected: ${place_name}`);
          console.log(`Coords: ${coords[1]}, ${coords[0]}`);
        }}
      >
        <View>
          <Text style={styles.labelInverse}>{place_name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
      <View style={styles.searchBoxWrapper}>
        <View style={styles.centeredRow}>
        <Ionicons
          name="search"
          size={30}
          color={colors.noir}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.labelInverse}
          placeholder={'Où allez-vous ?'}
          placeholderTextColor={colors.couleurTexteInverse}
          value={input}
          onChangeText={setInput}
        />
      </View>



      {suggestions.length > 0 && (
        <View style={styles.scrollContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => item.id + index}
            renderItem={renderSuggestions}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBox;
