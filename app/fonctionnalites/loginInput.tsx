import { Link } from 'expo-router';
import React from 'react';
import {StyleSheet, TextInput, Text, Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { estConnecte } from './variablesGlobales';


var LoginInput = () => {
  var [courriel, onChangeCourriel] = React.useState('');
  var [mdp, onChangeMdp] = React.useState('');

  //À rajouter la vérification avec la userbase
  const verifierConnection = () => { 
    if(courriel == "admin" && mdp == "password") {
      alert("bon code");
      } else {
      alert("non :(");
    }
  }
  
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>{"\n"}</Text>
        <Text>Courriel</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCourriel}
          value={courriel}
          placeholder="courriel@entreprise.ca"
        />
        <Text>Mot de passe</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeMdp}
          value={mdp}
          placeholder="**********"
        />
        <Link href="../(tabs)/mdpOublie">Mot de passe oublié?</Link> 
        <Link href="../(tabs)/inscription">Se créer un compte</Link> 
        <Text>{mdp}</Text>
        <Button  onPress={verifierConnection} title="Se connecter"  color="#841584"></Button>
        
      </SafeAreaView>
    </SafeAreaProvider>
    
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});



export default LoginInput;
