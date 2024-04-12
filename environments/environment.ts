import {
    EXPO_PUBLIC_API_PORT,
    EXPO_PUBLIC_ENVIRONMENT,
    EXPO_PUBLIC_HOST_DEV,
    EXPO_PUBLIC_HOST_LOCAL,
    EXPO_PUBLIC_HOST_PROD,
} from '@env';
import Constants from 'expo-constants';

const host =
    EXPO_PUBLIC_ENVIRONMENT === 'local'
        ? `${EXPO_PUBLIC_HOST_LOCAL}:${EXPO_PUBLIC_API_PORT}`
        : EXPO_PUBLIC_ENVIRONMENT === 'development'
          ? EXPO_PUBLIC_HOST_DEV
          : EXPO_PUBLIC_HOST_PROD;

const api =
    EXPO_PUBLIC_ENVIRONMENT === 'local'
        ? `http://${Constants?.expoGoConfig
              ?.debuggerHost!.split(':')
              ?.shift()!
              .concat(':' + EXPO_PUBLIC_API_PORT)}`
        : host;

export const environment = {
    SERVER_URI: api,
};
