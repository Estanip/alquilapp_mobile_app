import { IUser } from '../store/interfaces/user.interfaces';

export enum AuthStates {
    SUCCESS = 'SUCCESS',
    PENDING = 'PENDING',
    ERROR = 'ERROR',
}

export interface AuthState {
    status: AuthStates;
    success: boolean;
    error: unknown;
    user?: IUser;
}
