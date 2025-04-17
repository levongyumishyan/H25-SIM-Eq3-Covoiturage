import { Text, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef } from 'react';
import React from 'react';
import SearchBox from '../fonctionalites/SearchBox';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function BottomSearchSheet({ visible }: { visible: boolean }) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [200], [300]);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  return (
    <GestureHandlerRootView>
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: '#414442' }}
    >
      <BottomSheetView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SearchBox/>
        <Text style={{ color: 'white' }}>
          Trajets offert
          </Text>
      </BottomSheetView>
    </BottomSheet>
    </GestureHandlerRootView>
  );
}
