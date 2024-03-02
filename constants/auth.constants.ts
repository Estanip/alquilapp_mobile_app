import { IUser } from '@/api/interfaces/user.interfaces';

export enum AuthStates {
    SUCCESS = 'SUCCESS',
    PENDING = 'PENDING',
    ERROR = 'ERROR',
}

export interface AuthState {
    status: AuthStates;
    success: boolean;
    error: unknown;
    user?: IUser;
    message: string;
}

/* export const tokenRegExp = */
/*     /^([A-Za-z]+(\d[A-Za-z]+)+)\d\.[A-Za-z]+\d([A-Za-z]+(2[A-Za-z]+)+)\d([A-Za-z]+(3[A-Za-z]+)+)\d[A-Za-z]+\d([A-Za-z]+(3[A-Za-z]+)+)\d[A-Za-z]+\d\.([A-Za-z]+(\d[A-Za-z]+)+)\d-[A-Za-z]+$/;
 */
export const tokenRegExp = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
export const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export const phoneNumberRegExp = /^\d\d\d\d\d\d\d\d\d\d$/;
export const identificationNumberRegExp = /^\d\d\d\d\d\d\d\d$/;
export enum RegisterFieldValues {
    EMAIL = 'email',
    PASSWORD = 'password',
    FIRST_NAME = 'first_name',
    LAST_NAME = 'last_name',
    IDENTIFICATION_NUMBER = 'identification_number',
    PHONE_NUMBER = 'phone_number',
    BIRTH_DATE = 'birth_date',
    MEMBERSHIP_TYPE = 'membership_type',
}
export enum RegisterFieldNames {
    EMAIL = 'Email',
    PASSWORD = 'Contraseña',
    FIRST_NAME = 'Nombre',
    LAST_NAME = 'Apellido',
    IDENTIFICATION_NUMBER = 'DNI',
    PHONE_NUMBER = 'Nro. Teléfono',
    BIRTH_DATE = 'Fecha de nacimiento',
    MEMBERSHIP_TYPE = 'Tipo de usuario',
}

export enum PasswordIconNames {
    EYE_CLOSED = 'eye-slash',
    EYE_OPEN = 'eye',
}
