import { Redirect } from 'expo-router';
import React from 'react';

import { routes } from '@/constants/routes.constants';
import BookScreen from '@/screens/book.screen';
import { useSession } from '@/store/react.ctx';

export default function Book(): React.JSX.Element {
    const { token } = useSession();
    return !token ? <Redirect href={routes.LOGIN} /> : <BookScreen />;
}
