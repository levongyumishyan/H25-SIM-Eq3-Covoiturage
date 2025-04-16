import { Tabs } from 'expo-router';
import { colors } from '../fonctionalites/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import React from 'react';
import { useKeyboard } from 'react-native-use-keyboard';

const { width } = Dimensions.get("window");
const iconSize = width * 0.075;

export default function TabLayout() {
  const keyboard = useKeyboard();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.couleurSurVert,
        tabBarInactiveTintColor: colors.couleurSurVert,
        headerShown: false,
        tabBarStyle: [
          {
            backgroundColor: colors.vertPrincipal,
            height: 80,
            position: 'absolute',
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          },
          keyboard.isOpen ? { display: 'none' } : {},
        ],
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'map' : 'map-outline'} color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'car' : 'car-outline'} color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen name="inscription" options={{ href: null }} />
      <Tabs.Screen name="mdpOublie" options={{ href: null }} />
    </Tabs>
  );
}
