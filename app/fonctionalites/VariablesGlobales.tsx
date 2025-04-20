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
}));


export default function VariablesGlobales() {
  return null;
}