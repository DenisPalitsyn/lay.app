import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationContainer from "@react-navigation/native/src/NavigationContainer";
import Profile from "./profile";
import Settings from "./profile/settings";
import AddPromo from "./profile/add_promo";
import Ionicons from "react-native-vector-icons/Ionicons";
import {createStackNavigator} from "@react-navigation/stack";
import {useTheme, Button} from "react-native-paper";
import Search from "./search";
import Chats from "./chats";
import Promotions from "./promotions";
import firebase from "firebase";
import UserContext from './user_context';
import RootNavigationContext from "./root_navigation_context";

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({route, navigation}) => {
  const profileId = firebase.auth().currentUser.uid;
  const profileUid = route.params ? route.params.userId : profileId;
  const isUser = profileUid === profileId;

  return (
    <UserContext.Provider value={{profileUid, isUser}}>
      <ProfileStack.Navigator>
        <ProfileStack.Screen name={'Profile'} component={Profile} options={{headerShown: false}}/>
        <ProfileStack.Screen name={'Settings'} component={Settings}/>
        <ProfileStack.Screen name={'AddPromo'} component={AddPromo} options={{headerTitle: 'Add a promo'}}/>
      </ProfileStack.Navigator>
    </UserContext.Provider>
  )
}

const Tab = createBottomTabNavigator();

export default function Main({navigation: rootNavigation}) {
  const theme = useTheme();
  const userId = firebase.auth().currentUser.uid;

  return (
    <RootNavigationContext.Provider value={{rootNavigation}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Profile') {
                iconName = focused && (!route.params || route.params.userId === userId) ? 'person' : 'person-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Chats') {
                iconName = focused ? 'chatbox' : 'chatbox-outline';
              } else if (route.name === 'Promotions') {
                iconName = focused ? 'heart' : 'heart-outline';
              }
              return <Ionicons name={iconName} size={size} color={color}/>;
            },
          })}
          tabBarOptions={{
            activeTintColor: theme.colors.primary,
            inactiveTintColor: theme.colors.backdrop,
            showLabel: false
          }}
        >
          <Tab.Screen name="Profile" component={ProfileStackScreen} listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('Profile', {userId})
            }
          })}/>
          <Tab.Screen name="Search" component={Search}/>
          <Tab.Screen name="Chats" component={Chats}/>
          <Tab.Screen name="Promotions" component={Promotions}/>
        </Tab.Navigator>
      </NavigationContainer>
    </RootNavigationContext.Provider>
  )
}
