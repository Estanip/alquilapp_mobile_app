import { IServerResponse } from '.';
import { IUserResponse } from './user.interfaces';

import { IRegisterForm } from '@/screens/interfaces/register.interfaces';

export interface ILoginRequest {
    email: string;
    password: string;
}
export interface IRegisterRequest extends IRegisterForm {
    is_enabled?: boolean;
    is_membership_validated?: boolean;
}
export interface ILoginSuccessResponse
    extends Omit<IServerResponse, 'data' | 'message' | 'path' | 'statusCode' | 'timestamp'> {
    data: IUserResponse;
}
export interface IRegisterResponse
    extends Omit<IServerResponse, 'data' | 'path' | 'statusCode' | 'timestamp'> {}
export type TToken = null | undefined | string;
