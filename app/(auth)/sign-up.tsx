import {StyleSheet, Text, ScrollView, View, Image, Alert} from 'react-native';
import InputField from "@/components/InputField";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {Link, useRouter} from "expo-router";
import {moderateScale, scale, verticalScale} from "react-native-size-matters";
import OAuth from "@/components/OAuth";
import {useSignUp} from '@clerk/clerk-expo'
import {ReactNativeModal} from "react-native-modal";

const SignUp = () => {
    const {isLoaded, signUp, setActive} = useSignUp()
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: ""
    });

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
            await signUp.create({emailAddress: form.email, password: form.password})

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({strategy: 'email_code'})

            // Set 'pendingVerification' to true to display second form
            // and capture code
            setVerification({
                ...verification,
                state: "pending",
            })
        } catch (err: any) {
            // for more info on error handling
            Alert.alert('Error', err.errors[0].longMessage)
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {

                //TODO: Create a database user!
                await setActive({
                    session: signUpAttempt.createdSessionId,
                    navigate: async ({session}) => {
                        if (session?.currentTask) {
                            // Check for tasks and navigate to custom UI to help users resolve them
                            console.log(session?.currentTask)
                            return
                        }

                        setVerification({
                            ...verification,
                            state: "success",
                        })
                    },
                })
            } else {
                // If the status is not complete, check why. User may need to
                setVerification({
                    ...verification,
                    state: "failed",
                    error: "Verification failed!",
                })
            }
        } catch (err: any) {
            setVerification({
                ...verification,
                error: err.errors[0].longMessage,
                state: "failed"

            })
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

                    <ReactNativeModal
                        isVisible={verification.state === 'pending'}
                        onModalHide={() => {
                            if (verification.state === 'success') setShowSuccessModal(true)
                        }}
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                        backdropOpacity={0.7}
                        style={styles.modal}
                    >
                        <View style={styles.modalContainer}>
                            <Image
                                style={styles.modal_image}
                                source={require('../../assets/images/verify-email.jpg')}
                            />
                            <Text style={styles.modal_title}>Verify your email!</Text>
                            <Text style={styles.modal_text}>We&#39;ve sent verification email to {form.email}</Text>
                            <InputField label="Code" placeholder="123456" value={verification.code}
                                        keyboardType="numeric"
                                        onChangeText={(value: string) => setVerification({
                                            ...verification,
                                            code: value
                                        })}
                            />
                            {verification.error && <Text style={styles.errorText}>{verification.error}</Text>}
                            <View style={styles.modalButtonContainer}>
                                <CustomButton
                                    title="Verify Email"
                                    onPress={onVerifyPress}
                                    // style={[styles.button, styles.modalButton]}
                                />
                            </View>
                        </View>
                    </ReactNativeModal>

                    <ReactNativeModal
                        isVisible={showSuccessModal}
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                        backdropOpacity={0.7}
                        style={styles.modal}
                    >
                        <View style={styles.modalContainer}>
                            <Image
                                style={styles.modal_image}
                                source={require('../../assets/images/done.avif')}
                            />
                            <Text style={styles.modal_title}>Success!</Text>
                            <Text style={styles.modal_text}>You have successfully signed up!</Text>
                            <View style={styles.modalButtonContainer}>
                                <CustomButton
                                    title="Go to Home"
                                    onPress={() => router.replace('/(root)/(tabs)/home')}
                                    // style={[styles.button, styles.modalButton]}
                                />
                            </View>
                        </View>
                    </ReactNativeModal>
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
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 25,
        width: '85%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modal_image: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    modal_title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2596be',
        marginBottom: 10,
        textAlign: 'center',
    },
    modal_text: {
        fontSize: 16,
        textAlign: 'center',
        color: '#3d3e3d',
        marginBottom: 25,
        lineHeight: 24,
    },
    modalButtonContainer: {
        width: '100%',
        marginTop: 10,
    },
    modalButton: {
        borderRadius: 10,
        paddingVertical: 12,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
})

export default SignUp;