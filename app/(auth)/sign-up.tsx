import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import InputField from "@/components/InputField";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {Link, useRouter} from "expo-router";
import {moderateScale, scale, verticalScale} from "react-native-size-matters";
import OAuth from "@/components/OAuth";
import {useSignUp} from '@clerk/clerk-expo'

const SignUp = () => {
    const {isLoaded, signUp, setActive} = useSignUp()
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState('')
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({strategy: 'email_code'})

            // Set 'pendingVerification' to true to display second form
            // and capture code
            setPendingVerification(true)
        } catch (err) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({
                    session: signUpAttempt.createdSessionId,
                    navigate: async ({session}) => {
                        if (session?.currentTask) {
                            // Check for tasks and navigate to custom UI to help users resolve them
                            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                            console.log(session?.currentTask)
                            return
                        }

                        router.replace('/(root)/home')
                    },
                })
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.parentContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/anim-sign-up-car.jpg')}
                    />
                    <Text style={styles.text_create_account}>Create Your Account</Text>
                </View>
                <View>
                    <InputField
                        label="Name"
                        placeholder="Enter your name"
                        // icon={require('../../assets/images/sign-up-car.jpg')}
                        value={form.name}
                        onChangeText={(value: string) => setForm({...form, name: value})}
                    />
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
                            title="Sign Up"
                            onPress={onSignUpPress}
                            style={styles.button}
                        />
                    </View>

                    <OAuth/>

                    <View style={styles.linkContainer}>
                        <Link href="/sign-in" style={styles.text_link}>
                            <Text>Already have an account? {" "} <Text style={styles.text_log_in}>Log In</Text></Text>
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

export default SignUp;