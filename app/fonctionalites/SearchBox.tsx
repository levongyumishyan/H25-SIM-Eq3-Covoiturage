import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Styles';
import { couleurs } from '../fonctionalites/Couleurs';

const SearchBox = () => {
  const [destination, setDestination] = useState('');
  const palette = couleurs();

  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color={palette.blanc}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Où allez-vous ?"
        placeholderTextColor={styles.searchInput.color}
        value={destination}
        onChangeText={setDestination}
      />
    </View>
  );
};

export default SearchBox;
