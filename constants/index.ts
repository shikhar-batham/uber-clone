// Using require for image imports as it's more reliable in React Native
const images = {
    onboarding1: require('../assets/images/android-icon-background.png'),
    onboarding2: require('../assets/images/icon.png'),
    onboarding3: require('../assets/images/android-icon-background.png'),
};

export const onboarding = [
    {
        id: 1,
        title: "Welcome to Uber",
        description: "Find your perfect ride with ease and comfort.",
        image: images.onboarding1
    },
    {
        id: 2,
        title: "The perfect ride is just a tap away!",
        description: "Book your ride with ease and comfort.",
        image: images.onboarding2
    },
    {
        id: 3,
        title: "Ride easy with Uber",
        description: "Book your ride with ease and comfort.",
        image: images.onboarding3
    }
];