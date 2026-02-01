import {Stack, Tabs} from "expo-router";
import {ImageSourcePropType, View} from "react-native";
import {Image} from "expo-image";


const TabIcon = ({source, focused}: { source: ImageSourcePropType, focused: boolean }) => (

    <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: focused ? "#c83131" : "",
        borderRadius: 50
    }}>
        <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: focused ? "#38ccc7" : ""
        }}>
            <Image source={source} tintColor="white" contentFit="contain" style={{width: 7, height: 7}}/>
        </View>
    </View>
)

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#333333",
                    borderRadius: 100,
                    paddingBottom: 0,
                    overflow: "hidden",
                    marginHorizontal: 20,
                    marginBottom: 20,
                    height: 60,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    position: "absolute"
                }
                // headerShown: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({focused}) => <TabIcon focused={focused}
                                                        source={require('../../../assets/images/done.avif')}/>
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    tabBarIcon: ({focused}) => <TabIcon focused={focused}
                                                        source={require('../../../assets/images/done.avif')}/>
                }}
            />

            <Tabs.Screen
                name="rides"
                options={{
                    title: "Rides",
                    tabBarIcon: ({focused}) => <TabIcon focused={focused}
                                                        source={require('../../../assets/images/done.avif')}/>
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({focused}) => <TabIcon focused={focused}
                                                        source={require('../../../assets/images/done.avif')}/>
                }}
            />
        </Tabs>
    )
}

export default TabsLayout;