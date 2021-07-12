import React, {useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/storage';

import {firebaseConfig} from "./constants/firebaseConfig";
import LayApp from "./LayApp";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./store/reducers/rootReducer";
import {Provider} from "react-redux";
import {Provider as PaperProvider} from "react-native-paper";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {theme} from "./constants/theme";
import {initialState} from "./constants/initialState";
import {localisation} from "./localisation/localisation";
import thunk from "redux-thunk";
import {LocalisationContext} from './localisation/context';
import { LogBox } from 'react-native';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
    firebase.storage();
    firebase.functions();
}

export default function App() {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    const {firebase, app} = store.getState();
    const lang = firebase.profile.lang || app.lang;
    const actualLocal = localisation[lang]

    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer for a long period of time']);
    }, []);

    return (
        <Provider store={store}>
            <LocalisationContext.Provider value={actualLocal}>
                <SafeAreaProvider>
                    <PaperProvider theme={theme}>
                        <LayApp/>
                    </PaperProvider>
                </SafeAreaProvider>
                <StatusBar style="auto"/>
            </LocalisationContext.Provider>
        </Provider>
    );
}

