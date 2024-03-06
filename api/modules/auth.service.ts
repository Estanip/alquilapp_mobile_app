import {
    ILoginRequest,
    ILoginSuccessResponse,
    IRegisterRequest,
    IRegisterResponse,
} from '../interfaces/auth.interfaces';

import { apiPost, apiUris } from '@/constants/api.constants';
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

    return {
        login,
        register,
    };
}
