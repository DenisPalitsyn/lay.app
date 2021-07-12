import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";

export default function Search() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                <Text>
                    Search
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
