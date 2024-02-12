import { routes } from '@/constants/routes.constants';
import { useSession } from '@/store/context/react.ctx';
import { Redirect } from 'expo-router';
import React from 'react';

export default function Login(): React.JSX.Element {
    const { session } = useSession();
    console.log('sss', session);

    return !session ? <Redirect href={routes.LOGIN} /> : <Redirect href={routes.HOME} />;
}
