import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function AuthLayout(): React.JSX.Element {
    return (
        <>
            <Tabs>
                <Tabs.Screen
                    name="login"
                    options={{
                        title: 'Login',
                        headerShown: false,
                        tabBarIcon: () => <Text>🎾</Text>,
                    }}
                />

                <Tabs.Screen
                    name="register"
                    options={{
                        title: 'Register',
                        headerShown: false,
                        tabBarIcon: () => <Text>🎾</Text>,
                    }}
                />
            </Tabs>
        </>
    );
}
