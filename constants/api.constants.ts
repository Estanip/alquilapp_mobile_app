import { IServerResponse } from '@/api/interfaces';
import { TToken } from '@/api/interfaces/auth.interfaces';

type HeadersOptions = {
  [key: string]: string;
};

export const apiUris = {
  register: '/auth/register',
  login: '/auth/login',
  reset_password: '/auth/change-password',
  user_code_verification: '/auth/code-verification',
  resend_verification_code: '/auth/resend-verification-code',
  courts: '/court',
  reservation: '/reservation',
  user: '/user',
  send_push_notification: 'https://exp.host/--/api/v2/push/send',
};

export const apiGet = (url: string, token: TToken): Promise<IServerResponse> => {
  return fetch(url, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(response => response);
};

export const apiPost = (
  url: string,
  body: object,
  token?: TToken,
  headers: HeadersOptions = { authorization: `Bearer ${token}` },
): Promise<IServerResponse> => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(response => response);
};

export const apiPut = (url: string, body: object, token?: TToken): Promise<IServerResponse> => {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(response => response);
};

export const apiDelete = async (url: string, token?: TToken): Promise<IServerResponse> => {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(response => response);
};
