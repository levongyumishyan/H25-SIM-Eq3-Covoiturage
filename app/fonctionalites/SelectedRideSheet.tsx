import React, { useRef, useEffect } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from './Button';
import { Ionicons } from '@expo/vector-icons';

const SelectedRideSheet = ({ ride, onClose }) => {
  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (ride) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [ride]);

  if (!ride) return null;

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={[300]}
      enablePanDownToClose
      onClose={onClose}
    >
      <BottomSheetView style={{ flex: 1, padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Ionicons name="bicycle" size={30} color="#42E100" />
          <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>
            {ride.nom || `Ride ID ${ride.id}`}
          </Text>
        </View>

        <Text>Latitude: {ride.lat}</Text>
        <Text>Longitude: {ride.long}</Text>
        {/* Add any other ride info you want */}

        <View style={{ marginTop: 20 }}>
          <Button title="Start Ride" onPress={() => console.log('Starting Ride...')} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SelectedRideSheet;
