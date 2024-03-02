import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ToastManager from 'toastify-react-native';

import Book from './(app)/book';
import Bookings from './(app)/bookings';
import Home from './(app)/home';

import LoginScreen from '@/screens/login.screen';
import RegisterScreen from '@/screens/register.screen';
import { SessionProvider } from '@/store/react.ctx';

export default function Root() {
    const Stack = createNativeStackNavigator();

    return (
        <SessionProvider>
            <ToastManager
                width={400}
                duration={5000}
                textStyle={{ color: 'grey', padding: 10, fontSize: 18 }}
                style={{ margin: 0, padding: 0 }}
            />
            <Stack.Navigator
                initialRouteName="(app)/home"
                screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: '#3498db' },
                }}
            >
                <Stack.Screen
                    name="(app)/home"
                    component={Home}
                    options={{
                        title: 'Home',
                    }}
                />
                <Stack.Screen
                    name="(app)/bookings"
                    component={Bookings}
                    options={{
                        title: 'Mis Turnos',
                    }}
                />
                <Stack.Screen
                    name="(app)/book"
                    component={Book}
                    options={{
                        title: 'Reservar',
                    }}
                />
                <Stack.Screen
                    name="(auth)/login"
                    component={LoginScreen}
                    options={{
                        title: 'Ingreso',
                    }}
                />
                <Stack.Screen
                    name="(auth)/register"
                    component={RegisterScreen}
                    options={{
                        title: 'Registro',
                    }}
                />
            </Stack.Navigator>
        </SessionProvider>
    );
}
