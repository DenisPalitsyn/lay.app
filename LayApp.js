import React from 'react';

import Landing from "./screens/auth/landing";
import Login from "./screens/auth/login";
import SignUpScreen from "./screens/auth/sign_up";
import Main from "./screens/main";
import Loading from "./screens/loading/loading";
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppStack = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            headerShown: false
        }
    }
});
const AuthStack = createStackNavigator({
    Landing: {
        screen: Landing,
        navigationOptions: {
            headerShown: false
        }
    },
    LogIn: {
        screen: Login,
        navigationOptions: {
            title: 'Log in'
        }
    },
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
            title: 'Sign up'
        }
    },
});

export default createAppContainer(createSwitchNavigator(
    {
        Loading: Loading,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Loading',
    }
));

