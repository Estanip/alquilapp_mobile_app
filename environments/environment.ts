import { API_PORT, ENVIRONMENT, HOST_DEV, HOST_LOCAL, HOST_PROD } from '@env';
import Constants from 'expo-constants';

const host =
    ENVIRONMENT === 'local'
        ? `${HOST_LOCAL}:${API_PORT}`
        : ENVIRONMENT === 'development'
          ? HOST_DEV
          : HOST_PROD;

const api =
    ENVIRONMENT === 'local'
        ? `http://${Constants?.expoGoConfig
              ?.debuggerHost!.split(':')!
              ?.shift()!
              .concat(':' + API_PORT)}`
        : host;

export const environment = {
    SERVER_URI: api,
};
