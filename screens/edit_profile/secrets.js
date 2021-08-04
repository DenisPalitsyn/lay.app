import React from "react";
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export const Secrets = () => {

  return (
    <View>
      <Text>Secrets</Text>
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
