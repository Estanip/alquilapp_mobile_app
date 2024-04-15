import { IPlayer } from '@/api/interfaces/book.interfaces';

export enum BookingDetailsSubtitles {
  DATE = 'Fecha',
  TIME = 'Hora',
  COURT = 'Cancha',
  PRICE = 'Total',
  PLAYERS = 'Jugadores',
}

interface IPlayerDetails {
  name: string;
  membership: string;
  fee: string;
}

export interface IBookingDetails {
  subtitle: BookingDetailsSubtitles;
  text: string;
  playersText?: IPlayerDetails[];
}

export type TBookingDetails = IBookingDetails[];

export interface IBookingsData {
  _id: string;
  date: Date | string;
  from: string;
  court: number;
  players: IPlayer[];
  total_price: number;
  owner_id: string;
  info_details: TBookingDetails;
}

export type TBookingsFieldsData = {
  active: IBookingsData[];
  inactive: IBookingsData[];
};

export const _formatDateToString = (date: string): string =>
  date ? `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}` : '';
