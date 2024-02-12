import { routes } from '@/constants/routes.constants';
import { useSession } from '@/store/context/react.ctx';
import { Redirect } from 'expo-router';
import React from 'react';

export default function Register(): React.JSX.Element {
    const { session } = useSession();
    return !session ? <Redirect href={routes.LOGIN} /> : <Redirect href={routes.HOME} />;
}
