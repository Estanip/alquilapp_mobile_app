import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { iconStyles, sharedStyles, textInputStyles, viewStyles } from '../shared/styles';

import { errorsState } from '@/components/constants/login.constants';
import {
    IErrorState,
    ILoginComponentProps,
    ILoginForm,
} from '@/components/interfaces/auth.interfaces';
import { PasswordIconNames, emailRegExp, passwordRegExp } from '@/constants/auth.constants';
import { FontAwesome } from '@expo/vector-icons';

export default function LoginForm({
    _resetPassword,
    _emailData,
    _passwordData,
    _validatedData,
}: ILoginComponentProps): React.JSX.Element {
    // Password visibility state
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [passwordIconName, setPasswordIconName] = useState(PasswordIconNames.EYE_OPEN);
    const _showPassword = () => {
        setPasswordVisibility(!passwordVisibility);
        if (!passwordVisibility) setPasswordIconName(PasswordIconNames.EYE_CLOSED);
        else setPasswordIconName(PasswordIconNames.EYE_OPEN);
    };

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
                            errors.email === ''
                                ? { width: 360, ...textInputStyles.success }
                                : { width: 360, ...textInputStyles.error }
                        }
                        onChangeText={(value: string) => {
                            setEmail(value);
                        }}
                        placeholder="Ingrese email"
                    />
                )}
            />
            <Text style={sharedStyles.textError}>{errors.email}</Text>
            <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            >
                <Controller
                    control={control}
                    name="password"
                    render={() => (
                        <TextInput
                            secureTextEntry={!!!passwordVisibility}
                            style={
                                errors.password === ''
                                    ? { width: 330, ...textInputStyles.success }
                                    : { width: 330, ...textInputStyles.error }
                            }
                            onChangeText={(value: string) => {
                                setPassword(value);
                            }}
                            placeholder={
                                _resetPassword ? 'Ingrese nueva contraseña' : 'Ingrese contraseña'
                            }
                        />
                    )}
                />
                <View key={'View-Icon'} style={viewStyles.icon}>
                    <FontAwesome.Button
                        underlayColor="transparent"
                        name={passwordIconName}
                        size={20}
                        iconStyle={iconStyles.icon}
                        style={iconStyles.background}
                        onPress={() => _showPassword()}
                    />
                </View>
            </View>
            <Text style={sharedStyles.textError}>{errors.password}</Text>
        </>
    );
}
