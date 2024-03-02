import { Redirect } from 'expo-router';
import React from 'react';

import { routes } from '@/constants/routes.constants';
import HomeScreen from '@/screens/home.screen';
import { useSession } from '@/store/react.ctx';

export default function Home(): React.JSX.Element {
    const { token } = useSession();
    return !token ? <Redirect href={routes.LOGIN} /> : <HomeScreen />;
}
