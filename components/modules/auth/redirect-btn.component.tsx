import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';

import { sharedStyles } from '../shared/styles';

import { IRedirectBtnComponentProps } from '@/components/interfaces/auth.interfaces';
import { routes } from '@/constants/routes.constants';

export default function AuthRedirectButton({
    _navigateTo,
    _redirectButtonText,
}: IRedirectBtnComponentProps) {
    const route =
        _navigateTo === 'register'
            ? routes.REGISTER
            : _navigateTo === 'login'
              ? routes.LOGIN
              : routes.HOME;

    return (
        <Pressable
            style={{ marginTop: 10 }}
            onPress={async () => router.replace({ pathname: route })}
        >
            <Text style={sharedStyles.buttonText}>{_redirectButtonText}</Text>
        </Pressable>
    );
}
