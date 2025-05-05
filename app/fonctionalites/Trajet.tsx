import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { couleurs } from './Couleurs';
import { useRideStore } from './useRideStore';
import { Ionicons } from '@expo/vector-icons';

const Trajet = ({ visible, onClose, selectedRide, pickupStreet, targetStreet, onSheetChange, onAddressPress }) => {
  const sheetRef = useRef<BottomSheet>(null);
  const { setUpcomingRide } = useRideStore();

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const distanceKm = selectedRide
    ? calculateDistance(
        selectedRide.lat,
        selectedRide.long,
        selectedRide.targetLat,
        selectedRide.targetLong
      ).toFixed(2)
    : null;

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
        distance: selectedRide.distance,
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
        <Ionicons name="footsteps-outline" size={30} color={couleurs.vertPrincipal} />
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Trajet proposé</Text>

        <TouchableOpacity onPress={onAddressPress}>
          <Text style={{ marginTop: 10, fontSize: 16 }}>{pickupStreet}</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 16 }}>➔</Text>

        <TouchableOpacity onPress={onAddressPress}>
          <Text style={{ marginBottom: 10, fontSize: 16 }}>{targetStreet}</Text>
        </TouchableOpacity>

        {distanceKm && (
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Distance: {distanceKm} km
          </Text>
        )}

        <TouchableOpacity
          onPress={handleJoindre}
          style={{
            backgroundColor: couleurs.vertPrincipal,
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
