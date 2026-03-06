import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListingsProvider, useListings } from '../context/ListingsContext';
import * as SplashScreen from 'expo-splash-screen';
import React, { PropsWithChildren, useEffect, useState } from 'react';

// SplashScreen'i hemen gizlemeyi engelle
void SplashScreen.preventAutoHideAsync().catch(() => {});

function SplashLayout({ children }: PropsWithChildren) {
    const { isLoading: loading } = useListings();
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        if (!loading) {
            timeoutId = setTimeout(() => {
                setAppReady(true);
                void SplashScreen.hideAsync().catch(() => {});
            }, 500);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [loading]);

    if (!appReady) {
        return null;
    }

    return <>{children}</>;
}

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ListingsProvider>
                <SplashLayout>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="detail/[id]" options={{ presentation: 'modal', headerShown: false }} />
                    </Stack>
                    <StatusBar style="auto" />
                </SplashLayout>
            </ListingsProvider>
        </SafeAreaProvider>
    );
}