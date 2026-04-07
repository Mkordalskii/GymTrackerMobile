import {Platform} from 'react-native';

const host =
  Platform.OS === 'android' ? 'http://10.0.2.2:5269' : 'http://localhost:5269';

export const API_BASE_URL = host;
