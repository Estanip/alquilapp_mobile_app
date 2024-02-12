import { StyleSheet } from 'react-native';

// Confirm BTN styles
export const confirmBtnStyles = StyleSheet.create({
    pressable: {
        height: 48, // h-12 in Tailwind
        backgroundColor: '#2196F3', // bg-sky-500 in Tailwind
        justifyContent: 'center', // flex-row and justify-center in Tailwind
        alignItems: 'center', // items-center in Tailwind
        paddingHorizontal: 24, // px-6 in Tailwind
        marginTop: 16, // mt-4 in Tailwind
        borderRadius: 8, // rounded-md in Tailwind
    },
    text: {
        color: 'white', // text-white in Tailwind
        fontSize: 16, // text-base in Tailwind
        fontWeight: 'bold', // font-medium in Tailwind
    },
    view: {
        flex: 1, // flex-1 in Tailwind
        justifyContent: 'center', // items-center in Tailwind
    },
});

// Redirect BTN styles
export const redirectBtnStyles = {};

// Shared styles
export const sharedStyles = StyleSheet.create({
    buttonText: {
        color: '#3B82F6', // text-blue-500 in Tailwind
    },
    iconView: {
        maxWidth: 32,
        alignContent: 'center',
        alignSelf: 'center',
        marginLeft: 4,
    },
    icon: { textAlign: 'center', width: 16 },
    pickerView: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        overflow: 'hidden',
        paddingLeft: 15,
        flex: 1,
        color: '#737373',
        padding: 8,
    },
    textInput: {
        width: '100%', // w-full in Tailwind
        backgroundColor: 'white', // bg-white in Tailwind
        borderRadius: 8, // rounded-md in Tailwind
        height: 48, // h-12 in Tailwind
        paddingLeft: 16, // px-4 in Tailwind
        marginVertical: 4, // my-1 in Tailwind
        color: 'gray',
    },
    textInputError: {
        width: '100%', // w-full in Tailwind
        backgroundColor: 'white', // bg-white in Tailwind
        borderRadius: 8, // rounded-md in Tailwind
        height: 48, // h-12 in Tailwind
        paddingLeft: 16, // px-4 in Tailwind
        marginVertical: 4, // my-1 in Tailwind
        color: 'gray',
        borderColor: 'red',
        borderWidth: 1,
    },
    textInputSuccess: {
        width: '100%', // w-full in Tailwind
        backgroundColor: 'white', // bg-white in Tailwind
        borderRadius: 8, // rounded-md in Tailwind
        height: 48, // h-12 in Tailwind
        paddingLeft: 16, // px-4 in Tailwind
        marginVertical: 4, // my-1 in Tailwind
        color: 'gray',
        borderColor: '#E5E7EB', // border-slate-200 in Tailwind
        borderWidth: 1,
    },
    textError: {
        paddingLeft: 4, // pl-1 in Tailwind
        paddingBottom: 8, // pb-2 in Tailwind
        color: '#EF4444', // text-red-600 in Tailwind
    },
    view: {
        maxWidth: '95%',
        marginLeft: 5,
    },
    viewWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '90%',
    },
});

/// Props
export const pickerMembershipTypeProps = {
    label: 'Selecciona tipo de usuario',
    value: null,
    color: '#737373',
};
