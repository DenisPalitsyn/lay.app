import React from "react";
import {StyleSheet, View, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export const Secrets = ({profileIsLoaded, data}) => {
  if (!profileIsLoaded) {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item width={'100%'} height={100} borderRadius={4}/>
      </SkeletonPlaceholder>
    )
  }

  const renderItem = ({item}) => {
      if (item.value) {
        return (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}: </Text><Text style={styles.value}>{Array.isArray(item.value) ? item.value.join(', ') : item.value}</Text>
          </View>
        );
      }
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, i) => 'secrets' + i}
      />
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
