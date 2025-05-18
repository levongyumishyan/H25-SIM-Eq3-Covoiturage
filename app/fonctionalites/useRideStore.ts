import { create } from 'zustand';

/** Enregistre les trajets de l'utilisateur globalement */
export const useRideStore = create((set) => ({
  upcomingRide: null,
  setUpcomingRide: (ride) => set({ upcomingRide: ride }),
  clearUpcomingRide: () => set({ upcomingRide: null }),
  routeGeoJSON: null,
  setRouteGeoJSON: (route) => set({ routeGeoJSON: route }),

}));
