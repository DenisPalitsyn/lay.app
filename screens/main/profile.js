import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";
import {useDispatch} from "react-redux";
import {logout} from "../../store/actions/authActions";

export default function Profile() {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                <Text onPress={() => {
                    dispatch(logout());
                }}>
                    logout
                </Text>
            </View>
        </SafeAreaView>
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
