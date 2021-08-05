import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "react-native-paper";

export const Alert = ({style, children}) => {
  const theme = useTheme();

  return (
    <View style={{
      ...style,
      ...styles.container,
      borderColor: theme.colors.primary
    }}>
      <Ionicons name='alert-circle-outline' size={24} color={theme.colors.primary}/>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    marginLeft: 10
  }
});
