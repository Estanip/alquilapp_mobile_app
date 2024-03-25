import { apiGet, apiUris } from '@/constants/api.constants';
import { TToken } from '../interfaces/auth.interfaces';
import { TPlayers } from '../interfaces/user.interfaces';

import { environment } from '@/environments/environment';

export function PlayersService() {
    const get = async (token: TToken): Promise<TPlayers | undefined> => {
        try {
            const response = await apiGet(
                `${environment.SERVER_URI}${apiUris.user}?players=true`,
                token,
            );
            if (response) return response?.data;
        } catch (error: unknown) {
            console.log(error);
        }
    };

    return {
        get,
    };
}
