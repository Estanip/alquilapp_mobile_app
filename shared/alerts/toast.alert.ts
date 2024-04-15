import { Toast } from 'toastify-react-native';

enum ToastPositions {
  TOP = 'top',
  CENTER = 'center',
  BOTTOM = 'bottom',
}

export const showInfoAlert = (message: string, position: ToastPositions = ToastPositions.TOP) =>
  Toast.info(message, position);

export const showSuccessAlert = (message: string, position: ToastPositions = ToastPositions.TOP) =>
  Toast.success(message, position);

export const showWarningAlert = (message: string, position: ToastPositions = ToastPositions.TOP) =>
  Toast.warn(message, position);

export const showErrorAlert = (message: string, position: ToastPositions = ToastPositions.TOP) =>
  Toast.error(message, position);
