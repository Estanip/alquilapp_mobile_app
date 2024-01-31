import { ServerResponse } from '.';
import { IRegisterForm } from '../../screens/interfaces/register.interfaces';
import { ILoginPayload, IRegisterPayload } from '../../store/interfaces/auth.interfaces';
import { IUser } from '../../store/interfaces/user.interfaces';

export interface ILoginDispatch {
    type: string;
    payload?: ILoginPayload;
}
export interface IRegisterDispatch {
    type: string;
    payload?: IRegisterPayload;
}
export interface IUserRequest extends IRegisterForm {
    is_enabled: false;
    is_membership_validated: false;
}
export interface IUserResponse extends IUser {
    token: string;
}
export interface LoginErrorResponse extends ServerResponse {}
export interface LoginSuccessResponse extends ServerResponse {
    data: IUserResponse;
}
export type LoginResponse = LoginErrorResponse & LoginSuccessResponse;
