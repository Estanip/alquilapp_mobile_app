import { StyleSheet } from 'react-native';

export const viewStyles = StyleSheet.create({
    login: {
        paddingVertical: 60,
        paddingHorizontal: 24,
        backgroundColor: '#f0f8ff',
    },
    register: {
        paddingVertical: 35,
        paddingHorizontal: 24,
        backgroundColor: '#f0f8ff',
    },
    home: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f8ff',
        padding: 12, // Assuming 'p-3' padding from Tailwind CSS
    },
    homeBtns: {
        paddingHorizontal: 8, // Equivalent to px-8
        marginTop: 5, // Equivalent to my-5 (margin top)
        marginBottom: 5, // Equivalent to my-5 (margin bottom)
        width: '100%', // Equivalent to w-full
        maxWidth: 320, // Equivalent to max-w-sm
    },
    form: {
        width: '100%',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export const scrollView = StyleSheet.create({
    form: {
        width: '100%',
    },
});
