import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
    TextStyle,
    ViewStyle,
    ImageStyle,
    KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard
} from 'react-native';
import {useState} from 'react';

interface InputFieldProps {
    label: string;
    labelStyle?: TextStyle;
    icon?: any;
    secureTextEntry?: boolean;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    iconStyle?: ImageStyle;
    error?: string;
    className?: string;

    [key: string]: any;
}

const InputField = ({
                        label,
                        labelStyle,
                        icon,
                        secureTextEntry = false,
                        containerStyle,
                        inputStyle,
                        iconStyle,
                        error,
                        ...props
                    }: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, containerStyle]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Text style={[styles.label, labelStyle]}>{label}</Text>
                    <View style={[
                        styles.inputContainer,
                        isFocused && styles.focusedInput,
                        error && styles.errorBorder
                    ]}>
                        {icon && (
                            <View style={styles.iconContainer}>
                                <Image 
                                    source={icon} 
                                    style={[styles.icon, iconStyle]} 
                                    resizeMode="contain"
                                />
                            </View>
                        )}
                        <TextInput
                            style={[styles.input, inputStyle]}
                            secureTextEntry={secureTextEntry}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholderTextColor="#999"
                            {...props}
                        />
                    </View>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
        marginLeft: 10, // Match input container's left margin
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#5a5858',
        borderRadius: 30,
        backgroundColor: 'rgb(255,253,253)',
        height: 48,
        paddingHorizontal: 16,
        marginLeft: 10,
        marginRight: 10
    },
    focusedInput: {
        borderColor: '#000',
        borderWidth: 2
    },
    iconContainer: {
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#666',
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
    },
    errorBorder: {
        borderColor: '#ff3b30',
    },
    errorText: {
        color: '#ff3b30',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
});

export default InputField;