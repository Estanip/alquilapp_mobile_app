import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout(): React.JSX.Element {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="login"
                    options={{
                        headerShown: true,
                        title: 'Logueo',
                    }}
                />
                <Stack.Screen
                    name="register"
                    options={{
                        headerShown: true,
                        title: 'Registro',
                    }}
                />
            </Stack>
        </>
    );
}
