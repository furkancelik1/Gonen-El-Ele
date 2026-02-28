import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListingsProvider } from '../context/ListingsContext';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ListingsProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="detail/[id]" options={{ presentation: 'modal', headerShown: false }} />
                </Stack>
                <StatusBar style="auto" />
            </ListingsProvider>
        </SafeAreaProvider>
    );
}
