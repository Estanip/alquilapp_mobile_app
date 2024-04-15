import { TToken } from '../interfaces/auth.interfaces';

import { apiPost, apiUris } from '@/constants/api.constants';
import { environment } from '@/environments/environment';

export function NotificationService() {
  const sendPush = async (token: TToken, message: object): Promise<void | undefined> => {
    try {
      await apiPost(`${apiUris.send_push_notification}`, message, token, {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
      });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const saveExpoPushToken = async (
    token: TToken,
    user_id: string,
    expoPushToken: string,
  ): Promise<void | undefined> => {
    try {
      await apiPost(
        `${environment.SERVER_URI}${apiUris.user}/${user_id}/expo_push_token`,
        { expoPushToken },
        token,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    sendPush,
    saveExpoPushToken,
  };
}
