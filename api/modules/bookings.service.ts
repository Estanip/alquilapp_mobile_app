import { IServerResponse } from '../interfaces';
import { TToken } from '../interfaces/auth.interfaces';
import { IBookRequest } from '../interfaces/book.interfaces';
import { TReservations } from '../interfaces/booking.interfaces';

import { apiDelete, apiGet, apiPut, apiUris } from '@/constants/api.constants';
import { environment } from '@/environments/environment';

export function BookingsService() {
  const cancel = async (
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

  const edit = async (
    token: TToken,
    request: IBookRequest,
    booking_id: string,
  ): Promise<Pick<IServerResponse, 'message' | 'success'> | undefined> => {
    try {
      const response = await apiPut(
        `${environment.SERVER_URI}${apiUris.reservation}/${booking_id}`,
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

  const getByOwner = async (token: TToken, user_id: string): Promise<TReservations | undefined> => {
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

  return {
    cancel,
    edit,
    getByOwner,
  };
}
