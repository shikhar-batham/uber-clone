import {Stack, Tabs} from "expo-router";
import {ImageSourcePropType, View} from "react-native";
import {Image} from "expo-image";
import Ionicons from '@expo/vector-icons/Ionicons';


const TabIcon = ({ name, focused }: { name: string, focused: boolean }) => (
    <View style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: focused ? "#38ccc7" : "transparent",
        justifyContent: "center",
        alignItems: "center",
        top: -20,
        borderWidth: 2,
        borderColor: focused ? "#38ccc7" : "transparent"
    }}>
        <Ionicons 
            name={name as any} 
            size={24} 
            color={focused ? "white" : "#888888"}
        />
    </View>
)

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#f3f3f3",
                tabBarInactiveTintColor: "white",
                tabBarShowLabel: true,
                tabBarStyle: {
                    marginHorizontal:10,
                    backgroundColor: "#333333",
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 70,
                    paddingBottom: 0,
                    paddingTop: 10,
                    position: 'absolute',
                    left: 20,
                    right: 20,
                    bottom: 20,
                    borderRadius: 35,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                },
                tabBarItemStyle: {
                    height: 60,
                    padding: 0,
                    margin: 0,
                },
                tabBarIconStyle: {
                    marginTop: 10,
                },
                // headerShown: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} name="home-outline" />
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} name="chatbubble-ellipses-outline" />
                }}
            />

            <Tabs.Screen
                name="rides"
                options={{
                    title: "Rides",
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} name="car-sport-outline" />
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} name="person-outline" />
                }}
            />
        </Tabs>
    )
}

export default TabsLayout;