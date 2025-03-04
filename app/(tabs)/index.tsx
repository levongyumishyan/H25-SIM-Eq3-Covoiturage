import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../fonctionalites/colors';

export default function App() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require("../images/routeChamp1.jpg")} 
        style={styles.background}
      >
        <View style={styles.overlay} /> {/* Dark overlay for contrast */}
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}> 
          <Text style={styles.title}>Ride/W</Text>
          <Text style={styles.subtitle}>Application de Covoiturage</Text>

          {/* Moved buttons directly below the text */}
          <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: slideAnim }] }]}> 
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => router.push('/account')}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.outlineButton]} 
              onPress={() => router.push('/account')}
            >
              <Text style={[styles.buttonText, styles.outlineButtonText]}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray900,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay effect
  },
  content: {
    position: "absolute",
    alignItems: "center",
    width: "90%",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.white1,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white1,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.green1,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.white1,
  },
  buttonText: {
    color: colors.white1,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  outlineButtonText: {
    color: colors.white1,
  },
});

export default App;