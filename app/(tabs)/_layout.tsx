import { Tabs } from 'expo-router';
import { styles } from '../fonctionnalites/styles';
import { colors } from '../fonctionnalites/colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveBackgroundColor: colors.gray1,
      tabBarActiveTintColor: colors.white1,
      tabBarInactiveTintColor: colors.white1,
      tabBarInactiveBackgroundColor: colors.green1,
      headerStyle: { backgroundColor: colors.green1 },
      headerTintColor: colors.darkgray1,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="map" options={{ title: 'Carte'}} />
      <Tabs.Screen name="rides" options={{ title: 'Mes trajets'}} />
      <Tabs.Screen name="account" options={{ title: 'Mon compte' }} />
      <Tabs.Screen name="inscription" options={{ href: null}}/> {/*null pour cacher la tab*/}
      <Tabs.Screen name="mdpOublie" options={{ href: null}}/>
    </Tabs>
  );
}
