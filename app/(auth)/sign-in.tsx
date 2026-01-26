import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import InputField from "@/components/InputField";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {Link, useRouter} from "expo-router";
import {moderateScale, scale, verticalScale} from "react-native-size-matters";
import OAuth from "@/components/OAuth";
import { useSignIn } from '@clerk/clerk-expo'
import * as React from 'react'
import type { EmailCodeFactor } from '@clerk/types'

const SignIn = () => {

    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter()
    const [showEmailCode, setShowEmailCode] = React.useState(false)
    const [code, setCode] = React.useState('')

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    // Handle the submission of the sign-in form
    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({
                    session: signInAttempt.createdSessionId,
                    navigate: async ({ session }) => {
                        if (session?.currentTask) {
                            // Check for tasks and navigate to custom UI to help users resolve them
                            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                            console.log(session?.currentTask)
                            return
                        }

                        router.replace('/')
                    },
                })
            } else if (signInAttempt.status === 'needs_second_factor') {
                // Check if email_code is a valid second factor
                // This is required when Client Trust is enabled and the user
                // is signing in from a new device.
                // See https://clerk.com/docs/guides/secure/client-trust
                const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
                    (factor): factor is EmailCodeFactor => factor.strategy === 'email_code',
                )

                if (emailCodeFactor) {
                    await signIn.prepareSecondFactor({
                        strategy: 'email_code',
                        emailAddressId: emailCodeFactor.emailAddressId,
                    })
                    setShowEmailCode(true)
                }
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, signIn, setActive, router, form.email, form.password])

    // Handle the submission of the email verification code
    const onVerifyPress = React.useCallback(async () => {
        if (!isLoaded) return

        try {
            const signInAttempt = await signIn.attemptSecondFactor({
                strategy: 'email_code',
                code,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({
                    session: signInAttempt.createdSessionId,
                    navigate: async ({ session }) => {
                        if (session?.currentTask) {
                            // Check for tasks and navigate to custom UI to help users resolve them
                            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                            console.log(session?.currentTask)
                            return
                        }

                        router.replace('/')
                    },
                })
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, signIn, setActive, router, code])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.parentContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/carousal-4.avif')}
                    />
                    <Text style={styles.text_create_account}>Welcome</Text>
                </View>
                <View>
                    <InputField
                        label="Email"
                        placeholder="Enter your email"
                        // icon={require('../../assets/images/sign-up-car.jpg')}
                        value={form.email}
                        onChangeText={(value: string) => setForm({...form, email: value})}
                    />
                    <InputField
                        label="Password"
                        placeholder="Enter your password"
                        // icon={require('../../assets/images/sign-up-car.jpg')}
                        value={form.password}
                        secureTextEntry={true}
                        onChangeText={(value: string) => setForm({...form, password: value})}
                    />

                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title="Sign In"
                            onPress={onSignInPress}
                            style={styles.button}
                        />
                    </View>

                    <OAuth/>

                    <View style={styles.linkContainer}>
                        <Link href="/sign-up" style={styles.text_link}>
                            <Text>Don&#39;t have an account? {" "} <Text style={styles.text_log_in}>Sign Up</Text></Text>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    parentContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 10,
    },

    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: verticalScale(15),
    },

    linkContainer: {
        alignItems: 'center',
    },

    imageContainer: {
        position: "relative",
        width: "100%",
        height: 200,
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    text_create_account: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        position: "absolute",
        bottom: 0,
        marginLeft: 10,
    },
    text_link: {
        marginTop: verticalScale(10),
        fontSize: 15,
        textAlign: "center",
        color: "#9e9c9c"
    },
    text_log_in: {
        color: "#1a73e8"
    },
    button: {
        backgroundColor: "#2596be",
        width: '100%',
        borderRadius: 30,
    }
})

export default SignIn;