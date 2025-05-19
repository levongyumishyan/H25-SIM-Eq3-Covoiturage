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
  const [montrerHoraire, setMontrerHoraire] = useState(false);

  const snapPoints = useMemo(() => ['30%', '60%'], []);

  const openBottomSheet = () => {
    setIsSheetOpen(true);
    onSheetChange(true);
    sheetRef.current?.expand();
  };

  const handleSheetChange = (index) => {
    const estFerme = index === -1;
    setIsSheetOpen(!estFerme);
    onSheetChange(!estFerme);
    if (estFerme) {
      setMontrerHoraire(false);
    }
  };

  const handleScheduleConfirm = (schedule) => {
    if (BoiteDeRechercheRef.current) {
      BoiteDeRechercheRef.current.confirmSchedule(schedule);
      console.log("Sending schedule to BoiteDeRecherche:", schedule);
    }
    setMontrerHoraire(false);
    setIsSheetOpen(false);
    onSheetChange(false);
    sheetRef.current?.close();
  };


  const montrerBoutonPlus = !isSheetOpen && !isAnotherSheetOpen && !montrerHoraire;

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
            {!montrerHoraire ? (
              <BoiteDeRecherche ref={BoiteDeRechercheRef} onSelect={() => setMontrerHoraire(true)} />
            ) : (
              <SelecteurHoraire onClose={handleScheduleConfirm} />
            )}
          </>

        </BottomSheetView>
      </BottomSheet>

      {montrerBoutonPlus && (
        <TouchableOpacity style={styles.trajetButton} onPress={openBottomSheet}>
          <Ionicons name="add" size={30} color={couleurs.blanc} />
        </TouchableOpacity>
      )}
    </>
  );
}
