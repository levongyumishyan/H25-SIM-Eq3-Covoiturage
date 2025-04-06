import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import Mapbox, {
  Camera,
  LocationPuck,
  MapView,
  UserLocation,
} from '@rnmapbox/maps';
import * as Location from 'expo-location';

import LineRoute from './LineRoute';
import ScooterMarkers, { useScooter } from './ScooterProvider';
import { estDarkMode } from './VariablesGlobales';
import LocateButton from './LocateButton';
import SearchBox from './SearchBox';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_ACCESS_KEY || '');

export default function Map() {
  const cameraRef = useRef<Camera>(null);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const { directionCoordinates } = useScooter();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission denied');
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        styleURL={estDarkMode ? Mapbox.StyleURL.Dark : Mapbox.StyleURL.Street}
        compassEnabled
        logoEnabled
        attributionEnabled={false}
        localizeLabels
      >

        <Camera ref={cameraRef} />

        <UserLocation
          onUpdate={(location) => {
            const coords: [number, number] = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            setUserCoords(coords);
          }}
        />

        <LocationPuck
          puckBearingEnabled
          puckBearing="heading"
          pulsing={{ isEnabled: true }}
        />

        <ScooterMarkers />
        {directionCoordinates && <LineRoute coordinates={directionCoordinates} />}
      </MapView>
      <SearchBox/>
      <LocateButton cameraRef={cameraRef} userCoords={userCoords} />

    </View>
  );
}
