import { StyleProp } from 'react-native';

import { IUser } from '@/api/interfaces/user.interfaces';
import { AuthStates } from '@/constants/auth.constants';
import { IRegisterForm } from '@/screens/interfaces/register.interfaces';

export interface AuthState {
    status: AuthStates;
    success: boolean;
    error: unknown;
    user?: IUser;
    message: string;
}

export interface IRegisterComponentProps {
    _registerData: (arg: IRegisterForm) => void;
    _validatedData: (arg: boolean) => void;
}
export interface IRedirectBtnComponentProps {
    _navigateTo: string;
    _redirectButtonText: string;
}
export interface IConfirmBtnComponentProps {
    _buttonText: string;
    _btnStyle?: StyleProp<any>;
    _onClick: () => void;
    _disabled?: boolean;
}
export interface ILoginComponentProps {
    _resetPassword?: boolean;
    _emailData: (arg: string) => void;
    _passwordData: (arg: string) => void;
    _validatedData: (arg: boolean) => void;
}
export type TDateTimePickerModes = 'date' | 'time' | 'datetime' | 'countdown';
export type TRegisterValues =
    | 'email'
    | 'password'
    | 'first_name'
    | 'last_name'
    | 'identification_number';
export interface ILoginForm {
    email: string;
    password: string;
}

export interface IErrorState {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    identification_number: string;
    phone_number: string;
    birth_date: string;
    membership_type: string;
}

export interface ILoginErrorState extends Pick<IErrorState, 'email' | 'password'> {}
