import React, { useRef, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { couleurs } from './Couleurs';
import { styles } from './Styles';
import SearchBox from './SearchBox';
import SchedulePicker from './SchedulePicker';

export default function TrajetSearch({ onSheetChange, isAnotherSheetOpen }) {
  const sheetRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const snapPoints = useMemo(() => ['30%', '60%'], []);

  const openBottomSheet = () => {
    setIsSheetOpen(true);
    onSheetChange(true);
    sheetRef.current?.expand();
  };

  const handleSheetChange = (index) => {
    const closed = index === -1;
    setIsSheetOpen(!closed);
    onSheetChange(!closed);
  };

  const handleScheduleConfirm = (schedule) => {
    if (searchBoxRef.current) {
      searchBoxRef.current.confirmSchedule(schedule);
      console.log("🚀 Sending schedule to SearchBox:", schedule);
    } else {
      console.log("else handleScheduleconfirm");
    }
    setShowSchedule(false);
    handleSheetChange(-1);
  };

  const shouldShowPlusButton = !isSheetOpen && !isAnotherSheetOpen && !showSchedule;

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChange}
      >
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          <>
          {!showSchedule ? (
            <SearchBox ref={searchBoxRef} onSelect={() => setShowSchedule(true)} />
          ) : (
            <SchedulePicker onClose={handleScheduleConfirm} />
          )}
          </>
          
        </BottomSheetView>
      </BottomSheet>

      {shouldShowPlusButton && (
        <TouchableOpacity style={styles.trajetButton} onPress={openBottomSheet}>
          <Ionicons name="add" size={30} color={couleurs.blanc} />
        </TouchableOpacity>
      )}
    </>
  );
}
