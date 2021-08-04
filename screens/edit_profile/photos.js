import React from "react";
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export const Photos = () => {

  return (
    <View>
      <Text>Photos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold'
  },
  value: {
    flex: 1
  }
});
