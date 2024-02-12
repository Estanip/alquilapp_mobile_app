import { IRedirectBtnComponentProps } from '@/components/interfaces/auth.interfaces';
import { routes } from '@/constants/routes.constants';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { sharedStyles } from './styles';

export default function AuthRedirectButton({
    navigateTo,
    redirectButtonText,
}: IRedirectBtnComponentProps) {
    const route =
        navigateTo === 'register'
            ? routes.REGISTER
            : navigateTo === 'login'
              ? routes.LOGIN
              : routes.HOME;

    return (
        <Pressable onPress={async () => router.replace({ pathname: route })}>
            <Text style={sharedStyles.buttonText}>{redirectButtonText}</Text>
        </Pressable>
    );
}
