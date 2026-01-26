import {View, StyleSheet, Text} from "react-native";
import CustomButton from "@/components/CustomButton";
import {Image} from "expo-image";

const OAuth = () => (
    <View>
        <View style={styles.container}>
            <View style={styles.parent}/>
            <Text>Or</Text>
            <View style={styles.parent}/>
        </View>
        <CustomButton
            title="Log in with Google"
            onPress={() => {
            }}
        />
    </View>
)

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 4,
        gap: 3
    },
    parent: {
        display: "flex",
        flex: 1,
        height: 1,
        backgroundColor: "rgba(175,173,173,0.61)"
    }
});

export default OAuth;