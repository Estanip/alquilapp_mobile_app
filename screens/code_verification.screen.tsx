import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { homeStyles } from './styles';

import { AuthService } from '@/api/modules/auth.service';
import CommonButton from '@/components/modules/shared/button.component';
import { sharedStyles, textInputStyles } from '@/components/modules/shared/styles';
import { routes } from '@/constants/routes.constants';
import { showErrorAlert, showSuccessAlert } from '@/shared/alerts/toast.alert';
import { useSession } from '@/store/react.ctx';

export default function CodeVerificationScreen(): React.JSX.Element {
    // Session
    const { token, user_id, user_email } = useSession();

    // Code state
    const [code, setCode] = useState<string | null>(null);

    const _verifyUserCode = async () => {
        const result = await AuthService().verifyUserCode(token!, user_id!, code!);
        if (!result?.success) showErrorAlert('El código no es correcto');
        else if (result.success) {
            showSuccessAlert('Validación satisfactoria');
            router.replace(routes.HOME);
        }
    };

    const _resendCode = async () => {
        const result = await AuthService().resendCode(token!, user_id!, user_email!);
        if (!result?.success) showErrorAlert('Error al enviar email');
        else if (result.success) showSuccessAlert('Email enviado satisfactoriamente');
    };

    return (
        <View style={homeStyles.view}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={{ marginTop: 5 }}>
                    <TextInput
                        style={{ width: 300, ...textInputStyles.success }}
                        onChangeText={(value: string) => setCode(value)}
                        placeholder="Ingrese su código"
                    />
                    <Pressable onPress={_resendCode} style={{ padding: 4 }}>
                        <Text style={sharedStyles.buttonText}>Reenviar código</Text>
                    </Pressable>
                </View>
                <CommonButton _buttonText="Validar" _onClick={_verifyUserCode} _disabled={!code} />
            </View>
        </View>
    );
}
