import { Toast } from 'toastify-react-native';

enum ToastPositions {
    TOP = 'top',
    CENTER = 'center',
    BOTTOM = 'bottom',
}

export const showInfoAlert = (message: string, position: ToastPositions = ToastPositions.TOP) =>
    Toast.info(message, position);
