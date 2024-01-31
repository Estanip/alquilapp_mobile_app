import { PayloadAction, Reducer, combineReducers, createSlice } from '@reduxjs/toolkit';
import { AuthState, AuthStates } from '../../constants/auth.constants';
import { ILoginPayload, IRegisterPayload } from '../interfaces/auth.interfaces';
import storage from '../../shared/storage';

const initialState: AuthState = {
    status: AuthStates.PENDING,
    success: false,
    error: null,
    user: undefined,
};

const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginPending: (state: AuthState): void => {
            state.status = AuthStates.PENDING;
        },
        loginSuccess: (state: AuthState, action: PayloadAction<ILoginPayload>): void => {
            state.status = AuthStates.SUCCESS;
            state.error = null;
            state.user = action.payload.user;
            state.success = action.payload.success;
            storage.save({
                key: 'loginState',
                data: {
                    userid: action.payload.user.id,
                    token: action.payload.token,
                },

                // if expires not specified, the defaultExpires will be applied instead.
                // if set to null, then it will never expire.
                expires: 1000 * 3600,
            });
            storage
                .load({
                    key: 'loginState',

                    // autoSync (default: true) means if data is not found or has expired,
                    // then invoke the corresponding sync method
                    autoSync: true,

                    // syncInBackground (default: true) means if data expired,
                    // return the outdated data first while invoking the sync method.
                    // If syncInBackground is set to false, and there is expired data,
                    // it will wait for the new data and return only after the sync completed.
                    // (This, of course, is slower)
                    syncInBackground: true,

                    // you can pass extra params to the sync method
                    // see sync example below
                    syncParams: {
                        extraFetchOptions: {
                            // blahblah
                        },
                        someFlag: true,
                    },
                })
                .then((ret) => {
                    // found data go to then()
                    console.log(ret);
                })
                .catch((err) => {
                    // any exception including data not found
                    // goes to catch()
                    console.warn(err.message);
                    switch (err.name) {
                        case 'NotFoundError':
                            // TODO;
                            break;
                        case 'ExpiredError':
                            // TODO
                            break;
                    }
                });

            storage.remove({
                key: 'loginState',
            });

            storage
                .load({
                    key: 'loginState',

                    // autoSync (default: true) means if data is not found or has expired,
                    // then invoke the corresponding sync method
                    autoSync: true,

                    // syncInBackground (default: true) means if data expired,
                    // return the outdated data first while invoking the sync method.
                    // If syncInBackground is set to false, and there is expired data,
                    // it will wait for the new data and return only after the sync completed.
                    // (This, of course, is slower)
                    syncInBackground: true,

                    // you can pass extra params to the sync method
                    // see sync example below
                    syncParams: {
                        extraFetchOptions: {
                            // blahblah
                        },
                        someFlag: true,
                    },
                })
                .then((ret) => {
                    // found data go to then()
                    console.log(ret);
                })
                .catch((err) => {
                    // any exception including data not found
                    // goes to catch()
                    console.warn(err.message);
                    switch (err.name) {
                        case 'NotFoundError':
                            // TODO;
                            break;
                        case 'ExpiredError':
                            // TODO
                            break;
                    }
                });
        },
        loginError: (state: AuthState, action: PayloadAction<ILoginPayload>): void => {
            state.status = AuthStates.ERROR;
            state.user = undefined;
            state.success = action.payload.success;
            state.error = action.payload.message;
        },
    },
});

const RegisterSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerPending: (state: AuthState): void => {
            state.status = AuthStates.PENDING;
        },
        registerSuccess: (state: AuthState, action: PayloadAction<IRegisterPayload>): void => {
            state.status = AuthStates.SUCCESS;
            state.error = null;
            state.success = action.payload.success;
        },
        registerError: (state: AuthState, action: PayloadAction<IRegisterPayload>): void => {
            state.status = AuthStates.ERROR;
            state.success = false;
            state.error = action.payload.message;
        },
    },
});

export const authReducer: Reducer = combineReducers({
    login: LoginSlice.reducer,
    register: RegisterSlice.reducer,
});

export const { loginSuccess, loginError, loginPending } = LoginSlice.actions;
export const { registerSuccess, registerError, registerPending } = RegisterSlice.actions;
