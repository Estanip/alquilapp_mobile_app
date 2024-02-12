import {
    IErrorState,
    ILoginComponentProps,
    ILoginForm,
} from '@/components/interfaces/auth.interfaces';
import { emailRegExp, passwordRegExp } from '@/constants/auth.constants';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput } from 'react-native';
import { sharedStyles } from './styles';

export default function LoginForm({
    emailData,
    passwordData,
    validatedData,
}: ILoginComponentProps): React.JSX.Element {
    const errorsState = {
        email: '',
        password: '',
    };
    const [errors, setErrors] = useState<IErrorState>(errorsState);
    const { control, setValue, getValues } = useForm<ILoginForm>();

    const checkErrors = (value: string, field: string) => {
        validatedData(true);
        value = value.trim();

        if (field === 'email') {
            setErrors({ password: errors.password, email: '' });
            if (!value?.length) {
                setErrors({
                    email: 'Campo obligatorio',
                    password: errors.password,
                });
                validatedData(false);
            } else if (!emailRegExp.exec(value)) {
                setErrors({
                    email: 'Formato de email inválido',
                    password: errors.password,
                });
                validatedData(false);
            }
        }

        if (field === 'password') {
            setErrors({ password: '', email: errors.email });
            if (!value?.length) {
                setErrors({
                    email: errors.email,
                    password: 'Campo obligatorio',
                });
                validatedData(false);
            } else if (!passwordRegExp.exec(value)) {
                setErrors({
                    email: errors.email,
                    password:
                        'La contraseña debe contener al menos 8 caracteres, un número, una letra y una mayúscula',
                });
                validatedData(false);
            }
        }
    };
    const setEmail = (value: string) => {
        setValue('email', value);
        emailData(getValues('email'));
        checkErrors(getValues('email'), 'email');
    };
    const setPassword = (value: string) => {
        setValue('password', value);
        passwordData(getValues('password'));
        checkErrors(getValues('password'), 'password');
    };

    return (
        <>
            <Controller
                control={control}
                name="email"
                render={() => (
                    <TextInput
                        style={
                            errors.email === ''
                                ? sharedStyles.textInputSuccess
                                : sharedStyles.textInputError
                        }
                        onChangeText={(value: string) => {
                            setEmail(value);
                        }}
                        placeholder="Ingrese email"
                    ></TextInput>
                )}
            />
            <Text style={sharedStyles.textError}>{errors.email}</Text>
            <Controller
                control={control}
                name="password"
                render={() => (
                    <TextInput
                        style={
                            errors.password === ''
                                ? sharedStyles.textInputSuccess
                                : sharedStyles.textInputError
                        }
                        onChangeText={(value: string) => {
                            setPassword(value);
                        }}
                        placeholder="Ingrese contraseña"
                    ></TextInput>
                )}
            />
            <Text style={sharedStyles.textError}>{errors.password}</Text>
        </>
    );
}
