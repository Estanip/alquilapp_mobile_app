import {
    ILoginRequest,
    ILoginSuccessResponse,
    IPasswordResetSuccessResponse,
    IRegisterRequest,
    IRegisterResponse,
    IResetPasswordRequest,
} from '../interfaces/auth.interfaces';

import { apiPost, apiPut, apiUris } from '@/constants/api.constants';
import { environment } from '@/environments/environment';

export function AuthService() {
    const login = async (request: ILoginRequest): Promise<ILoginSuccessResponse | undefined> => {
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

    const register = async (request: IRegisterRequest): Promise<IRegisterResponse | undefined> => {
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
    ): Promise<IPasswordResetSuccessResponse | undefined> => {
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
    return {
        login,
        register,
        resetPassword,
    };
}
