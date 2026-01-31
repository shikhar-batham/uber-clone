import {Stack} from "expo-router";

const TabLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="/(root)/(tabs)/home" options={{headerShown: false}}/>
        </Stack>
    )
}

export default TabLayout;