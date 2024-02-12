import { StyleSheet } from 'react-native';
// Title text styles
export const titleTextStyles = StyleSheet.create({
    textInput: {
        marginBottom: 4, // mb-4 in Tailwind
        color: '#1E3A8A', // text-sky-800 in Tailwind
        fontSize: 18, // text-lg in Tailwind
        fontWeight: 'bold', // font-bold in Tailwind
    },
});

// Shared button styles
export const sharedBtnStyles = StyleSheet.create({
    pressable: {
        height: 40, // h-12 in Tailwind
        width: 200,
        backgroundColor: '#2196F3', // bg-sky-500 in Tailwind
        justifyContent: 'center', // flex-row and justify-center in Tailwind
        alignItems: 'center', // items-center in Tailwind
        paddingHorizontal: 24, // px-6 in Tailwind
        marginTop: 16, // mt-4 in Tailwind
        borderRadius: 8, // rounded-md in Tailwind
    },
    focusPressable: {
        backgroundColor: '#1565C0', // focus:bg-sky-700 in Tailwind
    },
    disabledPressable: {
        backgroundColor: '#BBDEFB', // disabled:bg-blue-200 in Tailwind
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
