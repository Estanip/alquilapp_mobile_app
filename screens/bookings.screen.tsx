import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { routes } from '@/constants/routes.constants';
import { useSession } from '@/store/react.ctx';

export default function BookingsScreen(): React.JSX.Element {
    const { token } = useSession();
    useEffect(() => {
        if (!token) router.replace(routes.LOGIN);
    }, []);
    return (
        <View>
            <Text>BOOKINGS</Text>
        </View>
    );
}
