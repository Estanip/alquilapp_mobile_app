import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import LoginScreen from './screens/modules/login.screen';
export default function Root() {
    return (
        <>
            <View style={{ flex: 1 }}>
                <Stack.Screen options={{ headerShown: true, title: 'Alquilapp' }}></Stack.Screen>
                <LoginScreen></LoginScreen>
            </View>
        </>
    );
}
