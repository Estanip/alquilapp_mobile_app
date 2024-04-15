import { IReservationResponse } from './booking.interfaces';

interface IAvailabilityResponse {
  readonly date: Date;
  readonly from: string;
  readonly court: number;
}

export type TAvailabilities = IAvailabilityResponse[];

export interface IPlayerRequest {
  user_id: string;
}

export interface IBookRequest {
  id?: string;
  readonly date: Date;
  readonly from: string;
  readonly court: number;
  readonly players: IPlayerRequest[];
  readonly owner_id: string;
}

export type TBookServices = {
  getByDateAndCourt: (
    token: string,
    court: number,
    date: string,
  ) => Promise<TAvailabilities | undefined>;
  getById: (token: string, id: string) => Promise<IReservationResponse | undefined>;
  book: (
    token: string,
    request: IBookRequest,
  ) => Promise<
    | {
        message: string;
        success: boolean;
      }
    | undefined
  >;
};
