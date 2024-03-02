import React from 'react';

import { removeItem, useStorageState } from './secure.store';

const AuthContext = React.createContext<{
    signIn: (token: string, user_id: string) => void;
    signOut: () => void;
    user_id?: string | null;
    token?: string | null;
    isLoadingToken: boolean;
    isLoadingUserId: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    user_id: null,
    token: null,
    isLoadingToken: false,
    isLoadingUserId: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }
    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoadingToken, token], setToken] = useStorageState('token');
    const [[isLoadingUserId, user_id], setUserId] = useStorageState('userId');

    return (
        <AuthContext.Provider
            value={{
                signIn: (token: string, user_id: string) => {
                    setToken(token);
                    setUserId(user_id);
                },
                signOut: () => {
                    setToken(null);
                    setUserId(null);
                    removeItem('token');
                    removeItem('userId');
                },
                token,
                user_id,
                isLoadingToken,
                isLoadingUserId,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
