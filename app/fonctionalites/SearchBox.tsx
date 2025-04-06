import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Styles';
import { colors } from './Colors';

const SearchBox = () => {
  const [destination, setDestination] = useState('');

  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color={colors.blanc}
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
