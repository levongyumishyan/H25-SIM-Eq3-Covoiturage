import React, { useRef, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { couleurs } from './Couleurs';
import { styles } from './Styles';
import BoiteDeRecherche from './BoiteDeRecherche';
import SelecteurHoraire from './SelecteurHoraire';

export default function RechercheTrajet({ onSheetChange, isAnotherSheetOpen }) {
  const sheetRef = useRef(null);
  const BoiteDeRechercheRef = useRef(null);
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
    if (closed) {
      setShowSchedule(false);
    }
  };

  const handleScheduleConfirm = (schedule) => {
    if (BoiteDeRechercheRef.current) {
      BoiteDeRechercheRef.current.confirmSchedule(schedule);
      console.log("Sending schedule to BoiteDeRecherche:", schedule);
    }
    setShowSchedule(false);
    setIsSheetOpen(false);
    onSheetChange(false);
    sheetRef.current?.close();
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
        <BottomSheetView style={{ flex: 1, padding: 10 }}>
          <>
            {!showSchedule ? (
              <BoiteDeRecherche ref={BoiteDeRechercheRef} onSelect={() => setShowSchedule(true)} />
            ) : (
              <SelecteurHoraire onClose={handleScheduleConfirm} />
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
