import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
    title, 
    onPress, 
    style, 
    textStyle 
}) => {
    return (
        <TouchableOpacity
            style={[styles.button_container, style]}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <Text style={[styles.button_text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button_container: {
        backgroundColor: "#070707",
        borderRadius: moderateScale(30),
        marginHorizontal: verticalScale(10),
        paddingVertical: verticalScale(15),
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        alignSelf: 'center',
    },
    button_text: {
        fontSize: moderateScale(15),
        color: "#ffffff",
        textAlign: 'center',
    },
});

export default CustomButton;
