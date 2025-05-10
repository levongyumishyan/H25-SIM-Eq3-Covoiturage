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
import { colors } from './Colors';
import LocateButton from './LocateButton';
import pin from "../assets/images/pin.png";
import { BASE_URL } from '../apiConfig';
import { estDarkMode, useAuthStore } from './VariablesGlobales';
import TrajetSearch from './TrajetSearch';
import Trajet from './Trajet';
import SchedulePicker from './SchedulePicker';
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
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const [drivers, setDrivers] = useState([]);

  const userLat = useAuthStore((state) => state.userLat);
  const setUserLat = useAuthStore((state) => state.setUserLat);
  const setUserLong = useAuthStore((state) => state.setUserLong);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/trajets`);
      const text = await response.text();

      try {
        const data = JSON.parse(text);
        setDrivers(data);
      } catch (parseError) {
        console.error('❌ Failed to parse response as JSON:', text);
      }

    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  useEffect(() => {
    fetchDrivers();
    const interval = setInterval(fetchDrivers, 10000);
    return () => clearInterval(interval);
  }, []);

  const points = {
    type: 'FeatureCollection',
    features: drivers.map((driver, index) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [driver.long, driver.lat],
      },
      properties: { ...driver, id: index },
    })),
  };

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
      return json.routes[0]?.geometry || null;
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
      const rideCoords = feature.geometry.coordinates;
      const targetLong = feature.properties.targetLong;
      const targetLat = feature.properties.targetLat;

      if (typeof targetLong !== 'number' || typeof targetLat !== 'number') {
        console.warn('Target coordinates missing');
        return;
      }

      const targetCoords = [targetLong, targetLat];
      const route = await fetchRoute([rideCoords, targetCoords]);
      if (route) {
        setRouteGeoJSON({
          type: 'FeatureCollection',
          features: [{ type: 'Feature', geometry: route, properties: {} }],
        });

        const pickupAddress = await reverseGeocode(rideCoords);
        const targetAddress = await reverseGeocode(targetCoords);

        setPickupStreet(pickupAddress);
        setTargetStreet(targetAddress);
        setSelectedRide(feature.properties);
        setShowTrajet(true);
      }
    }

    console.log("✅ showTrajet:", showTrajet);
    console.log("✅ selectedRide:", selectedRide);

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
            setUserLat(location.coords.latitude);
            setUserLong(location.coords.longitude);
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
                20, 10, 25, 25, 30,
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

      <TrajetSearch
        onSheetChange={setIsSearchOpen}
        isAnotherSheetOpen={isRideDetailsOpen}
      />

      {/* Bottom Sheet Overlay */}
      {showTrajet && selectedRide && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50 }}>
          <Trajet
            ride={selectedRide}
            pickupStreet={pickupStreet}
            targetStreet={targetStreet}
            onClose={closeTrajet}
            onSchedulePress={() => {
              setShowTrajet(false);
              setShowSchedulePicker(true);
            }}
          />
        </View>
      )}

      {showSchedulePicker && selectedRide && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50 }}>
          <SchedulePicker
            ride={selectedRide}
            onClose={() => setShowSchedulePicker(false)}
          />
        </View>
      )}
    </View>
  );
}
