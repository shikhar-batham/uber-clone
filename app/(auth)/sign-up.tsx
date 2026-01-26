import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import InputField from "@/components/InputField";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {Link} from "expo-router";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import OAuth from "@/components/OAuth";


const SignUp = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onSignUpPress = async () => {

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
        color:"#9e9c9c"
    },
    text_log_in:{
        color:"#1a73e8"
    },
    button: {
        backgroundColor: "#2596be",
        width: '100%',
        borderRadius: 30,
    }
})

export default SignUp;