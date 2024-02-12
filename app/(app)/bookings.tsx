import { routes } from '@/constants/routes.constants';
import HomeScreen from '@/screens/home.screen';
import { useSession } from '@/store/context/react.ctx';
import { Redirect } from 'expo-router';
import React from 'react';

export default function Bookings(): React.JSX.Element {
    const { session } = useSession();
    return !session ? <Redirect href={routes.LOGIN} /> : <HomeScreen></HomeScreen>;
}
