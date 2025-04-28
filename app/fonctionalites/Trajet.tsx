import React, { useRef, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import SearchBox from './SearchBox';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Styles';

const Trajet = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '50%'], []);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openBottomSheet = () => {
    sheetRef.current?.expand();
  };

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      setIsSheetOpen(false); // Sheet closed
    } else {
      setIsSheetOpen(true); // Sheet opened
    }
  };

  return (
    <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges} // This detects opening/closing
      >
        <BottomSheetView style={{ flex: 1, padding: 16 }}>
          <SearchBox />
        </BottomSheetView>
      </BottomSheet>

      {/* ➕ Button only visible when sheet is closed */}
      {!isSheetOpen && (
        <TouchableOpacity style={styles.trajetButton} onPress={openBottomSheet}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Trajet;
