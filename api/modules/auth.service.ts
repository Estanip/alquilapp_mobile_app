import { IServerResponse } from '../interfaces';
import {
    ILoginRequest,
    IRegisterRequest,
    IResetPasswordRequest,
    TToken,
} from '../interfaces/auth.interfaces';

import { apiGet, apiPost, apiPut, apiUris } from '@/constants/api.constants';
import { environment } from '@/environments/environment';

export function AuthService() {
    const login = async (
        request: ILoginRequest,
    ): Promise<Pick<IServerResponse, 'success' | 'data'> | undefined> => {
        try {
            const response = await apiPost(`${environment.SERVER_URI}${apiUris.login}`, request);
            if (response)
                return {
                    data: response?.data,
                    success: response?.success,
                };
        } catch (error: unknown) {
            console.log(error);
        }
    };

    const register = async (
        request: IRegisterRequest,
    ): Promise<Pick<IServerResponse, 'message' | 'success'> | undefined> => {
        try {
            const response = await apiPost(`${environment.SERVER_URI}${apiUris.register}`, request);
            if (response)
                return {
                    message: response?.message,
                    success: response?.success,
                };
        } catch (error: unknown) {
            console.log(error);
        }
    };

    const resetPassword = async (
        request: IResetPasswordRequest,
    ): Promise<Pick<IServerResponse, 'message' | 'success'> | undefined> => {
        try {
            const response = await apiPut(
                `${environment.SERVER_URI}${apiUris.reset_password}`,
                request,
            );
            if (response)
                return {
                    message: response?.message,
                    success: response?.success,
                };
        } catch (error: unknown) {
            console.log(error);
        }
    };

    const resendCode = async (
        token: TToken,
        user_id: string,
        email: string,
    ): Promise<Pick<IServerResponse, 'message' | 'success'> | undefined> => {
        try {
            const response = await apiPost(
                `${environment.SERVER_URI}${apiUris.resend_verification_code}/${user_id}`,
                { email },
                token,
            );
            if (response)
                return {
                    message: response?.message,
                    success: response?.success,
                };
        } catch (error: unknown) {
            console.log(error);
        }
    };

    const verifyUserCode = async (
        token: TToken,
        user: string,
        code: string,
    ): Promise<Pick<IServerResponse, 'message' | 'success'> | undefined> => {
        try {
            const response = await apiGet(
                `${environment.SERVER_URI}${apiUris.user_code_verification}/${user}/${code}`,
                token,
            );
            if (response)
                return {
                    message: response?.message,
                    success: response?.success,
                };
        } catch (error: unknown) {
            console.log(error);
        }
    };

    return {
        login,
        register,
        resetPassword,
        resendCode,
        verifyUserCode,
    };
}
