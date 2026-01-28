import {View, StyleSheet, Text, Alert} from "react-native";
import CustomButton from "@/components/CustomButton";
import {useOAuth} from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import {useRouter} from 'expo-router';
import {useCallback} from 'react';

// Required for OAuth in Expo
WebBrowser.maybeCompleteAuthSession();

const OAuth = () => {
    const router = useRouter();
    const {startOAuthFlow} = useOAuth({strategy: 'oauth_google'});

    const onGooglePress = useCallback(async () => {
        try {
            const {createdSessionId, setActive}: any = await startOAuthFlow();

            if (createdSessionId) {
                await setActive({session: createdSessionId});
                router.replace('/(root)/(tabs)/home');
            }
        } catch (err) {
            console.error('OAuth error', err);
            if (err instanceof Error) {
                if (err.message !== 'User cancelled OAuth flow') {
                    Alert.alert('Error', 'Failed to sign in with Google');
                }
            }
        }
    }, [startOAuthFlow, router]);

    return (
        <View style={styles.container}>
            <Text style={styles.orText}>Or</Text>
            <CustomButton
                title="Continue with Google"
                onPress={onGooglePress}
                style={styles.googleButton}
                textStyle={styles.googleButtonText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 0,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#e1e1e1',
        marginVertical: 20,
    },
    orText: {
        textAlign: 'center',
        marginVertical: 10,
        color: '#666',
        backgroundColor: 'white',
        alignSelf: 'center',
        paddingHorizontal: 10,
    },
    googleButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'rgba(163,163,163,0.82)',
        borderRadius: 10,
        padding: 12,
    },
    googleButtonText: {
        color: '#333',
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default OAuth;