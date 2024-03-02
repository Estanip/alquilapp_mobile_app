import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { registerForm } from './constants/register.constants';
import { IRegisterForm } from './interfaces/register.interfaces';
import { registerStyles } from './styles';

import { register } from '@/api/modules/auth.service';
import AuthConfirmButton from '@/components/modules/auth/confirm-btn.component';
import AuthRedirectButton from '@/components/modules/auth/redirect-btn.component';
import RegisterForm from '@/components/modules/auth/register.component';
import { routes } from '@/constants/routes.constants';
import { showSuccessAlert } from '@/shared/alerts/toast.alert';
import { showAlert } from '@/shared/alerts/window.alert';
import { useSession } from '@/store/react.ctx';

export default function RegisterScreen(): React.JSX.Element {
    // Session
    const { token } = useSession();
    useEffect(() => {
        if (token) router.replace(routes.HOME);
        return () => resetFields();
    }, []);

    // Register state
    const [registerState, setRegisterState] = useState<IRegisterForm>(registerForm);
    const [validatedData, setDataValidated] = useState<boolean>();

    const resetFields = () => handleRegisterData(registerForm);
    const handleRegisterData = (data: IRegisterForm) => setRegisterState(data);
    const handleDataValidated = (data: boolean) => setDataValidated(data);
    const confirmRegister = async () => {
        const notCompleted = Object.values(registerState).some((e) => !e || e === '');
        if (notCompleted || !validatedData) showAlert('Error', 'Datos incompoletos');
        else {
            const result = await register(registerState);
            if (result?.message === 'User exists')
                showAlert(
                    'Error',
                    'Ya existe un usuario registrado con los datos ingresados',
                    { active: true, message: 'Ir a Login', path: 'login' },
                    { active: false, message: '', return: () => null },
                    { active: true, message: 'Cancelar' },
                );
            else if (!result?.success) showAlert('Error', 'Datos incorrectos');
            else if (result?.success) {
                resetFields();
                await showSuccessAlert('Registro exitoso');
                router.replace({ pathname: routes.LOGIN });
            }
        }
    };

    return (
        <View style={registerStyles.view}>
            <ScrollView style={registerStyles.viewForm}>
                <RegisterForm
                    _registerData={handleRegisterData}
                    _validatedData={handleDataValidated}
                />
                <AuthRedirectButton _navigateTo="login" _redirectButtonText="Ya estoy registrado" />
                <AuthConfirmButton _buttonText="Registrarme" _onClick={confirmRegister} />
            </ScrollView>
        </View>
    );
}
