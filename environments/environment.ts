import { API_LOCAL_PORT } from '@env';
import Constants from 'expo-constants';

const api =
    typeof Constants?.expoGoConfig?.packagerOpts === `object` &&
    Constants?.expoGoConfig?.packagerOpts?.dev
        ? Constants?.expoGoConfig?.debuggerHost
            ? `http://${Constants?.expoGoConfig?.debuggerHost
                  .split(':')
                  ?.shift()
                  .concat(':' + API_LOCAL_PORT)}`
            : `http://localhost:${API_LOCAL_PORT}`
        : `http://localhost:${API_LOCAL_PORT}`;

export const environment = {
    SERVER_URI: api,
};
