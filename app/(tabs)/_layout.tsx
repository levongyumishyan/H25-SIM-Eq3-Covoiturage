import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="map" options={{ title: 'Carte' }} />
      <Tabs.Screen name="rides" options={{ title: 'Mes trajets' }} />
      <Tabs.Screen name="account" options={{ title: 'Mon compte' }} />
    </Tabs>
  );
}
