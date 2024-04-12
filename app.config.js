export default {
    expo: {
        name: 'alquilapp',
        slug: 'alquilapp',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'myapp',
        userInterfaceStyle: 'automatic',
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
            package: 'estani.alquilapp',
            googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
        },
        assetBundlePatterns: ['**/*'],
        experiments: {
            tsconfigPaths: true,
            typedRoutes: true,
        },
        extra: {
            router: {
                origin: false,
            },
            eas: {
                projectId: '33ab46d9-ec4e-4248-b5aa-f8135bc9fc33',
            },
            env: {
                EXPO_PUBLIC_HOST_DEV: process.env.EXPO_PUBLIC_HOST_DEV,
                EXPO_PUBLIC_ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT,
                GOOGLE_SERVICES_JSON: process.env.GOOGLE_SERVICES_JSON,
            },
        },
        ios: {
            supportsTablet: true,
        },
        plugins: ['expo-font', 'expo-router', 'expo-secure-store', ['expo-notifications']],
        splash: {
            image: './assets/images/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/favicon.png',
        },
    },
};
