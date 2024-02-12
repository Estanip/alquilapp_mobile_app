import { apiPost, apiUris } from '@/constants/api.constants';
import { environment } from '@/environments/environment';
import { IServerResponse } from '../interfaces';
import { IUserRequest, LoginResponse } from '../interfaces/auth.interface';

export const login = async (
    email: string,
    password: string,
): Promise<LoginResponse | undefined> => {
    try {
        return await apiPost(`${environment.SERVER_URI}${apiUris.login}`, {
            email,
            password,
        });
    } catch (error: unknown) {
        console.log(error);
    }
};

export const register = async (user: IUserRequest): Promise<IServerResponse | undefined> => {
    try {
        return await apiPost(`${environment.SERVER_URI}${apiUris.register}`, user);
    } catch (error: unknown) {
        console.log(error);
    }
};
