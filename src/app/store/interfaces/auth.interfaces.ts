import { IUser } from './user.interfaces';

export interface ILoginSuccessPayload {
    success: boolean;
    message: string;
    token: string;
    user: IUser;
}

export interface ILoginErrorPayload {
    success: boolean;
    message: string;
}

export interface IRegisterSuccessPayload extends Omit<ILoginSuccessPayload, 'token' | 'user'> {}
export interface IRegisterErrorPayload extends ILoginErrorPayload {}
