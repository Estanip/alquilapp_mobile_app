import { IRegisterForm } from '../../screens/interfaces/register.interfaces';

export interface IRegisterComponentProps {
    registerData: (arg: IRegisterForm) => void;
    validatedData: (arg: boolean) => void;
}
export interface IRedirectBtnComponentProps {
    navigateTo: string;
    redirectButtonText: string;
}
export interface IConfirmBtnComponentProps {
    buttonText: string;
    onClick: () => void;
}
export interface ILoginComponentProps {
    emailData: (arg: string) => void;
    passwordData: (arg: string) => void;
    validatedData: (arg: boolean) => void;
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
