import { TToken } from '../interfaces/auth.interfaces';

import { apiPost, apiUris } from '@/constants/api.constants';

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

    return {
        sendPush,
    };
}
