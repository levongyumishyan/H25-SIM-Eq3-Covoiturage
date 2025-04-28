import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { colors } from './Colors';
import { useRideStore } from './useRideStore';
import { Ionicons } from '@expo/vector-icons';

const Trajet = ({ visible, onClose, selectedRide, pickupStreet, targetStreet, onSheetChange }) => {
  const sheetRef = useRef<BottomSheet>(null);
  const { setUpcomingRide } = useRideStore();

  useEffect(() => {
    if (visible) {
      onSheetChange(true);
      sheetRef.current?.expand();
    } else {
      onSheetChange(false);
      sheetRef.current?.close();
    }
  }, [visible]);

  const handleJoindre = () => {
    if (selectedRide) {
      const rideToStart = {
        id: selectedRide.id,
        origin: pickupStreet,
        destination: targetStreet,
        distance: 4.5,
      };
      setUpcomingRide(rideToStart);
      onClose();
    }
  };

  const snapPoints = ['60%', '60%'];

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
    >
      <BottomSheetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <Ionicons name="bicycle-outline" size={30} color={colors.vertPrincipal} />
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Trajet proposé</Text>
        <Text style={{ marginTop: 10, fontSize: 16 }}>{pickupStreet}</Text>
        <Text style={{ fontSize: 16 }}>➔</Text>
        <Text style={{ marginBottom: 20, fontSize: 16 }}>{targetStreet}</Text>

        <TouchableOpacity
          onPress={handleJoindre}
          style={{
            backgroundColor: colors.vertPrincipal,
            padding: 12,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Joindre</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default Trajet;
