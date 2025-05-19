import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from '@rnmapbox/maps';
import { styles } from './Styles'

interface BoutonLocalisationProps {
  cameraRef: React.RefObject<Camera>;
  userCoords: [number, number] | null;
}

/** Pour réinitialiser la vue de la caméra à la localisation de l'utilisateur */

const BoutonLocalisation: React.FC<BoutonLocalisationProps> = ({ cameraRef, userCoords }) => {
  const centrerSurUtilisateur = () => {
    if (cameraRef.current && userCoords) {
      cameraRef.current.setCamera({
        centerCoordinate: userCoords,
        zoomLevel: 16,
        animationMode: 'flyTo',
        animationDuration: 1000,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.boutonLocalisation} onPress={centrerSurUtilisateur}>
      <Ionicons name="compass" size={30} color="white" />
    </TouchableOpacity>
  );
};


export default BoutonLocalisation;
