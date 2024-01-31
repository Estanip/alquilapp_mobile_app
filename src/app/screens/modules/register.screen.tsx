import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { signUp } from '../../api/modules/auth.service';
import AuthConfirmButton from '../../components/modules/auth/confirm-btn.component';
import AuthRedirectButton from '../../components/modules/auth/redirect-btn.component';
import RegisterForm from '../../components/modules/auth/register.component';
import TitleText from '../../components/modules/shared/title-text.component';
import { MembershipTypes } from '../../constants/user.constants';
import { useAppDispatch } from '../../store/hooks';
import { IRegisterForm } from '../interfaces/register.interfaces';

export default function RegisterScreen(): React.JSX.Element {
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

    const dispatch = useAppDispatch();
    const handleRegisterData = (data: IRegisterForm) => setRegisterState(data);
    const handleDataValidated = (data: boolean) => setDataValidated(data);
    const confirmRegister = () => {
        const notCompleted = Object.values(registerState).some((e) => !e || e === '');
        if (notCompleted || !validatedData)
            window.alert('Completa los campos correctamente antes de continuar');
        else return dispatch(signUp(registerState));
    };

    return (
        <View className="items-center justify-center bg-slate-50">
            <ScrollView className="px-8 my-5 w-full max-w-sm">
                <TitleText title="Registro"></TitleText>
                <RegisterForm
                    registerData={handleRegisterData}
                    validatedData={handleDataValidated}
                ></RegisterForm>
                <AuthRedirectButton
                    navigateTo="login"
                    redirectButtonText="Ya estoy registrado"
                ></AuthRedirectButton>
                <AuthConfirmButton
                    buttonText="Registro"
                    onClick={confirmRegister}
                ></AuthConfirmButton>
            </ScrollView>
        </View>
    );
}
