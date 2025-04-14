import { create } from "zustand";


export var estDarkMode = true;
// Pour le 'localIP_test', vous pouvez
// soit le changer à votre local IP avec la commande 'ipconfig' sous CommandPrompt (Sur Windows);
// soit le changer à l'adresse IP de Expo lorsque le projet est démarré
export var localIP = "10.0.2.2"; //Platforme locale de l'emulateur: IOS: 127.0.0.1 ANDROID: 10.0.2.2
//export var estConnecte = false;

interface AuthState {
    value: boolean;
    setEstConnecte: (val: boolean) => void;
  }

export const useAuthStore = create<AuthState>((set) => ({
    value: false,
    setEstConnecte: (val) => set({ value: val }),
  }));
