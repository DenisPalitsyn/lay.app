import React from 'react';
// import {StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationContainer from "@react-navigation/native/src/NavigationContainer";
import Profile from "./profile";
import Search from "./search";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function Main() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Profile') {
                            iconName = focused
                                ? 'person'
                                : 'person-outline';
                        } else if (route.name === 'Search') {
                            iconName = focused ? 'search' : 'search-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="Search" component={Search} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

// const styles = StyleSheet.create({
//     bg: {
//         flex: 1,
//     },
//     logo: {
//         alignItems: 'center',
//         marginTop: 40
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         paddingHorizontal: 20
//     }
// });
