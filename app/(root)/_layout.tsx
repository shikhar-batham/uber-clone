import { Stack, Redirect } from "expo-router";
import { useAuth } from '@clerk/clerk-expo';
import { ActivityIndicator, View } from 'react-native';

const RootLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();

    // Show loading indicator while checking auth state
    if (!isLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // If user is signed in, show the app's main screens
    if (isSignedIn) {
        return (
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        );
    }

    // If user is not signed in, redirect to auth flow
    return <Redirect href="/sign-in" />;
};

export default RootLayout;