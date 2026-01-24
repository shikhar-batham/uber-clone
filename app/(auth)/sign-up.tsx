import {StyleSheet, Text, ScrollView, View, Image} from 'react-native';


const SignUp = () => {
    return (
        <ScrollView style={styles.container}>
           <View style={styles.container}>
            <View>
                {/*<Image source={require('../../assets/images/android-icon-monochrome.png')}/>*/}
            </View>
           </View>
        </ScrollView>
    )
}

const  styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
})

export default SignUp;