import SharedButton from '@/components/modules/shared/button.component';
import { useSession } from '@/store/context/react.ctx';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { viewStyles } from './styles';
import { router } from 'expo-router';
import { routes } from '@/constants/routes.constants';

export default function HomeScreen(): React.JSX.Element {
    const { session, signOut } = useSession();
    useEffect(() => {
        console.log('home', session);

        if (!session) router.replace(routes.LOGIN);
    }, []);
    return (
        <View style={viewStyles.home}>
            <View style={viewStyles.homeBtns}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <SharedButton
                        buttonText="Mis turnos"
                        onClick={() => router.navigate({ pathname: routes.BOOKINGS })}
                    ></SharedButton>
                    <SharedButton
                        buttonText="Reservar cancha"
                        onClick={() => router.navigate({ pathname: routes.BOOK })}
                    ></SharedButton>
                    <SharedButton
                        btnStyle={{ marginTop: 50 }}
                        buttonText="Cerrar sesión"
                        onClick={() => signOut()}
                    ></SharedButton>
                </View>
            </View>
        </View>
    );
}
