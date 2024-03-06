type TUser = {
    first_name: string;
    last_name: string;
    membership_type: string;
};

type TReservationPlayer = {
    user: TUser;
    fee: number;
};

export interface IReservationResponse {
    _id: string;
    date: Date;
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
