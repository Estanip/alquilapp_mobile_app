import { type Dispatch } from '@reduxjs/toolkit';
import Constants from 'expo-constants';
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

const api =
    typeof Constants.expoGoConfig?.packagerOpts === `object` &&
    Constants.expoGoConfig.packagerOpts.dev
        ? Constants.expoGoConfig.debuggerHost
            ? Constants?.expoGoConfig?.debuggerHost?.split(`:`)?.shift()?.concat(`:3006`)
            : 'http://localhost:3008'
        : `http://localhost:3008`;

export const signIn =
    (email: string, password: string) =>
    async (dispatch: Dispatch<ILoginDispatch>): Promise<void> => {
        dispatch(loginPending());
        await fetch(
            `http://${Constants?.expoGoConfig?.debuggerHost?.split(':').shift()}:3008/auth/login`,
            {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
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
            await fetch('http://192.168.1.6:80/auth/register', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(async (res) => res.json())
                .then((response) => {
                    if (response?.success) dispatch(registerSuccess(response));
                    else if (!response?.success) dispatch(registerError(response));
                });
        } catch (error: any) {
            dispatch(registerError(error));
        }
    };
