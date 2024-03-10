import { StyleProp } from 'react-native';

import { IRegisterForm } from '@/screens/interfaces/register.interfaces';

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
}
export interface ILoginComponentProps {
    _resetPassword?: boolean;
    _emailData: (arg: string) => void;
    _passwordData: (arg: string) => void;
    _validatedData: (arg: boolean) => void;
}
export type TDateTimePickerModes = 'date' | 'time' | 'datetime' | 'countdown';
export type TDate = Date;
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
}
