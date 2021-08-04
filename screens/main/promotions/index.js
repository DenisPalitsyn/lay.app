import React from "react";
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from "react-native-safe-area-context";

export default function Promotions() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Search dates
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
