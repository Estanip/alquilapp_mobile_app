import { StyleSheet } from 'react-native';

// Confirm BTN styles
/// classname
export const confirmBtnStyles = {
    pressableConfirmBtnStyle:
        'h-12 bg-sky-500 focus:bg-sky-700 disabled:bg-blue-200 rounded-md flex flex-row justify-center items-center px-6 mt-4',
    textConfirmBtnStyle: 'text-white text-base font-medium',
    viewConfirmBtnStyle: 'flex-1 flex items-center',
};

// Redirect BTN styles
/// classname
export const redirectBtnStyles = {};

// Shared styles
/// style
export const styles = StyleSheet.create({
    pickerViewStyle: {
        backgroundColor: 'white',
        borderColor: '#e2e8f0',
        borderRadius: 5,
        borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        overflow: 'hidden',
        paddingLeft: 15,
    },
});

/// classname
export const sharedStyles = {
    borderSuccess: 'border-slate-200',
    borderError: 'border-slate-200',
    buttonText: 'text-blue-500',
    textInput: 'w-full bg-white border rounded-md h-12 px-4 my-1',
    textError: 'pl-1 pb-2 text-red-600',
};

/// Props
export const pickerMembershipTypeProps = {
    label: 'Selecciona tipo de usuario',
    value: null,
    color: '#737373',
};
