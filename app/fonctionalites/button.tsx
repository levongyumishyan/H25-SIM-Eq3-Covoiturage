import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { styles } from "./styles";


export default function FlatButton({text, onPress}) {
     return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.linkButton}>
                <Text style={styles.linkButtonText}>{text}</Text>
            </View>
        </TouchableOpacity>
     )
}

