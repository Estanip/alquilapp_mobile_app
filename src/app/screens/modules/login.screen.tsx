import React, { useState } from 'react';
import { View } from 'react-native';
import { signIn } from '../../api/modules/auth.service';
import AuthConfirmButton from '../../components/modules/auth/confirm-btn.component';
import AuthRedirectButton from '../../components/modules/auth/redirect-btn.component';
import LoginForm from '../../components/modules/auth/login.component';
import TitleText from '../../components/modules/shared/title-text.component';
import { useAppDispatch } from '../../store/hooks';

export default function LoginScreen(): React.JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validatedData, setDataValidated] = useState<boolean>();

    const dispatch = useAppDispatch();
    const handleEmailData = (data: string) => setEmail(data);
    const handlePasswordData = (data: string) => setPassword(data);
    const handleDataValidated = (data: boolean) => setDataValidated(data);
    const confirmLogin = async () => {
        if (password === '' || email === '' || !validatedData)
            window.alert('Completa los campos correctamente antes de continuar');
        else await dispatch(signIn(email, password));
    };

    return (
        <View className="items-center bg-slate-50">
            <View className="p-8 w-full max-w-sm">
                <TitleText title="Ingreso"></TitleText>
                <LoginForm
                    emailData={handleEmailData}
                    passwordData={handlePasswordData}
                    validatedData={handleDataValidated}
                ></LoginForm>
                <View className="flex flex-row justify-between items-center mb-6">
                    <AuthRedirectButton
                        navigateTo="register"
                        redirectButtonText="Aún no estoy registrado"
                    ></AuthRedirectButton>
                    <AuthRedirectButton
                        navigateTo="register"
                        redirectButtonText="Recuperar contraseña"
                    ></AuthRedirectButton>
                </View>
                <AuthConfirmButton
                    buttonText="Inciar sesión"
                    onClick={confirmLogin}
                ></AuthConfirmButton>
            </View>
        </View>
    );
}
