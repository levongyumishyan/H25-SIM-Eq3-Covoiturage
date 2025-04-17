import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import Mapbox, {
  Camera,
  CircleLayer,
  Images,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
  UserLocation,
} from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { featureCollection, point } from '@turf/helpers';
import pin from "../assets/images/pin.png";
import scooters from "../data/drivers.json";
import { colors } from './Colors';
import { estDarkMode } from './VariablesGlobales';
import LocateButton from './LocateButton';
import SearchBox from './SearchBox';
import { styles } from './Styles';
import { TouchableOpacity, Text } from 'react-native';
import { Button } from './Button';
import Trajet from './Trajet';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_ACCESS_KEY || '');

export default function Map() {
  const cameraRef = useRef<Camera>(null);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);

  // Convert scooters to valid GeoJSON FeatureCollection
  const points = featureCollection(
    scooters.map((scooter, index) =>
      point([scooter.long, scooter.lat], { id: index })
    )
  );

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

        <UserLocation
          onUpdate={(location) => {
            const coords: [number, number] = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            setUserCoords(coords);
          }}
        />

        <Camera
          ref={cameraRef}
          zoomLevel={14}
          centerCoordinate={userCoords}
        />

        <LocationPuck
          puckBearingEnabled
          puckBearing="heading"
          pulsing={{ isEnabled: true }}
        />

        <ShapeSource id="scooters" cluster clusterRadius={50} shape={points}>
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
      </MapView>
      <LocateButton cameraRef={cameraRef} userCoords={userCoords} />
      <Trajet/>
    </View>
  );
}
