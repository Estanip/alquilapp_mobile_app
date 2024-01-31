import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { IRedirectBtnComponentProps } from '../../interfaces/auth.interfaces';
import { sharedStyles } from './styles';

export default function AuthRedirectButton({
    navigateTo,
    redirectButtonText,
}: IRedirectBtnComponentProps) {
    const route = navigateTo === 'register' ? '/auth/register' : '/auth/login';

    return (
        <Pressable
            onPress={() => {
                router.replace(route);
            }}
        >
            <Text className={sharedStyles.buttonText}>{redirectButtonText}</Text>
        </Pressable>
    );
}
