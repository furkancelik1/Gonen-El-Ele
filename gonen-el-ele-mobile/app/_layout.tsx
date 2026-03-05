
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListingsProvider, ListingsContext } from '../context/ListingsContext';
import * as SplashScreen from 'expo-splash-screen';
import React, { useContext, useEffect, useState } from 'react';

// SplashScreen'i hemen gizlemeyi engelle
SplashScreen.preventAutoHideAsync();


function SplashLayout({ children }) {
    const { listings, loading } = useContext(ListingsContext);
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        let timeout;
        if (!loading && listings && listings.length > 0) {
            timeout = setTimeout(() => {
                setAppReady(true);
                SplashScreen.hideAsync();
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [loading, listings]);

    if (!appReady) {
        // SplashScreen.hideAsync çağrılana kadar children'ı render etme
        return null;
    }
    return children;
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
