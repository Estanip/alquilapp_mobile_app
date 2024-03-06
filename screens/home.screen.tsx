import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { homeStyles } from './styles';

import SharedButton from '@/components/modules/shared/button.component';
import { SectionsTitles } from '@/constants';
import { routes } from '@/constants/routes.constants';
import { useSession } from '@/store/react.ctx';

export default function HomeScreen(): React.JSX.Element {
    // Session
    const { token, signOut } = useSession();
    useEffect(() => {
        if (!token) router.replace(routes.LOGIN);
    }, []);
    return (
        <View style={homeStyles.view}>
            <View style={homeStyles.viewButtons}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <SharedButton
                        _buttonText={SectionsTitles.BOOKINGS}
                        _onClick={() => router.navigate({ pathname: routes.BOOKINGS })}
                    />
                    <SharedButton
                        _buttonText={SectionsTitles.BOOK}
                        _onClick={() => router.navigate({ pathname: routes.BOOK })}
                    />
                    <SharedButton
                        _btnStyle={{ marginTop: 50 }}
                        _buttonText={SectionsTitles.LOGOUT}
                        _onClick={() => signOut()}
                    />
                </View>
            </View>
        </View>
    );
}
