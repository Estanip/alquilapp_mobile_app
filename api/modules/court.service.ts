import { apiGet, apiUris } from '@/constants/api.constants';
import { TToken } from '../interfaces/auth.interfaces';
import { TCourts } from '../interfaces/court.interfaces';

import { environment } from '@/environments/environment';

export function CourtService() {
    const get = async (token: TToken): Promise<TCourts | undefined> => {
        try {
            const response = await apiGet(`${environment.SERVER_URI}${apiUris.courts}`, token);
            if (response) return response?.data;
        } catch (error: unknown) {
            console.log(error);
        }
    };

    return {
        get,
    };
}
