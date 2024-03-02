interface IAvailability {
    readonly date: Date;
    readonly from: string;
    readonly court: number;
}

export type TAvailabilities = IAvailability[];

export interface IPlayer {
    user: string;
}

export interface IBookRequest {
    readonly date: Date;
    readonly from: string;
    readonly court: number;
    readonly players: IPlayer[];
}
