import { environment } from '@/environments/environment';
import { type Dispatch } from '@reduxjs/toolkit';
import { apiUris, postObject } from '../../constants/api.constants';
import {
    loginError,
    loginPending,
    loginSuccess,
    registerError,
    registerPending,
    registerSuccess,
} from '../../store/reducers/auth.reducer';
import {
    ILoginDispatch,
    IRegisterDispatch,
    IUserRequest,
    LoginResponse,
} from '../interfaces/auth.interface';

export const signIn =
    (email: string, password: string) =>
    async (dispatch: Dispatch<ILoginDispatch>): Promise<void> => {
        dispatch(loginPending());
        await fetch(`${environment.SERVER_URI}${apiUris.login}`, postObject({ email, password }))
            .then(async (res) => res.json())
            .then(({ data, message, success }: LoginResponse) => {
                if (success)
                    dispatch(loginSuccess({ message, success, user: data, token: data.token }));
                else if (!success) dispatch(loginError({ message, success }));
            });
    };

export const signUp =
    (user: IUserRequest) =>
    async (dispatch: Dispatch<IRegisterDispatch>): Promise<void> => {
        dispatch(registerPending());
        try {
            await fetch(`${environment.SERVER_URI}${apiUris.register}`, postObject(user))
                .then(async (res) => res.json())
                .then((response) => {
                    if (response?.success) dispatch(registerSuccess(response));
                    else if (!response?.success) dispatch(registerError(response));
                });
        } catch (error: any) {
            dispatch(registerError(error));
        }
    };

