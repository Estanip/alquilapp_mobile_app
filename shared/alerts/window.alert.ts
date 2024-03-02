import { router } from 'expo-router';
import { Alert, AlertButton } from 'react-native';

import { routes } from '../../constants/routes.constants';

export enum ButtonStyles {
    CANCEL = 'cancel',
    DEFAULT = 'default',
    DESTRUCTIVE = 'destructive',
}

export const showAlert = (
    title: string,
    message: string,
    redirectOptions = { active: false, message: 'Ir a', path: '' },
    callbackOptions = {
        active: false,
        message: '',
        return: () => console.log('Callback'),
    },
    deniedOptions = {
        active: true,
        message: 'Cancelar',
    },
) => {
    const alertOptions = {};
    const alertButtons: AlertButton[] = [];
    if (redirectOptions.active) {
        let route = routes.HOME;
        switch (redirectOptions.path) {
            case 'login':
                route = routes.LOGIN;
                break;
            case 'register':
                route = routes.REGISTER;
                break;
            case 'home':
                route = routes.HOME;
                break;
            case 'book':
                route = routes.BOOK;
                break;
            case 'bookings':
                route = routes.BOOKINGS;
                break;
        }
        alertButtons.push({
            text: redirectOptions.message,
            style: ButtonStyles.DEFAULT,
            onPress: () => router.replace({ pathname: route }),
        });
    }
    if (callbackOptions.active) {
        alertButtons.push({
            text: callbackOptions.message,
            style: ButtonStyles.DEFAULT,
            onPress: () => callbackOptions.return(),
        });
    }
    if (deniedOptions.active) {
        alertButtons.push({
            text: deniedOptions.message,
            style: ButtonStyles.CANCEL,
        });
    }
    return Alert.alert(title, message, alertButtons, alertOptions);
};
