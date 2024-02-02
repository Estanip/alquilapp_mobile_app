import { Stack } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import React from 'react';
import { Provider } from 'react-redux';
import ToastManager from 'toastify-react-native';
import store from './store';

NativeWindStyleSheet.setOutput({
    default: 'native',
});

export default function HomeLayout(): React.JSX.Element {
    return (
        <Provider store={store}>
            <ToastManager />
            <Stack>
                <Stack.Screen
                    name="screens"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </Provider>
    );
}
