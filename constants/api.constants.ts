import { IServerResponse } from '@/api/interfaces';
import { TToken } from '@/api/interfaces/auth.interfaces';

export const apiUris = {
    register: '/auth/register',
    login: '/auth/login',
    courts: '/court',
    reservation: '/reservation',
    user: '/user',
};

export const apiGet = (url: string, token: TToken): Promise<IServerResponse> => {
    return fetch(url, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((response) => response);
};

export const apiPost = (url: string, body: object, token?: TToken): Promise<IServerResponse> => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((response) => response);
};

export const apiDelete = async (url: string, token?: TToken): Promise<IServerResponse> => {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((response) => response);
};
