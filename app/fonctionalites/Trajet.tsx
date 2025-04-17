import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from './Styles';

export default function Trajet(props)
{
    return(
        <View style={styles.element}>
            <Text style={styles.elementText}>
                {props.text}Trajet
            </Text>
        </View>
    );
}