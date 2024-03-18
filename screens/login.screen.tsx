import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { loginStyles } from './styles';

import { AuthService } from '@/api/modules/auth.service';
import AuthConfirmButton from '@/components/modules/auth/confirm-btn.component';
import LoginForm from '@/components/modules/auth/login.component';
import AuthRedirectButton from '@/components/modules/auth/redirect-btn.component';
import SharedButton from '@/components/modules/shared/button.component';
import { ButtonTextActions } from '@/constants';
import { routes, screenNavigations } from '@/constants/routes.constants';
import { IRoute } from '@/interfaces';
import { showSuccessAlert } from '@/shared/alerts/toast.alert';
import { showAlert } from '@/shared/alerts/window.alert';
import { useSession } from '@/store/react.ctx';

export default function LoginScreen(): React.JSX.Element {
    // Params from navigate
    const route: IRoute = useRoute();

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
            const result = await AuthService().login({ email, password });
            if (!result) showAlert('Error', 'Estamos teniendo inconvenientes, intente más tarde');
            else if (!result?.success) showAlert('Error', 'Datos incorrectos');
            else if (result?.success) {
                signIn(result?.data.token, result?.data._id);
                router.replace({ pathname: routes.HOME });
                await showSuccessAlert('Logueo exitoso');
                resetFields();
            }
        }
    };
    const resetPasword = async () => {
        if (password === '' || email === '' || !validatedData)
            showAlert('Error', 'Datos incompletos');
        else {
            const result = await AuthService().resetPassword({ email, new_password: password });
            if (!result) showAlert('Error', 'Estamos teniendo inconvenientes, intente más tarde');
            else if (!result?.success) showAlert('Error', 'Datos incorrectos');
            else if (result?.success) {
                router.replace({ pathname: routes.LOGIN });
                await showSuccessAlert('La contraseña se ha actualizado correctamente');
                resetFields();
            }
        }
    };

    return (
        <View style={loginStyles.view}>
            <View style={loginStyles.viewForm}>
                <LoginForm
                    _resetPassword={route?.params?._password_reset === '1'}
                    _emailData={handleEmailData}
                    _passwordData={handlePasswordData}
                    _validatedData={handleDataValidated}
                />
                {route?.params?._password_reset === '1' ? null : (
                    <View style={loginStyles.viewButtons}>
                        <AuthRedirectButton
                            _navigateTo={screenNavigations.REGISTER}
                            _redirectButtonText="Aún no estoy registrado"
                        />
                        <AuthRedirectButton
                            _navigateTo={screenNavigations.RESET_PASSWORD}
                            _redirectButtonText="Recuperar contraseña"
                        />
                    </View>
                )}
                {route?.params?._password_reset === '1' ? (
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <SharedButton
                            _btnStyle={{ width: 150 }}
                            _buttonText={ButtonTextActions.CONFIRM}
                            _onClick={resetPasword}
                        />
                        <SharedButton
                            _btnStyle={{ width: 150, backgroundColor: 'red' }}
                            _buttonText={ButtonTextActions.BACK}
                            _onClick={() =>
                                router.replace({
                                    pathname: routes.LOGIN,
                                    params: { _password_reset: '0' },
                                })
                            }
                        />
                    </View>
                ) : (
                    <AuthConfirmButton _buttonText="Iniciar sesión" _onClick={confirmLogin} />
                )}
            </View>
        </View>
    );
}
