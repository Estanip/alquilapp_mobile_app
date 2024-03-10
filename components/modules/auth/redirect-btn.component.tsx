import React from 'react';
import { Pressable, Text } from 'react-native';

import { sharedStyles } from '../shared/styles';

import { IRedirectBtnComponentProps } from '@/components/interfaces/auth.interfaces';
import { routes, screenNavigations } from '@/constants/routes.constants';
import { router } from 'expo-router';

export default function AuthRedirectButton({
    _navigateTo,
    _redirectButtonText,
}: IRedirectBtnComponentProps) {
    const route =
        _navigateTo === screenNavigations.REGISTER
            ? routes.REGISTER
            : _navigateTo === screenNavigations.LOGIN
              ? routes.LOGIN
              : _navigateTo === screenNavigations.RESET_PASSWORD
                ? routes.RESET_PASSWORD
                : routes.HOME;

    return (
        <Pressable
            onPress={() =>
                router.replace({
                    pathname: route,
                    params:
                        _navigateTo === screenNavigations.RESET_PASSWORD
                            ? { _password_reset: '1' }
                            : { _password_reset: '0' },
                })
            }
        >
            <Text style={sharedStyles.buttonText}>{_redirectButtonText}</Text>
        </Pressable>
    );
}
