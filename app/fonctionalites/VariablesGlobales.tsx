import { create } from "zustand";


export var estDarkMode = true;


interface AuthState {
  estConnecte: boolean;
  setEstConnecte: (val: boolean) => void;
  nomUtilisateur: string;
  setNomUtilisateur: (nom: string) => void;
  prenomUtilisateur: string;
  setPrenomUtilisateur: (prenom: string) => void;
  telephoneUtilisateur: string;
  setTelephoneUtilisateur: (telephone: string) => void;
  courrielUtilisateur: string;
  setCourrielUtilisateur: (courriel: string) => void;
  userId: string;
  setUserId: (id: string) => void;

  userLong: number;
  setUserLong: (long: number) => void;
  userLat: number;
  setUserLat: (lat: number) => void;
  targetLong: number;
  targetLat: number;
  setTargetLong: (tLong: number) => void;
  setTargetLat: (tLat: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  estConnecte: false,
  setEstConnecte: (val) => set({ estConnecte: val }),
  nomUtilisateur: '',
  setNomUtilisateur: (nom) => set({ nomUtilisateur: nom }),
  prenomUtilisateur: '',
  setPrenomUtilisateur: (prenom) => set({ prenomUtilisateur: prenom }),
  telephoneUtilisateur: '',
  setTelephoneUtilisateur: (telephone) => set({ telephoneUtilisateur: telephone }),
  courrielUtilisateur: '',
  setCourrielUtilisateur: (courriel) => set({ courrielUtilisateur: courriel }),
  userId:"",
  setUserId: (id)  => set({ userId: id }),
  userLong:0,
  userLat:0,
  setUserLong: (long) => set({ userLong: long }),
  setUserLat: (lat) => set({ userLat: lat }),
  targetLong:0,
  targetLat:0,
  setTargetLong: (tLong) => set({ targetLong: tLong }),
  setTargetLat: (tLat) => set({ targetLat: tLat }),
}));

export default function VariablesGlobales() {
  return null;
}