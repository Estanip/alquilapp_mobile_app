import { type Dispatch } from '@reduxjs/toolkit';
import {
    loginError,
    loginPending,
    loginSuccess,
    registerError,
    registerPending,
    registerSuccess,
} from '../store/modules/Auth';
import { type LoginDispatchI, type RegisterDispatchI } from './interfaces/Auth';
import { type RegisterFormI } from '../interfaces/auth/Auth';

export const signIn =
    (email: string, password: string) =>
    async (dispatch: Dispatch<LoginDispatchI>): Promise<void> => {
        dispatch(loginPending());
        try {
            await fetch('http://localhost:80/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(async (res) => res.json())
                .then((response) => {
                    if (response?.success) dispatch(loginSuccess(response));
                    else if (!response?.success) dispatch(loginError(response));
                });
        } catch (error: any) {
            dispatch(loginError(error));
        }
    };

export const signUp =
    (user: RegisterFormI) =>
    async (dispatch: Dispatch<RegisterDispatchI>): Promise<void> => {
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
