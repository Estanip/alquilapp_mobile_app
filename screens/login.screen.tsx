import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { loginStyles } from './styles';

import { login } from '@/api/modules/auth.service';
import AuthConfirmButton from '@/components/modules/auth/confirm-btn.component';
import LoginForm from '@/components/modules/auth/login.component';
import AuthRedirectButton from '@/components/modules/auth/redirect-btn.component';
import { routes } from '@/constants/routes.constants';
import { showSuccessAlert } from '@/shared/alerts/toast.alert';
import { showAlert } from '@/shared/alerts/window.alert';
import { useSession } from '@/store/react.ctx';

export default function LoginScreen(): React.JSX.Element {
    // Session
    const { token, signIn } = useSession();
    useEffect(() => {
        if (token) router.replace(routes.HOME);
        return () => resetFields();
    }, []);

    // Login state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validatedData, setDataValidated] = useState<boolean>();

    const resetFields = () => {
        handleEmailData('');
        handlePasswordData('');
    };
    const handleEmailData = (data: string) => setEmail(data);
    const handlePasswordData = (data: string) => setPassword(data);
    const handleDataValidated = (data: boolean) => setDataValidated(data);
    const confirmLogin = async () => {
        if (password === '' || email === '' || !validatedData)
            showAlert('Error', 'Datos incompletos');
        else {
            const result = await login({ email, password });
            if (!result?.success) showAlert('Error', 'Datos incorrectos');
            else if (result?.success) {
                signIn(result?.data.token, result?.data._id);
                router.replace({ pathname: routes.HOME });
                await showSuccessAlert('Logueo exitoso');
                resetFields();
            }
        }
    };

    return (
        <View style={loginStyles.view}>
            <View style={loginStyles.viewForm}>
                <LoginForm
                    _emailData={handleEmailData}
                    _passwordData={handlePasswordData}
                    _validatedData={handleDataValidated}
                />
                <View style={loginStyles.viewButtons}>
                    <AuthRedirectButton
                        _navigateTo="register"
                        _redirectButtonText="Aún no estoy registrado"
                    />
                    {/*                     <AuthRedirectButton
                        navigateTo="home"
                        redirectButtonText="Recuperar contraseña"
                    ></AuthRedirectButton> */}
                </View>
                <AuthConfirmButton _buttonText="Iniciar sesión" _onClick={confirmLogin} />
            </View>
        </View>
    );
}
