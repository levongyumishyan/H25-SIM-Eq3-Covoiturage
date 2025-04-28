import React, { useRef, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Styles';
import SearchBox from './SearchBox';
import { colors } from './Colors';

const Trajet = ({ visible, onClose, onManualOpen, selectedRide, pickupStreet, targetStreet }) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '50%'], []);

  useEffect(() => {
    if (visible) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [visible]);

  const handleSheetChanges = (index) => {
    if (index === -1) {
      onClose();
    }
  };

  const handleJoindre = () => {
    console.log('Joindre pressed 🚴'); 
    // add later: start ride timer, animation, etc
  };

  return (
    <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} pointerEvents="box-none">
      
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>
          {selectedRide ? (
            <View style={{ flex: 1 }}>
              <Text style={styles.subtitle}>Départ:</Text>
              <Text style={styles.label}>{pickupStreet || "Chargement..."}</Text>

              <Text style={[styles.subtitle, { marginTop: 20 }]}>Destination:</Text>
              <Text style={styles.label}>{targetStreet || "Chargement..."}</Text>

              <View style={{ marginTop: 30 }}>
                <TouchableOpacity style={styles.button} onPress={handleJoindre}>
                  <Text style={styles.buttonText}>Joindre</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <SearchBox />
          )}
        </BottomSheetView>
      </BottomSheet>

      {!visible && (
        <TouchableOpacity style={styles.trajetButton} onPress={onManualOpen}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Trajet;
