import { ILoginSuccessResponse } from '@/api/interfaces/auth.interface';
import { login } from '@/api/modules/auth.service';
import AuthConfirmButton from '@/components/modules/auth/confirm-btn.component';
import LoginForm from '@/components/modules/auth/login.component';
import AuthRedirectButton from '@/components/modules/auth/redirect-btn.component';
import { routes } from '@/constants/routes.constants';
import { showErrorAlert } from '@/shared/alerts/error.alert';
import { showSuccessAlert } from '@/shared/alerts/succes.alert';
import { useSession } from '@/store/context/react.ctx';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { viewStyles } from './styles';

export default function LoginScreen(): React.JSX.Element {
    const { session, signIn } = useSession();
    useEffect(() => {
        console.log("LOGin",session);
        
        if (session) router.replace(routes.HOME);
        return () => resetFields();
    }, []);

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
            showErrorAlert('Error', 'Datos incompletos', 'Regresar');
        else {
            const result = await login(email, password);
            if (!result?.success) showErrorAlert('Error', 'Datos incorrectos', 'Regresar');
            else if (result?.success) {
                const { data }: ILoginSuccessResponse = result;
                signIn(data?.token);
                router.replace({ pathname: routes.HOME });
                await showSuccessAlert('Logueo exitoso');
                resetFields();
            }
        }
    };

    return (
        <View style={viewStyles.login}>
            <View style={viewStyles.form}>
                <LoginForm
                    emailData={handleEmailData}
                    passwordData={handlePasswordData}
                    validatedData={handleDataValidated}
                ></LoginForm>
                <View style={viewStyles.buttons}>
                    <AuthRedirectButton
                        navigateTo="register"
                        redirectButtonText="Aún no estoy registrado"
                    ></AuthRedirectButton>
                    {/*                     <AuthRedirectButton
                        navigateTo="home"
                        redirectButtonText="Recuperar contraseña"
                    ></AuthRedirectButton> */}
                </View>
                <AuthConfirmButton
                    buttonText="Iniciar sesión"
                    onClick={confirmLogin}
                ></AuthConfirmButton>
            </View>
        </View>
    );
}
