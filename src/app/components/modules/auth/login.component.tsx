import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput } from 'react-native';
import { ILoginComponentProps, IErrorState, ILoginForm } from '../../interfaces/auth.interfaces';
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
        setErrors({
            email: '',
            password: '',
        });
        value = value.trim();
        if (field === 'email') {
            if (value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.exec(value)) {
                setErrors({
                    email: 'Formato de email inválido',
                    password: errors.password,
                });
                validatedData(false);
            }

            if (!value?.length) {
                setErrors({
                    email: 'Campo obligatorio',
                    password: errors.password,
                });
                validatedData(false);
            }
        }

        if (field === 'password') {
            if (value.length > 0 && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.exec(value)) {
                setErrors({
                    email: errors.email,
                    password:
                        'La contraseña debe contener al menos 8 caracteres, un número, una letra y una mayúscula',
                });
                validatedData(false);
            }

            if (!value?.length) {
                setErrors({
                    email: errors.email,
                    password: 'Campo obligatorio',
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
                        className={`${sharedStyles.textInput} ${
                            errors.email === ''
                                ? sharedStyles.borderSuccess
                                : sharedStyles.borderError
                        }`}
                        onChangeText={(value: string) => {
                            setEmail(value);
                        }}
                        placeholder="Ingrese email"
                    ></TextInput>
                )}
            />
            <Text className={sharedStyles.textError}>{errors.email}</Text>
            <Controller
                control={control}
                name="password"
                render={() => (
                    <TextInput
                        className={`${sharedStyles.textInput} ${
                            errors.password === '' ? 'border-slate-200' : 'border-red-400'
                        }`}
                        onChangeText={(value: string) => {
                            setPassword(value);
                        }}
                        placeholder="Ingrese contraseña"
                    ></TextInput>
                )}
            />
            <Text className={sharedStyles.textError}>{errors.password}</Text>
        </>
    );
}
