export type TReservationPlayer = {
    id: string;
    first_name: string;
    last_name: string;
    membership_type: string;
    fee: number;
};

export interface IReservationResponse {
    _id: string;
    date: Date | string;
    from: string;
    to?: string;
    court: number;
    players: TReservationPlayer[];
    total_price: number;
    owner_id: string;
}

export type TReservations = {
    active: IReservationResponse[];
    inactive: IReservationResponse[];
};
