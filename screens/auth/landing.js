import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Button} from "react-native-paper";
import Logo from "../../components/img/Logo";
import {SafeAreaView} from "react-native-safe-area-context";

const image = require('../../assets/img/landing.jpg');

export default function Landing({navigation}) {
    return (
            <SafeAreaView style={{flex: 1}}>
                <ImageBackground source={image} resizeMode="cover" style={styles.bg}>
                    <View style={styles.logo}>
                        <Logo/>
                    </View>
                    <View style={styles.container}>
                        <Button
                            style={{marginBottom: 20}}
                            mode="contained"
                            onPress={() => navigation.navigate('LogIn')}
                        >
                            Log in
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            Sign up
                        </Button>
                    </View>
                </ImageBackground>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    logo: {
        alignItems: 'center',
        marginTop: 40
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20
    }
});
