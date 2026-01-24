import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CustomButton = ({ title, onPress, style }: any) => {
    return (
        <TouchableOpacity
            style={[styles.button_container, style]} //Run time style will overwrite the static style
            activeOpacity={0.8}
            onPress={onPress}
        >
            <Text style={styles.button_text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button_container: {
        backgroundColor: "#070707",
        width: "100%",
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(10),
        borderRadius: moderateScale(5),
        alignItems: "center",
    },

    button_text: {
        fontSize: moderateScale(15),
        color: "#ffffff",
    },
});

export default CustomButton;
