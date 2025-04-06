import React from 'react';
import { Text, Image, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ScooterMarkers, { useScooter } from './ScooterProvider';
import { useEffect, useRef } from 'react';
import scooterImage from '../assets/images/scooter.png';
import { FontAwesome6 } from '@expo/vector-icons';
import { Button } from './Button'

export default function SelectedScooterSheet() {
  const { selectedScooter, duration, distance } = useScooter();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const isNearby = distance < 30; // or whatever threshold you use (in meters)

  useEffect(() => {
    if (selectedScooter) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [selectedScooter]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[200]}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: '#414442' }}
    >
      <BottomSheetView style={{ flex: 1, padding: 10, gap: 20 }}>
        {/* Top Row: Image + Info + Distance */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image source={scooterImage} style={{ width: 60, height: 60 }} />
          <View style={{ flex: 1, gap: 5 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Lime - S</Text>
            <Text style={{ color: 'gray', fontSize: 18 }}>
              id-{selectedScooter?.id} • Madison Avenue
            </Text>
          </View>

          <View style={{ gap: 10, alignItems: 'flex-end' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <FontAwesome6 name="flag-checkered" size={18} color="#42E100" />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
                {(distance / 1000).toFixed(1)} km
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <FontAwesome6 name="clock" size={18} color="#42E100" />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
                {(duration / 60).toFixed(0)} min
              </Text>
            </View>
          </View>
        </View>

        {/* Button */}
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', paddingBottom: 10 }}>
          <Button title="Start Ride" disabled={!isNearby} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
