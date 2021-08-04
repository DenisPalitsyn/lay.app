import React, {useContext} from "react";
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {LocalisationContext} from "../../../../localisation/context";
import { useNavigation } from '@react-navigation/native';

export const Promos = ({profileIsLoaded}) => {
  const navigation = useNavigation();
  const {
    noPromoTitle,
    noPromoText,
    noPromoBtnText
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
      <Text style={[styles.title, styles.item]}>{noPromoTitle}</Text>
      <Text style={styles.item}>{noPromoText}</Text>
      <Button mode={'contained'} onPress={() => navigation.navigate('AddPromo')}>{noPromoBtnText}</Button>
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
