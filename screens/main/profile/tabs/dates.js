import React, {useContext} from "react";
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {LocalisationContext} from "../../../../localisation/context";
import {useNavigation} from "@react-navigation/native";

export const Dates = ({profileIsLoaded}) => {
  const navigation = useNavigation();

  const {
    noDatesTitle,
    noDatesText,
    noDatesBtnText
  } = useContext(LocalisationContext);

  if (!profileIsLoaded) {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item width={'100%'} height={100} borderRadius={4}/>
      </SkeletonPlaceholder>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.item]}>{noDatesTitle}</Text>
      <Text style={styles.item}>{noDatesText}</Text>
      <Button mode={'contained'} onPress={() => navigation.navigate('Search')}>{noDatesBtnText}</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  item: {
    marginBottom: 10,
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bold'
  }
});
