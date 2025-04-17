import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { styles } from './Styles';
import { Ionicons } from '@expo/vector-icons';
import BottomSearchSheet from './BottomSearchSheet';

const [showSheet, setShowSheet] = useState(false);


export default function Trajet(props)
{
    return (
        <TouchableOpacity style={styles.trajetButton} onPress={() => setShowSheet(true)}> 
        <BottomSearchSheet visible={showSheet} />   
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
    );
} 