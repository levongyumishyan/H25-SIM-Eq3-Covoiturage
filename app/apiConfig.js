import { Platform } from 'react-native';

const LOCAL_HOST =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:5001'  // Android Emulator
    : 'http://localhost:5001'; // iOS Simulator or Web

// Change this to your production backend when deployed
const PRODUCTION_HOST = 'https://ridew-backend-production.up.railway.app';

// Toggle between local or production
export const BASE_URL = __DEV__ ? LOCAL_HOST : PRODUCTION_HOST;
