import { Tabs, useNavigation } from 'expo-router';
import { couleurs } from '../fonctionalites/Couleurs';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, StatusBar, BackHandler } from 'react-native';
import React, { useCallback } from 'react';
import { useKeyboard } from 'react-native-use-keyboard';
import { useAuthStore } from '../fonctionalites/VariablesGlobales';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const { largeur } = Dimensions.get("window");
const tailleIcon = largeur * 0.075;


/**
 * Gestion de la barre des tâches au bas de l'écran
 * @returns 
 */
export default function TabLayout() {
  const keyboard = useKeyboard();
  const estConnecte = useAuthStore((state) => state.estConnecte);
  const navigation = useNavigation();

  // Back handler for Android
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true; // block default (exit app)
        }
        return false; // allow exit if no back nav
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={couleurs.arrierePlan} />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: couleurs.couleurSurVert,
          tabBarInactiveTintColor: couleurs.couleurSurVert,
          headerShown: false,
          tabBarStyle: estConnecte
            ? {
              backgroundColor: couleurs.vertPrincipal,
              height: 80,
              position: 'absolute',
              elevation: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              paddingHorizontal: 0,
              width: '100%',
              left: 0,
              right: 0,
              bottom: 0,
            }
            : { display: 'none' },
          tabBarShowLabel: false,
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 3,
            marginTop: 15,
          },
        }}
      >
        <Tabs.Screen
          name="carte"
          options={{
            tabBarButton: estConnecte ? undefined : () => null,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'map' : 'map-outline'} color={color} size={tailleIcon} />
            ),
          }}
        />
        <Tabs.Screen
          name="trajets"
          options={{
            tabBarButton: estConnecte ? undefined : () => null,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'car' : 'car-outline'} color={color} size={tailleIcon} />
            ),
          }}
        />
        <Tabs.Screen
          name="compte"
          options={{
            tabBarButton: estConnecte ? undefined : () => null,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={tailleIcon} />
            ),
          }}
        />
        <Tabs.Screen name="inscription" options={{ href: null }} />
        <Tabs.Screen name="mdpOublie" options={{ href: null }} />
        <Tabs.Screen name="index" options={{ href: null }} />
      </Tabs>
    </GestureHandlerRootView>
  );
}
