import { StyleSheet } from 'react-native';

// Title text styles
export const titleTextStyles = StyleSheet.create({
    textInput: {
        marginBottom: 4,
        color: '#1E3A8A',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

// Shared button styles
export const sharedBtnStyles = StyleSheet.create({
    pressable: {
        height: 40,
        width: 200,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 16,
        borderRadius: 8,
    },
    disabled: {
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    view: {
        flex: 1,
        justifyContent: 'center',
    },
});

// Confirm BTN styles
export const confirmBtnStyles = StyleSheet.create({
    pressable: {
        height: 48,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 16,
        borderRadius: 8,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    view: {
        flex: 1,
        justifyContent: 'center',
    },
});

// Redirect BTN styles
export const redirectBtnStyles = {};

// Components sharedStyles
export const sharedStyles = StyleSheet.create({
    buttonText: {
        color: '#3B82F6',
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: 48,
        paddingLeft: 16,
        color: 'gray',
        borderWidth: 1,
    },
    textError: {
        paddingLeft: 4,
        marginTop: 1,
        marginBottom: 12,
        color: '#EF4444',
    },
});

// Shared icon styles
export const iconStyles = StyleSheet.create({
    background: {
        backgroundColor: '#f0f8ff',
    },
    icon: {
        color: '#2196F3',
    },
});

// Shared text inputs styles
export const textInputStyles = StyleSheet.create({
    success: {
        ...sharedStyles.textInput,
        borderColor: 'gray',
    },
    error: {
        ...sharedStyles.textInput,
        borderColor: 'red',
    },
    successWithIcon: {
        ...sharedStyles.textInput,
        borderColor: 'gray',
        width: '90%',
    },
    errorWithIcon: {
        ...sharedStyles.textInput,
        borderColor: 'red',
        width: '90%',
    },
});

// Shared view styles
export const viewStyles = StyleSheet.create({
    icon: {
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        backgroundColor: 'white',
        borderWidth: 1,
        height: 45,
        borderRadius: 6,
        overflow: 'hidden',
        paddingLeft: 15,
        color: '#737373',
        justifyContent: 'center',
    },
    withIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

// shared view Picker styles
export const viewPickerStyles = StyleSheet.create({
    success: {
        ...viewStyles.picker,
        borderColor: 'gray',
    },
    error: {
        ...viewStyles.picker,
        borderColor: 'red',
    },
});

/// Props
export const pickerMembershipTypeProps = {
    label: 'Seleccione tipo de usuario',
    value: null,
    color: '#737373',
};

export const disabledBackgroundColor = '#DCDCDC';
