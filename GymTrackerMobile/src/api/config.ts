// plik konfiguracyjny dla API, zawiera logike wyboru odpowiedniego URL w zaleznosci od srodowiska (dev/prod) i platformy (android/ios)
import {Platform} from 'react-native';

const getBaseUrl = (): string => {
  if (__DEV__) {
    // Development
    if (Platform.OS === 'android') {
      // Android emulator maps host loopback to 10.0.2.2
      return 'http://10.0.2.2:5269';
    } else if (Platform.OS === 'ios') {
      // iOS simulator can use localhost directly
      return 'http://localhost:5269';
    }
  }
  
  // Production
  return 'https://your-production-api.com';
};

export const API_BASE_URL = getBaseUrl();
// Debug
console.log('API_BASE_URL:', API_BASE_URL);
console.log('Platform:', Platform.OS);