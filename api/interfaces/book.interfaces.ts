interface IAvailabilityResponse {
    readonly date: Date;
    readonly from: string;
    readonly court: number;
}

export type TAvailabilities = IAvailabilityResponse[];

export interface IPlayer {
    user: string;
}

export interface IBookRequest {
    readonly date: Date;
    readonly from: string;
    readonly court: number;
    readonly players: IPlayer[];
}

export type TBookServices = {
    getByDateAndCourt: (
        token: string,
        court: number,
        date: Date,
    ) => Promise<TAvailabilities | undefined>;
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
