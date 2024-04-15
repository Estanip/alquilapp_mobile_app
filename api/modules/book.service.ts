import { IServerResponse } from '../interfaces';
import { TToken } from '../interfaces/auth.interfaces';
import { IBookRequest, TAvailabilities, TBookServices } from '../interfaces/book.interfaces';
import { IReservationResponse } from '../interfaces/booking.interfaces';

import { apiGet, apiPost, apiUris } from '@/constants/api.constants';
import { environment } from '@/environments/environment';

export function BookService(): TBookServices {
  const book = async (
    token: TToken,
    request: IBookRequest,
  ): Promise<Pick<IServerResponse, 'message' | 'success'> | undefined> => {
    try {
      const response = await apiPost(
        `${environment.SERVER_URI}${apiUris.reservation}`,
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

  const getById = async (token: TToken, id: string): Promise<IReservationResponse | undefined> => {
    try {
      const response = await apiGet(`${environment.SERVER_URI}${apiUris.reservation}/${id}`, token);
      return response.data;
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const getByDateAndCourt = async (
    token: TToken,
    court: number,
    date: string,
  ): Promise<TAvailabilities | undefined> => {
    try {
      const response = await apiGet(
        `${environment.SERVER_URI}${apiUris.reservation}?court=${court}&date=${date}`,
        token,
      );
      return response.data;
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return {
    book,
    getById,
    getByDateAndCourt,
  };
}
