import { ServerResponse } from '.';
import { IRegisterForm } from '../../screens/interfaces/register.interfaces';
import {
    ILoginErrorPayload,
    ILoginSuccessPayload,
    IRegisterSuccessPayload,
    IRegisterErrorPayload,
} from '../../store/interfaces/auth.interfaces';
import { IUser } from '../../store/interfaces/user.interfaces';

type TLoginPayload = ILoginSuccessPayload | ILoginErrorPayload;
type TRegisterPayload = IRegisterSuccessPayload | IRegisterErrorPayload;
export interface ILoginDispatch {
    type: string;
    payload?: TLoginPayload;
}
export interface IRegisterDispatch {
    type: string;
    payload?: TRegisterPayload;
}
export interface IUserRequest extends IRegisterForm {
    is_enabled?: boolean;
    is_membership_validated?: boolean;
}
export interface IUserResponse extends IUser {
    token: string;
}
export interface LoginErrorResponse extends ServerResponse {}
export interface LoginSuccessResponse extends ServerResponse {
    data: IUserResponse;
}
export type LoginResponse = LoginErrorResponse & LoginSuccessResponse;
