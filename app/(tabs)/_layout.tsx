import { Tabs } from 'expo-router';
import { colors } from '../fonctionalites/colors';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { styles } from '../fonctionalites/styles';\
import { Dimensions } from "react-native";

export default function TabLayout() {
  const { width } = Dimensions.get("window");
  const iconSize = width * 0.08; // 8% of screen width
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.white1,
        tabBarInactiveTintColor: colors.darkgray1,
        headerTransparent: true,
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: 'transparent' },
        headerTintColor: colors.darkgray1,
        tabBarStyle: {
          backgroundColor: colors.green1,
          borderRadius: 20,
          height: 80,
          position: 'absolute',
          left: 10,
          right: 10,
          bottom: 15,
          paddingBottom: 10,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        },
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen 
        name="map" 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="map" color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen 
        name="rides" 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="car" color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen 
        name="account" 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen name="inscription" options={{ href: null }} /> {/* Hidden Tab */}
      <Tabs.Screen name="mdpOublie" options={{ href: null }} /> {/* Hidden Tab */}
    </Tabs>
  );
}
