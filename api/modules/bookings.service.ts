import { IServerResponse } from '../interfaces';
import { TToken } from '../interfaces/auth.interfaces';
import { TReservations } from '../interfaces/booking.interfaces';

import { apiDelete, apiGet, apiUris } from '@/constants/api.constants';
import { environment } from '@/environments/environment';

export function BookingsService() {
    const getByOwner = async (
        token: TToken,
        user_id: string,
    ): Promise<TReservations | undefined> => {
        try {
            const response = await apiGet(
                `${environment.SERVER_URI}${apiUris.reservation}/owner/${user_id}`,
                token,
            );
            if (response) return response?.data;
        } catch (error: unknown) {
            console.log(error);
        }
    };

    const cancelById = async (
        token: TToken,
        booking_id: string,
    ): Promise<Pick<IServerResponse, 'statusCode'> | void> => {
        try {
            const response = await apiDelete(
                `${environment.SERVER_URI}${apiUris.reservation}/${booking_id}`,
                token,
            );
            return response;
        } catch (error: unknown) {
            console.log(error);
        }
    };

    return {
        getByOwner,
        cancelById,
    };
}
