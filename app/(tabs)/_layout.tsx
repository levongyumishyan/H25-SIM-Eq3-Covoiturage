import { Tabs, useNavigation } from 'expo-router';
import { colors } from '../fonctionalites/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, StatusBar, BackHandler } from 'react-native';
import React, { useCallback } from 'react';
import { useKeyboard } from 'react-native-use-keyboard';
import { useAuthStore } from '../fonctionalites/VariablesGlobales';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get("window");
const iconSize = width * 0.075;

export default function TabLayout() {
  const keyboard = useKeyboard();
  const estConnecte = useAuthStore((state) => state.estConnecte);
  const navigation = useNavigation();

  // ✅ Back handler for Android
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
      <StatusBar barStyle="light-content" backgroundColor={colors.arrierePlan} />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.couleurSurVert,
          tabBarInactiveTintColor: colors.couleurSurVert,
          headerShown: false,
          tabBarStyle: estConnecte
            ? {
                backgroundColor: colors.vertPrincipal,
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
          name="map"
          options={{
            tabBarButton: estConnecte ? undefined : () => null,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'map' : 'map-outline'} color={color} size={iconSize} />
            ),
          }}
        />
        <Tabs.Screen
          name="rides"
          options={{
            tabBarButton: estConnecte ? undefined : () => null,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'car' : 'car-outline'} color={color} size={iconSize} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            tabBarButton: estConnecte ? undefined : () => null,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={iconSize} />
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
