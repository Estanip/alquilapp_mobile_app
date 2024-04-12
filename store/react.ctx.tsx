import React from 'react';

import { removeItem, useStorageState } from './secure.store';

const AuthContext = React.createContext<{
    signIn: (token: string, user_id: string, is_enabled: boolean, user_email: string) => void;
    signOut: () => void;
    user_id?: string | null;
    token?: string | null;
    is_user_enabled?: string | null;
    user_email: string | null;
    isLoadingToken: boolean;
    isLoadingUserId: boolean;
    isLoadingIsUserEnabled: boolean;
    isLoadingUserEmail: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    user_id: null,
    token: null,
    is_user_enabled: null,
    user_email: null,
    isLoadingToken: false,
    isLoadingUserId: false,
    isLoadingIsUserEnabled: false,
    isLoadingUserEmail: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.EXPO_PUBLIC_ENVIRONMENT !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }
    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoadingToken, token], setToken] = useStorageState('token');
    const [[isLoadingUserId, user_id], setUserId] = useStorageState('userId');
    const [[isLoadingUserEmail, user_email], setUserEmail] = useStorageState('userEmail');
    const [[isLoadingIsUserEnabled, is_user_enabled], setIsUserEnabled] =
        useStorageState('isUserEnabled');

    return (
        <AuthContext.Provider
            value={{
                signIn: (
                    token: string,
                    user_id: string,
                    is_enabled: boolean,
                    user_email: string,
                ) => {
                    setToken(token);
                    setUserId(user_id);
                    setIsUserEnabled(is_enabled === true ? '1' : '0');
                    setUserEmail(user_email);
                },
                signOut: () => {
                    setToken(null);
                    setUserId(null);
                    setIsUserEnabled(null);
                    setUserEmail(null);
                    removeItem('token');
                    removeItem('userId');
                    removeItem('isUserEnabled');
                    removeItem('userEmail');
                },
                token,
                user_id,
                is_user_enabled,
                user_email,
                isLoadingToken,
                isLoadingUserId,
                isLoadingIsUserEnabled,
                isLoadingUserEmail,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
