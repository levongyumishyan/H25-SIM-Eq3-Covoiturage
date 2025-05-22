import React, { useRef, useState, useEffect } from 'react';
import { View, Text, LogBox } from 'react-native';
import Mapbox, {
  MapView,
  ShapeSource,
  SymbolLayer,
  CircleLayer,
  Camera,
  UserLocation,
  Images,
  LineLayer,
  LocationPuck
} from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { couleurs } from './Couleurs';
import BoutonLocalisation from './BoutonLocalisation';
import pin from "../assets/images/pin.png";
import { BASE_URL } from '../apiConfig';
import { estDarkMode, useAuthStore } from './VariablesGlobales';
import RechercheTrajet from './RechercheTrajet';
import Trajet from './RejoindreTrajet';
import SelecteurHoraire from './SelecteurHoraire';
import { useRideStore } from './useRideStore';
import TrajetBottomSheet from './RejoindreTrajet';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_ACCESS_KEY || '');

LogBox.ignoreLogs([
  'ViewTagResolver',
  'Mapbox [error] ViewTagResolver',
]);

export default function EcranCarte() {
  const cameraRef = useRef<Camera>(null);
  const { prochainTrajet } = useRideStore();
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);// Coordonnées de l'utilisateur
  const [trajetChoisi, setTrajetChoisi] = useState(null);
  const [montrerTrajet, setMontrerTrajet] = useState(false);
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  const [adresseDepart, setAdresseDepart] = useState('');
  const [adresseDestination, setAdresseDestination] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRideDetailsOpen, setIsRideDetailsOpen] = useState(false);
  const [montrerSelecteurHoraire, setMontrerSelecteurHoraire] = useState(false);
  const [conducteurs, setConducteurs] = useState([]);

  // Latitude de l'utilisateur
  const setUserLat = useAuthStore((state) => state.setUserLat);
  // Longitude de l'utilisateur
  const setUserLong = useAuthStore((state) => state.setUserLong);

  /**
   * Cette méthode récupère tous les trajets enregistrés
   * dans le serveur pour les afficher sur la carte.
   */
  const chercherConducteurs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/trajets`);
      const text = await response.text();

      try {
        const data = JSON.parse(text);
        setConducteurs(data);
      } catch (parseError) {
        console.error('JSON parse error:', parseError.message);
        console.error('Response:', text);
      }

    } catch (error) {
      console.error('Network error fetching trajets:', error.message);
    }
  };


  useEffect(() => {
    chercherConducteurs();
    const interval = setInterval(chercherConducteurs, 10000);
    return () => clearInterval(interval);
  }, []);

// Prépare les informations de chaque conducteur
// pour les afficher sur la carte.
  const points = {
    type: 'FeatureCollection',
    features: conducteurs.map((driver, index) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [driver.long, driver.lat],
      },
      properties: { ...driver, id: index },
    })),
  };

  // Demande la permission à l'utilisateur pour avoir
  // accès à son position sur la carte.
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission denied');
      }
    };
    requestPermission();
  }, []);

  /**
   * Prépare la ligne reliant le départ et la destination
   * du trajet.
   * @param waypoints Le chemin entre le départ et la destination
   * @returns 
   */
  const chercherRoute = async (waypoints) => {
    const coords = waypoints.map(coord => `${coord[0]},${coord[1]}`).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&overview=full&radiuses=50;50&access_token=${process.env.EXPO_PUBLIC_ACCESS_KEY}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.routes[0]?.geometry || null;
    } catch (error) {
      console.error('Error fetching route:', error);
      return null;
    }
  };

  /**
   * Cette méthode permet de traduire les coordonnées
   * (latitude et longitude) d'un endroit en une adresse.
   * @param tableau Les coordonnées : longitude et latitude
   * @returns 
   */
  const reverseGeocode = async ([lng, lat]) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.EXPO_PUBLIC_ACCESS_KEY}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.features[0]?.place_name || '';
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return '';
    }
  };

  const fermerTrajet = () => {
    setMontrerTrajet(false);
    setTrajetChoisi(null);
    setRouteGeoJSON(null);
    setAdresseDepart('');
    setAdresseDestination('');
  };

  /**
   * Enregistre les informations du trajet dans les variables locales après que
   * l'utilisateur a appuyé sur un conducteur affiché sur la carte.
   * @param event 
   * @returns 
   */
  const handlePinPress = async (event) => {
    const feature = event.features?.[0];
    if (!feature) return;

    if (feature.properties?.point_count) {
      const [longitude, latitude] = feature.geometry.coordinates;
      cameraRef.current?.setCamera({
        centerCoordinate: [longitude, latitude],
        zoomLevel: 18,
        animationDuration: 500,
      });
    } else {
      const rideCoords = feature.geometry.coordinates;
      const targetLong = feature.properties.targetLong;
      const targetLat = feature.properties.targetLat;

      if (typeof targetLong !== 'number' || typeof targetLat !== 'number') {
        console.warn('Target coordinates missing');
        return;
      }

      const targetCoords = [targetLong, targetLat];
      const route = await chercherRoute([rideCoords, targetCoords]);
      if (route) {
        setRouteGeoJSON({
          type: 'FeatureCollection',
          features: [{ type: 'Feature', geometry: route, properties: {} }],
        });

        const pickupAddress = await reverseGeocode(rideCoords);
        const targetAddress = await reverseGeocode(targetCoords);

        setAdresseDepart(pickupAddress);
        setAdresseDestination(targetAddress);
        setTrajetChoisi(feature.properties);
        setMontrerTrajet(true);
      }
    }

    console.log("montrerTrajet:", montrerTrajet);
    console.log("trajetChoisi:", trajetChoisi);

  };

  // Apparence de la carte
  return (
    <View style={{ flex: 1 }}>
      {prochainTrajet && (
        <View style={{
          position: 'absolute',
          top: 50,
          alignSelf: 'center',
          backgroundColor: couleurs.vertPrincipal,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
          zIndex: 10,
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            🚴‍♂️ Trajet en cours: {prochainTrajet.origin} ➔ {prochainTrajet.destination}
          </Text>
        </View>
      )}

      <MapView
        style={{ flex: 1 }}
        styleURL={estDarkMode ? Mapbox.StyleURL.Dark : Mapbox.StyleURL.Street}
        compassEnabled
        logoEnabled={false}
        attributionEnabled={false}
        localizeLabels
      >
        {/** Ceci affiche la position de l'utilisateur sur la carte. */}
        <UserLocation
          onUpdate={(location) => {
            const coords: [number, number] = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            setUserCoords(coords);
            setUserLat(location.coords.latitude);
            setUserLong(location.coords.longitude);
          }}
        />

        <Camera ref={cameraRef} zoomLevel={14} centerCoordinate={userCoords} />

       {/** Ceci représente la position de l'utilisateur sur la carte */}
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

        <ShapeSource
          id="conducteurs"
          cluster
          clusterRadius={50}
          shape={points}
          onPress={handlePinPress}
        >
          {/** 
           * Ceci vérifie à quel point la carte est agrandie. Si la carte n'est pas
           * assez agrandie, c'est le nombre de conducteurs qui est affiché sur la carte.
           * Sinon, chaque conducteur est affiché individuellement sur la carte.
           */}
          <CircleLayer
            id="clusters"
            filter={['has', 'point_count']}
            style={{
              circleColor: couleurs.vertPrincipal,
              circleRadius: [
                'step',
                ['get', 'point_count'],
                20, 10, 25, 25, 30,
              ],
              circleStrokeColor: couleurs.blanc,
              circleStrokeWidth: 3,
              circleOpacity: 0.9,
            }}
          />
          <SymbolLayer
            id="cluster-count"
            filter={['has', 'point_count']}
            style={{
              textField: ['get', 'point_count'],
              textSize: 16,
              textColor: couleurs.blanc,
              textHaloColor: couleurs.vertPrincipal,
              textHaloWidth: 1.5,
              textIgnorePlacement: true,
              textAllowOverlap: true,
            }}
          />
          <SymbolLayer
            id="conducteurs-icons"
            filter={['!', ['has', 'point_count']]}
            style={{
              iconImage: 'pin',
              iconSize: 0.5,
              iconAllowOverlap: true,
              iconAnchor: 'bottom',
            }}
          />
        </ShapeSource>

        <Images images={{ pin }} />

        {/** Ceci trace sur la carte une ligne qui relie le point de départ et la destination. */}
        {routeGeoJSON && (
          <ShapeSource id="route" shape={routeGeoJSON}>
            <LineLayer
              id="route-line"
              style={{
                lineColor: couleurs.vertPrincipal,
                lineWidth: 5,
              }}
            />
          </ShapeSource>
        )}
      </MapView>

        {/** Bouton pour aller à la position de l'utilisateur sur la carte. */}
      <BoutonLocalisation cameraRef={cameraRef} userCoords={userCoords} />

        {/** Bouton '+' qui permet à l'utilisateur de créer un trajet. */}
      <RechercheTrajet
        onSheetChange={setIsSearchOpen}
        isAnotherSheetOpen={isRideDetailsOpen || montrerTrajet || montrerSelecteurHoraire}
      />

      {/* Bottom Sheet Overlay */}
      {montrerTrajet && trajetChoisi && (
        <TrajetBottomSheet
          ride={trajetChoisi}
          adresseDepart={adresseDepart}
          adresseDestination={adresseDestination}
          distanceKm={routeGeoJSON} // or calculate real one
          visible={true}
          onClose={fermerTrajet}
        />
      )}

      {montrerSelecteurHoraire && trajetChoisi && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50 }}>
          <SelecteurHoraire
            ride={trajetChoisi}
            onClose={() => setMontrerSelecteurHoraire(false)}
          />
        </View>
      )}
    </View>
  );
}
