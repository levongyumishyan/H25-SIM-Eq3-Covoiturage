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

  /**
   * Gére l'affichage des éléments.
   * @param index L'indice qui détermine si ça doit être fermé.
   */
  const handleSheetChange = (index) => {
    const estFerme = index === -1;
    setIsSheetOpen(!estFerme);
    onSheetChange(!estFerme);
    if (estFerme) {
      setMontrerHoraire(false);
    }
  };

  const gererConfirmationHoraire = (horaire) => {
    if (BoiteDeRechercheRef.current) {
      BoiteDeRechercheRef.current.confirmSchedule(horaire);
      console.log("Horaire est envoyé à BoiteDeRecherche:", horaire);
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
              <SelecteurHoraire onClose={gererConfirmationHoraire} />
            )}
          </>

        </BottomSheetView>
      </BottomSheet>

      {montrerBoutonPlus && (
        <TouchableOpacity style={styles.trajetBouton} onPress={openBottomSheet}>
          <Ionicons name="add" size={30} color={couleurs.blanc} />
        </TouchableOpacity>
      )}
    </>
  );
}
