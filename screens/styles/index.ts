import { StyleSheet } from 'react-native';

// Shared styles
const sharedStyles = StyleSheet.create({
    viewForm: {
        width: '100%',
    },
});

// Login screen styles
export const loginStyles = StyleSheet.create({
    view: {
        paddingVertical: 60,
        paddingHorizontal: 24,
        backgroundColor: '#f0f8ff',
    },
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    viewForm: {
        ...sharedStyles.viewForm,
    },
});

// Register screen styles
export const registerStyles = StyleSheet.create({
    view: {
        paddingVertical: 25,
        paddingHorizontal: 24,
        backgroundColor: '#f0f8ff',
    },
    viewForm: {
        ...sharedStyles.viewForm,
    },
});

// Home screen styles
export const homeStyles = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f8ff',
        padding: 12,
    },
    viewButtons: {
        paddingHorizontal: 8,
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
        maxWidth: 320,
    },
});

// Book screen styles
export const bookStyles = StyleSheet.create({
    textInputDatePicker: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: 48,
        paddingLeft: 16,
        color: 'gray',
        borderWidth: 1,
    },
    view: {
        flex: 1,
        padding: 20,
    },
    viewButtons: {
        paddingHorizontal: 8,
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
        maxWidth: 320,
    },
    viewPicker: {
        backgroundColor: 'white',
        borderWidth: 1,
        height: 45,
        borderRadius: 6,
        overflow: 'hidden',
        paddingLeft: 15,
        color: '#737373',
        justifyContent: 'center',
    },
    viewPickerMulti: {
        backgroundColor: 'white',
        borderWidth: 1,
        height: 100,
        borderRadius: 6,
        overflow: 'hidden',
        paddingLeft: 15,
        color: '#737373',
        justifyContent: 'center',
    },
});

export const pickerCourts = {
    label: 'Selecciona cancha',
    value: null,
    color: '#737373',
};
