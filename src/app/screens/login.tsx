import React from 'react';
import { View } from 'react-native';
import LoginScreen from './modules/login.screen';
import { isAuthenticated } from '../shared/authentication/is-authenticated';
import RegisterScreen from './modules/register.screen';

export default function Login(): React.JSX.Element {
    return (
        <View>
            {isAuthenticated ? <RegisterScreen></RegisterScreen> : <LoginScreen></LoginScreen>}
        </View>
    );
}
