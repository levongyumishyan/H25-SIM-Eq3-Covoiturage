import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import Mapbox, {
  MapView,
  ShapeSource,
  SymbolLayer,
  CircleLayer,
  Camera,
  UserLocation,
  Images,
  LineLayer,
  LocationPuck,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import * as Location from 'expo-location';
import { LogBox } from 'react-native';

import { colors } from './Colors';
import LocateButton from './LocateButton';
import Trajet from './Trajet';
import scooters from '../data/drivers.json';
import pin from "../assets/images/pin.png";
import { estDarkMode } from './VariablesGlobales';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_ACCESS_KEY || '');

LogBox.ignoreLogs([
  'ViewTagResolver',
  'Mapbox [error] ViewTagResolver',
]);

export default function MapScreen() {
  const cameraRef = useRef<Camera>(null);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showTrajet, setShowTrajet] = useState(false);
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  const [pickupStreet, setPickupStreet] = useState('');
  const [targetStreet, setTargetStreet] = useState('');

  const points = useMemo(() => featureCollection(
    scooters.map((scooter, index) =>
      point([scooter.long, scooter.lat], { ...scooter, id: index })
    )
  ), []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission denied');
      }
    })();
  }, []);

  const fetchRoute = async (waypoints) => {
    const coords = waypoints.map(coord => `${coord[0]},${coord[1]}`).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&access_token=${process.env.EXPO_PUBLIC_ACCESS_KEY}`;

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

  const openTrajet = useCallback(() => {
    setSelectedRide(null);
    setShowTrajet(true);
    setRouteGeoJSON(null);
    setPickupStreet('');
    setTargetStreet('');
  }, []);

  const closeTrajet = useCallback(() => {
    setShowTrajet(false);
    setSelectedRide(null);
    setRouteGeoJSON(null);
    setPickupStreet('');
    setTargetStreet('');
  }, []);

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
      const targetCoords = [feature.properties.targetLong, feature.properties.targetLat];

      // 🚨 Only route from scooter to target
      const route = await fetchRoute([rideCoords, targetCoords]);
      if (route) {
        setRouteGeoJSON({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: route,
              properties: {},
            }
          ],
        });
      }

      const pickupAddress = await reverseGeocode(rideCoords);
      const targetAddress = await reverseGeocode(targetCoords);

      setPickupStreet(pickupAddress);
      setTargetStreet(targetAddress);

      setSelectedRide(feature.properties);
      setShowTrajet(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        styleURL={estDarkMode ? Mapbox.StyleURL.Dark : Mapbox.StyleURL.Street}
        compassEnabled
        logoEnabled={false}
        attributionEnabled={false}
        localizeLabels
      >
        {/* User location puck */}
        <UserLocation
          onUpdate={(location) => {
            const coords: [number, number] = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            setUserCoords(coords);
          }}
        />

        {/* Camera */}
        <Camera
          ref={cameraRef}
          zoomLevel={14}
          centerCoordinate={userCoords}
        />

        {/* Location Puck */}
        <LocationPuck
          puckBearingEnabled
          puckBearing="heading"
          pulsing={{ isEnabled: true }}
        />

        {/* Scooters */}
        <ShapeSource
          id="scooters"
          cluster
          clusterRadius={50}
          shape={points}
          onPress={handlePinPress}
        >
          <CircleLayer
            id="clusters"
            filter={['has', 'point_count']}
            style={{
              circlePitchAlignment: 'map',
              circleColor: colors.vertPrincipal,
              circleRadius: 20,
              circleOpacity: 1,
              circleStrokeColor: colors.blanc,
              circleStrokeWidth: 2,
            }}
          />
          <SymbolLayer
            id="cluster-count"
            filter={['has', 'point_count']}
            style={{
              textField: ['get', 'point_count'],
              textSize: 18,
              textColor: colors.blanc,
              textIgnorePlacement: true,
              textAllowOverlap: true,
            }}
          />
          <SymbolLayer
            id="scooter-icons"
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

        {/* Route */}
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

      {/* Locate Button */}
      <LocateButton cameraRef={cameraRef} userCoords={userCoords} />

      {/* Trajet BottomSheet */}
      <Trajet
        visible={showTrajet}
        onClose={closeTrajet}
        onManualOpen={openTrajet}
        selectedRide={selectedRide}
        pickupStreet={pickupStreet}
        targetStreet={targetStreet}
      />
    </View>
  );
}
