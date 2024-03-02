import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput } from 'react-native';

import { sharedStyles, textInputStyles } from '../shared/styles';

import { errorsState } from '@/components/constants/login.contants';
import {
    IErrorState,
    ILoginComponentProps,
    ILoginForm,
} from '@/components/interfaces/auth.interfaces';
import { emailRegExp, passwordRegExp } from '@/constants/auth.constants';

export default function LoginForm({
    _emailData,
    _passwordData,
    _validatedData,
}: ILoginComponentProps): React.JSX.Element {
    // Login state
    const { control, setValue, getValues } = useForm<ILoginForm>();

    // Errors state
    const [errors, setErrors] = useState<IErrorState>(errorsState);

    const checkErrors = (value: string, field: string) => {
        _validatedData(true);
        value = value.trim();

        if (field === 'email') {
            setErrors({ password: errors.password, email: '' });
            if (!value?.length) {
                setErrors({
                    email: 'Campo obligatorio',
                    password: errors.password,
                });
                _validatedData(false);
            } else if (!emailRegExp.exec(value)) {
                setErrors({
                    email: 'Formato de email inválido',
                    password: errors.password,
                });
                _validatedData(false);
            }
        }

        if (field === 'password') {
            setErrors({ password: '', email: errors.email });
            if (!value?.length) {
                setErrors({
                    email: errors.email,
                    password: 'Campo obligatorio',
                });
                _validatedData(false);
            } else if (!passwordRegExp.exec(value)) {
                setErrors({
                    email: errors.email,
                    password:
                        'La contraseña debe contener al menos 8 caracteres, un número, una letra y una mayúscula',
                });
                _validatedData(false);
            }
        }
    };
    const setEmail = (value: string) => {
        setValue('email', value);
        _emailData(getValues('email'));
        checkErrors(getValues('email'), 'email');
    };
    const setPassword = (value: string) => {
        setValue('password', value);
        _passwordData(getValues('password'));
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
                            errors.email === '' ? textInputStyles.success : textInputStyles.error
                        }
                        onChangeText={(value: string) => {
                            setEmail(value);
                        }}
                        placeholder="Ingrese email"
                    />
                )}
            />
            <Text style={sharedStyles.textError}>{errors.email}</Text>
            <Controller
                control={control}
                name="password"
                render={() => (
                    <TextInput
                        style={
                            errors.password === '' ? textInputStyles.success : textInputStyles.error
                        }
                        onChangeText={(value: string) => {
                            setPassword(value);
                        }}
                        placeholder="Ingrese contraseña"
                    />
                )}
            />
            <Text style={sharedStyles.textError}>{errors.password}</Text>
        </>
    );
}
