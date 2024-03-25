import { Redirect } from 'expo-router';
import React from 'react';

import { routes } from '@/constants/routes.constants';
import BookingsScreen from '@/screens/modules/bookings.screen';
import { useSession } from '@/store/react.ctx';

export default function Bookings(): React.JSX.Element {
    const { token } = useSession();
    return !token ? <Redirect href={routes.LOGIN} /> : <BookingsScreen />;
}
