import { Alert } from 'react-native';

enum ButtonStyles {
    CANCEL = 'cancel',
    DEFAULT = 'default',
    DESTRUCTIVE = 'destructive',
}

export default (
    title: string,
    message: string,
    buttonText: string,
    buttonStyle: ButtonStyles = ButtonStyles.DEFAULT,
) => {
    return Alert.alert(title, message, [
        {
            text: buttonText,
            style: buttonStyle,
        },
    ]);
};
