import { router } from 'expo-router';
import { Alert, AlertButton } from 'react-native';
import { routes } from '../../constants/routes.constants';

export enum ButtonStyles {
    CANCEL = 'cancel',
    DEFAULT = 'default',
    DESTRUCTIVE = 'destructive',
}

export const showErrorAlert = (
    title: string,
    message: string,
    buttonText: string,
    buttonStyle: ButtonStyles = ButtonStyles.DEFAULT,
    redirect: boolean = false,
    redirectMessage: string = 'Ir a',
    redirectPath: string = '',
) => {
    const alertOptions: [AlertButton] = [
        {
            text: buttonText,
            style: buttonStyle,
        },
    ];
    if (redirect) {
        const route = redirectPath === 'login' ? routes.LOGIN : routes.REGISTER;
        alertOptions.push({
            text: redirectMessage,
            style: buttonStyle,
            onPress: () => router.replace({ pathname: route }),
        });
    }
    return Alert.alert(title, message, alertOptions);
};
