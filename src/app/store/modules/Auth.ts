import { type PayloadAction, combineReducers, createSlice } from '@reduxjs/toolkit';
import { type UserI, type LoginPayloadI, type RegisterPayloadI } from '../interfaces/Auth';

type AuthState = {
    status: 'Success' | 'Pending' | 'Error';
    success: boolean;
    error: Error | string | undefined;
    user?: UserI | undefined;
};

const initialState: AuthState = {
    status: 'Pending',
    success: false,
    error: null,
    user: null,
};

const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginPending: (state: AuthState) => {
            state.status = 'Pending';
        },
        loginSuccess: (state: AuthState, action: PayloadAction<LoginPayloadI>) => {
            state.status = 'Success';
            state.error = null;
            state.user = action.payload.user;
            state.success = action.payload.success;
            localStorage.setItem('user_id', action.payload.user?.id);
            localStorage.setItem('token', action.payload.token);
        },
        loginError: (state: AuthState, action: PayloadAction<LoginPayloadI>) => {
            state.status = 'Error';
            state.user = null;
            state.success = action.payload.success;
            state.error = action.payload.message;
        },
    },
});

const RegisterSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerPending: (state: AuthState) => {
            state.status = 'Pending';
        },
        registerSuccess: (state: AuthState, action: PayloadAction<RegisterPayloadI>) => {
            state.status = 'Success';
            state.error = null;
            state.success = action.payload.success;
        },
        registerError: (state: AuthState, action: PayloadAction<RegisterPayloadI>) => {
            state.status = 'Error';
            state.success = false;
            state.error = action.payload.message;
        },
    },
});

const reducer = combineReducers({
    login: LoginSlice.reducer,
    register: RegisterSlice.reducer,
});

export const { loginSuccess, loginError, loginPending } = LoginSlice.actions;
export const { registerSuccess, registerError, registerPending } = RegisterSlice.actions;

export default reducer;
