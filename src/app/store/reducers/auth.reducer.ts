import { PayloadAction, Reducer, combineReducers, createSlice } from '@reduxjs/toolkit';
import { AuthState, AuthStates } from '../../constants/auth.constants';
import {
    ILoginErrorPayload,
    ILoginSuccessPayload,
    IRegisterErrorPayload,
    IRegisterSuccessPayload,
} from '../interfaces/auth.interfaces';

const initialState: AuthState = {
    status: AuthStates.PENDING,
    success: false,
    error: null,
    user: undefined,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginPending: (state: AuthState): void => {
            state.status = AuthStates.PENDING;
        },
        loginSuccess: (state: AuthState, action: PayloadAction<ILoginSuccessPayload>): void => {
            state.status = AuthStates.SUCCESS;
            state.error = null;
            state.user = action.payload.user;
            state.success = action.payload.success;
        },
        loginError: (state: AuthState, action: PayloadAction<ILoginErrorPayload>): void => {
            state.status = AuthStates.ERROR;
            state.user = undefined;
            state.success = action.payload.success;
            state.error = action.payload.message;
        },
        registerPending: (state: AuthState): void => {
            state.status = AuthStates.PENDING;
        },
        registerSuccess: (
            state: AuthState,
            action: PayloadAction<IRegisterSuccessPayload>,
        ): void => {
            state.status = AuthStates.SUCCESS;
            state.error = null;
            state.success = action.payload.success;
        },
        registerError: (state: AuthState, action: PayloadAction<IRegisterErrorPayload>): void => {
            state.status = AuthStates.ERROR;
            state.success = false;
            state.error = action.payload.message;
        },
    },
});

export const authReducer: Reducer = AuthSlice.reducer;

export const {
    loginSuccess,
    loginError,
    loginPending,
    registerSuccess,
    registerError,
    registerPending,
} = AuthSlice.actions;
