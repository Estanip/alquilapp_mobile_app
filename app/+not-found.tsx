import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { routes } from '@/constants/routes.constants';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        color: '#2e78b7',
        fontSize: 14,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View style={styles.container}>
                <Text style={styles.title}>This screen does not exist.</Text>

                <Link href={routes.LOGIN} style={styles.link}>
                    <Text style={styles.linkText}>Go to home screen!</Text>
                </Link>
            </View>
        </>
    );
}