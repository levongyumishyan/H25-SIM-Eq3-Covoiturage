import React, { useRef, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './Colors';
import SearchBox from './SearchBox';
import { styles } from './Styles';

export default function TrajetSearch({ onSheetChange }) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '50%'], []);

  const openBottomSheet = () => {
    onSheetChange(true); // tell MapScreen a sheet is opening
    sheetRef.current?.expand(); // open the search box
  };

  const handleSheetChange = (index: number) => {
    if (index === -1) {
      onSheetChange(false); // tell MapScreen a sheet is closing
    }
  };

  return (
    <>
      {/* BottomSheet itself */}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChange}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <SearchBox />
        </BottomSheetView>
      </BottomSheet>
      
        <TouchableOpacity
          style={[styles.trajetButton]}
          onPress={openBottomSheet}
        >
          <Ionicons name="add" size={30} color={colors.blanc} />
        </TouchableOpacity>
    </>
  );
}
