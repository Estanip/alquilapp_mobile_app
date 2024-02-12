import { register } from '@/api/modules/auth.service';
import AuthConfirmButton from '@/components/modules/auth/confirm-btn.component';
import AuthRedirectButton from '@/components/modules/auth/redirect-btn.component';
import RegisterForm from '@/components/modules/auth/register.component';
import { routes } from '@/constants/routes.constants';
import { ButtonStyles, showErrorAlert } from '@/shared/alerts/error.alert';
import { showSuccessAlert } from '@/shared/alerts/succes.alert';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { IRegisterForm } from './interfaces/register.interfaces';
import { scrollView, viewStyles } from './styles';
import { useSession } from '@/store/context/react.ctx';

export default function RegisterScreen(): React.JSX.Element {
    const { session } = useSession();
    useEffect(() => {
        console.log('registe', session);

        if (session) router.replace(routes.HOME);
        return () => resetFields();
    }, []);

    const registerForm: IRegisterForm = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        identification_number: '',
        phone_number: '',
        birth_date: '',
        membership_type: '',
    };
    const [registerState, setRegisterState] = useState<IRegisterForm>(registerForm);
    const [validatedData, setDataValidated] = useState<boolean>();

    const resetFields = () => handleRegisterData(registerForm);
    const handleRegisterData = (data: IRegisterForm) => setRegisterState(data);
    const handleDataValidated = (data: boolean) => setDataValidated(data);
    const confirmRegister = async () => {
        const notCompleted = Object.values(registerState).some((e) => !e || e === '');
        if (notCompleted || !validatedData)
            showErrorAlert('Error', 'Datos incompoletos', 'Regresar');
        else {
            const result = await register(registerState);
            if (result?.message === 'User exists')
                showErrorAlert(
                    'Error',
                    'Ya existe un usuario registrado con los datos ingresados',
                    'Regresar',
                    ButtonStyles.DEFAULT,
                    true,
                    'Ir a Login',
                    'login',
                );
            else if (!result?.success) showErrorAlert('Error', 'Datos incorrectos', 'Regresar');
            else if (result?.success) {
                resetFields();
                await showSuccessAlert('Registro exitoso');
                router.replace({ pathname: routes.LOGIN });
            }
        }
    };

    return (
        <View style={viewStyles.register}>
            <ScrollView style={scrollView.form}>
                <RegisterForm
                    registerData={handleRegisterData}
                    validatedData={handleDataValidated}
                ></RegisterForm>
                <AuthRedirectButton
                    navigateTo="login"
                    redirectButtonText="Ya estoy registrado"
                ></AuthRedirectButton>
                <AuthConfirmButton
                    buttonText="Registrarme"
                    onClick={confirmRegister}
                ></AuthConfirmButton>
            </ScrollView>
        </View>
    );
}
