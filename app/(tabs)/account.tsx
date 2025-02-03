import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import LoginInput from "../fonctionnalites/loginInput";
import { estConnecte } from "../fonctionnalites/variablesGlobales";
import React, { useState } from "react";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      { !estConnecte ? ( 
        <>
          <Text style={{fontSize: 36}}>Déconnecté</Text>
          <Text>Application de covoiturage :)</Text>
          <LoginInput />
        </> 
      ) : (
        <>
          <Text>Application de covoiturage :)</Text>
          <LoginInput />
        </>
      )}
    </View>
  );
}
