import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { IRedirectBtnComponentProps } from '../../interfaces/auth.interfaces';
import { sharedStyles } from './styles';
import { routes } from '@/src/app/constants/routes.constants';

export default function AuthRedirectButton({
    navigateTo,
    redirectButtonText,
}: IRedirectBtnComponentProps) {
    const route = navigateTo === 'register' ? routes.register : routes.login;

    return (
        <Pressable
            onPress={() => {
                router.navigate({ pathname: route });
            }}
        >
            <Text className={sharedStyles.buttonText}>{redirectButtonText}</Text>
        </Pressable>
    );
}
