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

// Configuration de l'access token Mapbox
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_ACCESS_KEY || '');

// Ignorer les warnings spécifiques à Mapbox dans la console
LogBox.ignoreLogs([
  'ViewTagResolver',
  'Mapbox [error] ViewTagResolver',
]);

/**
 * Composant principal de l'écran carte
 * Affiche une carte interactive avec les trajets disponibles et permet la gestion des trajets
 */
export default function EcranCarte() {
  // Référence pour contrôler la caméra de la carte
  const cameraRef = useRef<Camera>(null);
  
  // État du prochain trajet depuis le store global
  const { prochainTrajet } = useRideStore();
  
  // États locaux pour la gestion de l'interface
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null); // Coordonnées de l'utilisateur
  const [trajetChoisi, setTrajetChoisi] = useState(null); // Trajet sélectionné par l'utilisateur
  const [montrerTrajet, setMontrerTrajet] = useState(false); // Contrôle l'affichage du bottom sheet
  const [routeGeoJSON, setRouteGeoJSON] = useState(null); // Données GeoJSON pour afficher la route
  const [adresseDepart, setAdresseDepart] = useState(''); // Adresse de départ formatée
  const [adresseDestination, setAdresseDestination] = useState(''); // Adresse de destination formatée
  const [isSearchOpen, setIsSearchOpen] = useState(false); // État d'ouverture de la recherche
  const [isRideDetailsOpen, setIsRideDetailsOpen] = useState(false); // État des détails du trajet
  const [montrerSelecteurHoraire, setMontrerSelecteurHoraire] = useState(false); // État du sélecteur d'horaire
  const [conducteurs, setConducteurs] = useState([]); // Liste des conducteurs/trajets disponibles

  // Fonctions du store global pour sauvegarder la position de l'utilisateur
  const setUserLat = useAuthStore((state) => state.setUserLat);
  const setUserLong = useAuthStore((state) => state.setUserLong);

  /**
   * Fonction pour récupérer la liste des conducteurs depuis l'API
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
      }
    } catch (error) {
      console.error('Network error fetching trajets:', error.message);
    }
  };

  // Effet pour charger les conducteurs au montage et les actualiser périodiquement
  useEffect(() => {
    chercherConducteurs();
    const interval = setInterval(chercherConducteurs, 10000); // Actualisation toutes les 10 secondes
    return () => clearInterval(interval);
  }, []);

  /**
   * Structure GeoJSON pour afficher les points des conducteurs sur la carte
   * Chaque conducteur devient un point géographique avec ses propriétés
   */
  const points = {
    type: 'FeatureCollection',
    features: conducteurs.map((driver, index) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [driver.long, driver.lat], // Coordonnées longitude, latitude
      },
      properties: { 
        ...driver, // Toutes les propriétés du conducteur
        id: index, // Index unique pour l'identification
      },
    })),
  };

  // Effet pour demander les permissions de géolocalisation
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
   * Fonction pour calculer un itinéraire entre deux points via l'API Mapbox Directions
   * @param {Array} waypoints - Tableau de coordonnées [longitude, latitude]
   * @returns {Object|null} - Géométrie de la route ou null si erreur
   */
  const chercherRoute = async (waypoints) => {
    // Validation des coordonnées avant l'appel API
    for (let i = 0; i < waypoints.length; i++) {
      const [lng, lat] = waypoints[i];
      if (typeof lng !== 'number' || typeof lat !== 'number' || 
          isNaN(lng) || isNaN(lat) || 
          Math.abs(lng) > 180 || Math.abs(lat) > 90) {
        return null;
      }
    }
    
    // Formatage des coordonnées pour l'URL de l'API
    const coords = waypoints.map(coord => `${coord[0]},${coord[1]}`).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&overview=full&radiuses=500;500&access_token=${process.env.EXPO_PUBLIC_ACCESS_KEY}`;
    
    try {
      const response = await fetch(url);
      const json = await response.json();
      
      // Retourne la géométrie de la première route trouvée
      if (json.routes && json.routes.length > 0) {
        return json.routes[0].geometry;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      return null;
    }
  };

  /**
   * Fonction pour convertir des coordonnées en adresse lisible via l'API Mapbox Geocoding
   * @param {Array} coords - Coordonnées [longitude, latitude]
   * @returns {string} - Nom de lieu formaté ou chaîne vide si erreur
   */
  const reverseGeocode = async ([lng, lat]: [number, number]) => {
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

  /**
   * Fonction pour fermer le bottom sheet et réinitialiser les états liés au trajet
   */
  const fermerTrajet = () => {
    setMontrerTrajet(false);
    setTrajetChoisi(null);
    setRouteGeoJSON(null);
    setAdresseDepart('');
    setAdresseDestination('');
  };

  /**
   * Gestionnaire d'événement pour les clics sur les pins de la carte
   * Gère à la fois les clusters et les pins individuels
   * @param {Object} event - Événement de clic contenant les features
   */
  const handlePinPress = async (event) => {
    const feature = event.features?.[0];
    if (!feature) return;

    // Si c'est un cluster, zoom pour décomposer le cluster
    if (feature.properties?.point_count) {
      const [longitude, latitude] = feature.geometry.coordinates;
      cameraRef.current?.setCamera({
        centerCoordinate: [longitude, latitude],
        zoomLevel: 18,
        animationDuration: 500,
      });
    } else {
      // Traitement d'un pin individuel
      const rideCoords: [number, number] = feature.geometry.coordinates;
      const targetLong = feature.properties.targetLong;
      const targetLat = feature.properties.targetLat;

      // Vérification de la validité des coordonnées de destination
      if (typeof targetLong !== 'number' || typeof targetLat !== 'number' || 
          isNaN(targetLong) || isNaN(targetLat)) {
        // Fallback: afficher le trajet sans route si coordonnées invalides
        const rideData = feature.properties;
        setTrajetChoisi(rideData);
        setAdresseDepart(rideData.pickupAddress || 'Adresse de départ inconnue');
        setAdresseDestination(rideData.targetAddress || 'Destination inconnue');
        setMontrerTrajet(true);
        return;
      }

      const targetCoords: [number, number] = [targetLong, targetLat];
      
      try {
        // Calcul de l'itinéraire
        const route = await chercherRoute([rideCoords, targetCoords]);
        
        if (route) {
          // Si route trouvée, récupérer les adresses en parallèle pour optimiser
          const [pickupAddress, targetAddress] = await Promise.all([
            reverseGeocode(rideCoords),
            reverseGeocode(targetCoords)
          ]);

          // Configuration de la route pour l'affichage sur la carte
          setRouteGeoJSON({
            type: 'FeatureCollection',
            features: [{ type: 'Feature', geometry: route, properties: {} }],
          });

          // Mise à jour des états avec les données récupérées
          setAdresseDepart(pickupAddress || feature.properties.pickupAddress || 'Adresse de départ');
          setAdresseDestination(targetAddress || feature.properties.targetAddress || 'Destination');
          setTrajetChoisi(feature.properties);
          setMontrerTrajet(true);
        } else {
          // Fallback: afficher le trajet sans route si calcul échoue
          setTrajetChoisi(feature.properties);
          setAdresseDepart(feature.properties.pickupAddress || 'Adresse de départ');
          setAdresseDestination(feature.properties.targetAddress || 'Destination');
          setMontrerTrajet(true);
        }
      } catch (error) {
        // Gestion d'erreur: afficher le trajet avec données de base
        console.error('Error in handlePinPress:', error);
        setTrajetChoisi(feature.properties);
        setAdresseDepart(feature.properties.pickupAddress || 'Adresse de départ');
        setAdresseDestination(feature.properties.targetAddress || 'Destination');
        setMontrerTrajet(true);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Bannière affichant le prochain trajet de l'utilisateur */}
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

      {/* Composant principal de la carte Mapbox */}
      <MapView
        style={{ flex: 1 }}
        styleURL={estDarkMode ? Mapbox.StyleURL.Dark : Mapbox.StyleURL.Street} // Style adaptatif selon le thème
        compassEnabled
        logoEnabled={false}
        attributionEnabled={false}
        localizeLabels // Localisation automatique des labels
      >
        {/* Composant pour afficher et suivre la position de l'utilisateur */}
        <UserLocation
          onUpdate={(location) => {
            const coords: [number, number] = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            setUserCoords(coords);
            // Sauvegarde de la position dans le store global
            setUserLat(location.coords.latitude);
            setUserLong(location.coords.longitude);
          }}
        />

        {/* Contrôleur de caméra pour la navigation sur la carte */}
        <Camera ref={cameraRef} zoomLevel={14} centerCoordinate={userCoords} />
        
        {/* Indicateur de position de l'utilisateur avec animation */}
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

        {/* Source de données pour les points des conducteurs avec clustering */}
        <ShapeSource
          id="conducteurs"
          cluster
          clusterRadius={50} // Rayon de clustering en pixels
          shape={points}
          onPress={handlePinPress}
        >
          {/* Style pour les clusters (groupes de points) */}
          <CircleLayer
            id="clusters"
            filter={['has', 'point_count']} // Filtre pour identifier les clusters
            style={{
              circleColor: couleurs.vertPrincipal,
              circleRadius: [
                'step',
                ['get', 'point_count'],
                20, 10, 25, 25, 30, // Taille variable selon le nombre de points
              ],
              circleStrokeColor: couleurs.blanc,
              circleStrokeWidth: 3,
              circleOpacity: 0.9,
            }}
          />
          
          {/* Texte affichant le nombre d'éléments dans chaque cluster */}
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
          
          {/* Style pour les points individuels (non-clusters) */}
          <SymbolLayer
            id="conducteurs-icons"
            filter={['!', ['has', 'point_count']]} // Filtre pour exclure les clusters
            style={{
              iconImage: 'pin',
              iconSize: 0.5,
              iconAllowOverlap: true,
              iconAnchor: 'bottom',
            }}
          />
        </ShapeSource>

        {/* Chargement des images utilisées sur la carte */}
        <Images images={{ pin }} />

        {/* Affichage conditionnel de la route calculée */}
        {routeGeoJSON && (
          <ShapeSource id="route" shape={routeGeoJSON}>
            <LineLayer
              id="route-line"
              style={{
                lineColor: couleurs.vertSecondaire,
                lineWidth: 3,
                lineOpacity: 0.9,
                lineCap: 'round', // Extrémités arrondies
                lineJoin: 'round', // Jointures arrondies
              }}
            />
          </ShapeSource>
        )}
      </MapView>

      {/* Bouton de localisation pour centrer la carte sur l'utilisateur */}
      <BoutonLocalisation cameraRef={cameraRef} userCoords={userCoords} />

      {/* Composant de recherche de trajets */}
      <RechercheTrajet
        onSheetChange={setIsSearchOpen}
        isAnotherSheetOpen={isRideDetailsOpen || montrerTrajet || montrerSelecteurHoraire} // Gestion des conflits entre bottom sheets
      />

      {/* Bottom sheet pour afficher les détails du trajet sélectionné */}
      {montrerTrajet && trajetChoisi && (
        <TrajetBottomSheet
          ride={trajetChoisi}
          visible={montrerTrajet}
          onClose={fermerTrajet}
          onStateChange={(isOpen) => {
            if (!isOpen) {
              fermerTrajet(); // Fermeture automatique quand le sheet se ferme
            }
          }}
        />
      )}

      {/* Bottom sheet pour la sélection d'horaires */}
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