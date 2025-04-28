import { create } from 'zustand';

export const useRideStore = create((set) => ({
  upcomingRide: null,
  setUpcomingRide: (ride) => set({ upcomingRide: ride }),
  clearUpcomingRide: () => set({ upcomingRide: null }), 
  routeGeoJSON: null,
  setRouteGeoJSON: (route) => set({ routeGeoJSON: route }),

}));
