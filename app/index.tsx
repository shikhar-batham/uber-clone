import { Redirect } from 'expo-router';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function Index() {
  const { isLoaded, isSignedIn } = useUser();

  // Show loading indicator while Clerk is initializing
  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <SignedIn>
        <Redirect href="/(root)/home" />
      </SignedIn>
      <SignedOut>
        <Redirect href="/(auth)/welcome" />
      </SignedOut>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});