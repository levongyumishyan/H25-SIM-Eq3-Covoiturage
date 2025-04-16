import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from '@rnmapbox/maps';
import {styles} from './Styles'

interface LocateButtonProps {
  cameraRef: React.RefObject<Camera>;
  userCoords: [number, number] | null;
}

const LocateButton: React.FC<LocateButtonProps> = ({ cameraRef, userCoords }) => {
  const centerOnUser = () => {
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
    <TouchableOpacity style={styles.locationButton} onPress={centerOnUser}>
      <Ionicons name="compass" size={30} color="white" />
    </TouchableOpacity>
  );
};


export default LocateButton;
