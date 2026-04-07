import {Platform} from 'react-native';

const getBaseUrl = (): string => {
  if (__DEV__) {
    // Development
    if (Platform.OS === 'android') {
      return 'http://192.168.178.65:32777/api';
    } else if (Platform.OS === 'ios') {
      return 'http://192.168.178.65:32777/api';
    }
  }
  
  // Production
  return 'https://your-production-api.com/api';
};

export const API_BASE_URL = getBaseUrl;
// Debug
console.log('API_BASE_URL:', API_BASE_URL);
console.log('Platform:', Platform.OS);