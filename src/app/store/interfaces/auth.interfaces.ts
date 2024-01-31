import { IUser } from './user.interfaces';

export interface ILoginPayload {
    success: boolean;
    message: string;
    token: string;
    user: IUser;
}

export interface IRegisterPayload extends Omit<ILoginPayload, 'token' | 'user'> {}
