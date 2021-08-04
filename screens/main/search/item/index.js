import {StyleSheet, TouchableOpacity} from "react-native";
import {View, Image} from "react-native";
import {Text} from "react-native-paper";
import {getAgeValue} from "../../../../utils/profile";
import React, {useEffect, useState} from "react";
import {getUserPhoto} from "../../../../store/actions/usersActions";
import {useDispatch} from "react-redux";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export const Item = (props) => {
  const {item, goUser} = props;

  const dispatch = useDispatch();

  const [mainPhotoUrl, setMainPhotoUrl] = useState(null);
  const mainPhotoIsLoaded = mainPhotoUrl !== null;

  useEffect(() => {
    let Mounted = true;
    const fetchData = async () => dispatch(getUserPhoto(item.id, 'M'));
    fetchData().then((mainPhotoUrl) => Mounted && setMainPhotoUrl(mainPhotoUrl));
    return () => {
      Mounted = false
    }
  }, []);

  return (
    <TouchableOpacity style={styles.item} onPress={() => goUser(item.id)}>
      <View style={styles.photoWrap}>
        {mainPhotoIsLoaded ?
          <Image
            style={styles.photo}
            source={{uri: mainPhotoUrl}}
          /> :
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item width={'100%'} height={'100%'} borderRadius={4}/>
          </SkeletonPlaceholder>
        }
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.name}>{item.displayName}, {getAgeValue(item.dateOfBirth)}</Text>
        <Text>{item.city}, {item.country}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 24
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  photoWrap: {
    marginRight: 10
  },
  photo: {
    width: 116,
    height: 116,
    resizeMode: 'cover',
    borderRadius: 4
  }
});
