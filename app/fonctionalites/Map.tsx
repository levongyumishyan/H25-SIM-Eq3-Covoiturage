import React, { useRef, useState, useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import Mapbox, { MapView, ShapeSource, SymbolLayer, CircleLayer, Camera, UserLocation, Images, LineLayer, LocationPuck } from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import * as Location from 'expo-location';
import { LogBox } from 'react-native';
import { colors } from './Colors';
import LocateButton from './LocateButton';
import pin from "../assets/images/pin.png";
import { BASE_URL } from '../apiConfig';
import { estDarkMode } from './VariablesGlobales';
import TrajetSearch from './TrajetSearch';
import Trajet from './Trajet';
import { useRideStore } from './useRideStore';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_ACCESS_KEY || '');

LogBox.ignoreLogs([
  'ViewTagResolver',
  'Mapbox [error] ViewTagResolver',
]);

export default function MapScreen() {
  const cameraRef = useRef<Camera>(null);
  const { upcomingRide } = useRideStore();

  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showTrajet, setShowTrajet] = useState(false);
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  const [pickupStreet, setPickupStreet] = useState('');
  const [targetStreet, setTargetStreet] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRideDetailsOpen, setIsRideDetailsOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/trajets`);
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  useEffect(() => {
    fetchDrivers(); // Fetch once immediately

    const interval = setInterval(fetchDrivers, 10000); // 🔥 Fetch every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const points = useMemo(() => featureCollection(
    drivers.map((driver, index) => point([driver.long, driver.lat], { ...driver, id: index }))
  ), [drivers]);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission denied');
      }
    };
    requestPermission();
  }, []);

  const fetchRoute = async (waypoints) => {
    const coords = waypoints.map(coord => `${coord[0]},${coord[1]}`).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&overview=full&radiuses=50;50&access_token=${process.env.EXPO_PUBLIC_ACCESS_KEY}`;
  
    try {
      const response = await fetch(url);
      const json = await response.json();
      const route = json.routes[0].geometry;
      return route;
    } catch (error) {
      console.error('Error fetching route:', error);
      return null;
    }
  };
  

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

  const closeTrajet = () => {
    setShowTrajet(false);
    setSelectedRide(null);
    setRouteGeoJSON(null);
    setPickupStreet('');
    setTargetStreet('');
  };

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
      const rideCoords = [feature.geometry.coordinates[0], feature.geometry.coordinates[1]];
      const targetLong = feature.properties.targetLong;
      const targetLat = feature.properties.targetLat;
  
      // 🛑 Safety Check
      if (typeof targetLong !== 'number' || typeof targetLat !== 'number') {
        console.warn('Target coordinates missing');
        return;
      }
  
      const targetCoords = [targetLong, targetLat];
  
      const route = await fetchRoute([rideCoords, targetCoords]);
      if (route) {
        setRouteGeoJSON({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: route,
              properties: {},
            },
          ],
        });
  
        const pickupAddress = await reverseGeocode(rideCoords);
        const targetAddress = await reverseGeocode(targetCoords);
  
        setPickupStreet(pickupAddress);
        setTargetStreet(targetAddress);
        setSelectedRide(feature.properties);
        setShowTrajet(true);
      }
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      
      {upcomingRide && (
        <View style={{
          position: 'absolute',
          top: 50,
          alignSelf: 'center',
          backgroundColor: colors.vertPrincipal,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
          zIndex: 10,
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            🚴‍♂️ Trajet en cours: {upcomingRide.origin} ➔ {upcomingRide.destination}
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
        <UserLocation
          onUpdate={(location) => {
            const coords: [number, number] = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            setUserCoords(coords);
          }}
        />

        <Camera ref={cameraRef} zoomLevel={14} centerCoordinate={userCoords} />

        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

        <ShapeSource
          id="drivers"
          cluster
          clusterRadius={50}
          shape={points}
          onPress={handlePinPress}
        >
          <CircleLayer
            id="clusters"
            filter={['has', 'point_count']}
            style={{
              circleColor: colors.vertPrincipal,
              circleRadius: [
                'step',
                ['get', 'point_count'],
                20,
                10, 25,
                25, 30,
              ],
              circleStrokeColor: colors.blanc,
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
              textColor: colors.blanc,
              textHaloColor: colors.vertPrincipal,
              textHaloWidth: 1.5,
              textIgnorePlacement: true,
              textAllowOverlap: true,
            }}
          />
          <SymbolLayer
            id="drivers-icons"
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

        {routeGeoJSON && (
          <ShapeSource id="route" shape={routeGeoJSON}>
            <LineLayer
              id="route-line"
              style={{
                lineColor: colors.vertPrincipal,
                lineWidth: 5,
              }}
            />
          </ShapeSource>
        )}
      </MapView>

      <LocateButton cameraRef={cameraRef} userCoords={userCoords} />
      <TrajetSearch onSheetChange={setIsSearchOpen} isAnotherSheetOpen={isRideDetailsOpen} />
      <Trajet
        visible={showTrajet}
        onClose={closeTrajet}
        selectedRide={selectedRide}
        pickupStreet={pickupStreet}
        targetStreet={targetStreet}
        onSheetChange={setIsRideDetailsOpen}
      />
    </View>
  );
}
