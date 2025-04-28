import React, { useRef, useMemo, useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './Colors';
import { styles } from './Styles';
import SearchBox from './SearchBox';

export default function TrajetSearch({ onSheetChange, isAnotherSheetOpen }) {
  const sheetRef = useRef<BottomSheet>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const snapPoints = useMemo(() => ['30%', '50%'], []);

  const openBottomSheet = () => {
    setIsSheetOpen(true);
    onSheetChange(true);
    sheetRef.current?.expand();
  };

  const handleSheetChange = (index: number) => {
    if (index === -1) {
      setIsSheetOpen(false);
      onSheetChange(false);
    }
  };

  const shouldShowPlusButton = !isSheetOpen && !isAnotherSheetOpen;

  return (
    <>
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

      {/* Plus button (only show if no bottom sheet at all is open) */}
      {shouldShowPlusButton && (
          <TouchableOpacity style={styles.trajetButton} onPress={openBottomSheet}>
            <Ionicons name="add" size={30} color={colors.blanc} />
          </TouchableOpacity>
      )}
    </>
  );
}
