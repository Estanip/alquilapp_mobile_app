export interface IUser {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    identification_number: string;
    is_enabled: boolean;
}
export interface IUserResponse extends IUser {
    token: string;
}

interface IPlayerResponse extends Pick<IUser, 'email' | 'identification_number' | '_id'> {
    name: string;
    membership_type: string;
}
export type TPlayers = IPlayerResponse[];
