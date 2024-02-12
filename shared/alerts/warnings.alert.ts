import { Toast } from 'toastify-react-native';

enum ToastPositions {
    TOP = 'top',
    CENTER = 'center',
    BOTTOM = 'bottom',
}

export const showWarningAlert = (message: string, position: ToastPositions = ToastPositions.TOP) =>
    Toast.warn(message, position);
