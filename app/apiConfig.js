import { Platform } from 'react-native';

// Replace with your computer's local IP address on Wi-Fi
// Remplacez la constante ci-dessous avec l'adresse IP locale de votre ordinateur sur Wi-Fi
const LOCAL_NETWORK_IP = 'http://10.0.0.047:5001';

const LOCAL_HOST =
  Platform.OS === 'android' //http://10.0.2.2:5001
    ? LOCAL_NETWORK_IP           // Appareil physique Android ou émulateur (sur Wi-Fi)
    : 'http://localhost:5001';   // iOS simulateur ou web

const PRODUCTION_HOST = 'https://backend-392j.onrender.com';

export const BASE_URL = LOCAL_HOST;
