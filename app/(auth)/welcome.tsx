import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Dimensions,
} from "react-native";
import {Image} from "expo-image";
import {router} from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import {useCallback, useRef, useState} from "react";
import type {ICarouselInstance} from "react-native-reanimated-carousel";
import {onboarding} from "@/constants";
import CustomButton from "@/components/CustomButton";
import {moderateScale, scale, verticalScale} from "react-native-size-matters";
import {SafeAreaView} from "react-native-safe-area-context";

const {width} = Dimensions.get("window");

const Onboarding = () => {
    const carouselRef = useRef<ICarouselInstance>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;

    const handleNext = useCallback(() => {
        if (isLastSlide) {
            router.replace("/(auth)/sign-up");
        } else if (carouselRef.current) {
            carouselRef.current.next();
        }
    }, [isLastSlide]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Skip Button */}
            <TouchableOpacity
                onPress={() => router.replace("/(auth)/sign-in")}
                style={styles.skipButton}
            >
                <Text style={styles.text}>Skip</Text>
            </TouchableOpacity>

            {/* Carousel */}
            <Carousel
                ref={carouselRef}
                width={width}
                height={500}
                data={onboarding}
                loop={false}
                onSnapToItem={(index) => setActiveIndex(index)}
                renderItem={({item}) => (
                    <View style={styles.slide}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={item.image}
                                style={styles.image}
                                contentFit="contain"
                            />
                        </View>

                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
            />

            {/* Pagination */}
            <View style={styles.pagination}>
                {onboarding.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === activeIndex && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    onPress={handleNext}
                    title={isLastSlide ? "Get Started" : "Next"}
                    style={styles.button}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    skipButton: {
        width: "100%",
        alignItems: "flex-end",
        padding: 20,
    },

    text: {
        fontSize: 16,
        fontWeight: "500",
        color: "black",
    },

    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    imageContainer: {
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    image: {
        width: "80%",
        height: "100%",
        borderRadius: 30,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#000",
    },

    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        paddingHorizontal: 20,
    },

    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(0,0,0,0.2)",
        marginHorizontal: 4,
    },

    activeDot: {
        width: 20,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#3760c8",
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginBottom: verticalScale(40), // Increased bottom margin for better spacing
        width: '100%',
    },
    button: {
        width: '100%',
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: verticalScale(25),
    },
});


export default Onboarding;
