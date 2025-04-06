import React from 'react';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as Location from 'expo-location';

// Define types for your scooter
type Scooter = {
  id: string;
  lat: number;
  long: number;
};

// Define the context value shape
type ScooterContextType = {
  selectedScooter?: Scooter;
  setSelectedScooter: (scooter: Scooter) => void;
  direction?: any;
  directionCoordinates?: [number, number][];
  duration?: number;
  distance?: number;
  isNearby: boolean;
};

const ScooterContext = createContext<ScooterContextType>({
  setSelectedScooter: () => {},
  isNearby: false,
});

export default function ScooterProvider({ children }: PropsWithChildren) {
  const [selectedScooter, setSelectedScooter] = useState<Scooter | undefined>();
  const [direction, setDirection] = useState<any>();
  const [isNearby, setIsNearby] = useState(false);

  // Heading tracking
  useEffect(() => {
    let subscription: Location.LocationSubscription;

    const watchHeading = async () => {
      subscription = await Location.watchHeadingAsync(
        { distanceInterval: 10 },
        (newHeading) => {
          console.log("Heading updated:", newHeading);
        }
      );
    };

    watchHeading();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  // Directions + distance/duration
  useEffect(() => {
    const fetchDirections = async () => {
      const myLocation = await Location.getCurrentPositionAsync();

      const newDirection = await getDirections(
        [myLocation.coords.longitude, myLocation.coords.latitude],
        [selectedScooter!.long, selectedScooter!.lat]
      );

      setDirection(newDirection);

      const distance = newDirection?.routes?.[0]?.distance || 0;
      setIsNearby(distance < 1000); // Within 1 km
    };

    if (selectedScooter) {
      fetchDirections();
    } else {
      setDirection(undefined);
      setIsNearby(false);
    }
  }, [selectedScooter]);

  return (
    <ScooterContext.Provider
      value={{
        selectedScooter,
        setSelectedScooter,
        direction,
        directionCoordinates: direction?.routes?.[0]?.geometry.coordinates,
        duration: direction?.routes?.[0]?.duration,
        distance: direction?.routes?.[0]?.distance,
        isNearby,
      }}
    >
      {children}
    </ScooterContext.Provider>
  );
}

export const useScooter = () => useContext(ScooterContext);
