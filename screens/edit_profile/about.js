import React, {useContext} from "react";
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import ProfileContext from "./profile_context";

export const About = () => {
  const profile = useContext(ProfileContext);

  return (
    <View style={styles.container}>
      <Text>About</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },


});
