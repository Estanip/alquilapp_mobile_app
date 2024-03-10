import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ToastManager from 'toastify-react-native';

import Book from './(app)/book';
import Bookings from './(app)/bookings';
import Home from './(app)/home';

import { SectionsTitles } from '@/constants';
import { routesName } from '@/constants/routes.constants';
import { IRoute } from '@/interfaces';
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
                initialRouteName={routesName.HOME}
                screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: '#3498db' },
                }}
            >
                <Stack.Screen
                    name={routesName.HOME}
                    component={Home}
                    options={{
                        title: SectionsTitles.HOME,
                    }}
                />
                <Stack.Screen
                    name={routesName.BOOKINGS}
                    component={Bookings}
                    options={{
                        title: SectionsTitles.BOOKINGS,
                    }}
                />
                <Stack.Screen
                    name={routesName.BOOK}
                    component={Book}
                    options={({ route }: { route: IRoute }) => ({
                        title: route.params?._id ? SectionsTitles.EDIT_BOOK : SectionsTitles.BOOK,
                    })}
                />
                <Stack.Screen
                    name={routesName.LOGIN}
                    component={LoginScreen}
                    options={({ route }: { route: IRoute }) => ({
                        title:
                            route.params?._password_reset === '1'
                                ? SectionsTitles.PASSWORD_RESET
                                : SectionsTitles.LOGIN,
                    })}
                />
                <Stack.Screen
                    name={routesName.REGISTER}
                    component={RegisterScreen}
                    options={{
                        title: SectionsTitles.REGISTER,
                    }}
                />
            </Stack.Navigator>
        </SessionProvider>
    );
}
