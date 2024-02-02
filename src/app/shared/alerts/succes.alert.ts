import { Toast } from 'toastify-react-native';

enum ToastPositions {
    TOP = 'top',
    CENTER = 'center',
    BOTTOM = 'bottom',
}

export default (message: string, position: ToastPositions = ToastPositions.TOP) =>
    Toast.success(message, position);
