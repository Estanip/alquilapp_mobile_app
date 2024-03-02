import { TToken } from '../interfaces/auth.interfaces';
import { IBookRequest, TAvailabilities } from '../interfaces/book.interfaces';
import { TCourts } from '../interfaces/court.interfaces';
import { TPlayers } from '../interfaces/user.interfaces';

import { apiGet, apiPost, apiUris } from '@/constants/api.constants';
import { environment } from '@/environments/environment';

export const getCourts = async (token: TToken): Promise<TCourts | undefined> => {
    try {
        const response = await apiGet(`${environment.SERVER_URI}${apiUris.courts}`, token);
        if (response) return response?.data;
    } catch (error: unknown) {
        console.log(error);
    }
};

export const getBookingsByDateAndCourt = async (
    token: TToken,
    court: number,
    date: Date,
): Promise<TAvailabilities | undefined> => {
    try {
        const response = await apiGet(
            `${environment.SERVER_URI}${apiUris.bookings}?court=${court}&date=${date}`,
            token,
        );
        return response.data;
    } catch (error: unknown) {
        console.log(error);
    }
};

export const getPlayers = async (token: TToken): Promise<TPlayers | undefined> => {
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

export const book = async (token: TToken, request: IBookRequest) => {
    try {
        const response = await apiPost(
            `${environment.SERVER_URI}${apiUris.bookings}`,
            request,
            token,
        );
        if (response)
            return {
                message: response?.message,
                success: response?.success,
            };
    } catch (error: unknown) {
        console.log(error);
    }
};
