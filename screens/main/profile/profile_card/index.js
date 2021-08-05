import React, {useContext, useState} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {Button, Text, Menu, Divider} from "react-native-paper";
import {getAgeValue} from "../../../../utils/profile";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {LocalisationContext} from "../../../../localisation/context";
import {logout} from "../../../../store/actions/authActions";
import {useDispatch} from "react-redux";
import {RootNavigationContext} from "../../../../utils/context";

export const ProfileCard = ({profileIsLoaded, userProfile, isUser, navigation}) => {
  const {profileOptions} = useContext(LocalisationContext);
  const {rootNavigation} = useContext(RootNavigationContext);

  const dispatch = useDispatch();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const {
    displayName,
    dateOfBirth,
    city,
    country,
    helloMessage,
    role
  } = userProfile;
  const deletedUser = role === 'deleted';

  const settingsHandler = () => {
    setMenuIsOpen(false);
    navigation.navigate('Settings');
  }

  const logoutHandler = () => dispatch(logout());

  const editProfileHandler = () => rootNavigation.navigate('EditProfile');

  const addPromoHandler = () => navigation.navigate('AddPromo');

  const Dots = ({onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.dots}>
        <View style={styles.dot}/>
        <View style={styles.dot}/>
        <View style={[styles.dot, styles.mb0]}/>
      </TouchableOpacity>
    )
  }

  const renderContent = () => {
    if (!profileIsLoaded) {
      return (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width={'100%'} height={100} borderRadius={4}/>
        </SkeletonPlaceholder>
      )
    }
    return (
      <View>
        <View style={[styles.item, styles.row]}>
          {!deletedUser ?
            <Text style={styles.title}>{displayName}, {getAgeValue(dateOfBirth)}</Text> :
            <Text style={styles.title}>DELETED</Text>
          }
          {isUser &&
          <Menu
            visible={menuIsOpen}
            onDismiss={() => setMenuIsOpen(false)}
            anchor={<Dots onPress={() => setMenuIsOpen(true)}/>}
          >
            <Menu.Item onPress={settingsHandler} title={profileOptions[3]}/>
            <Divider/>
            <Menu.Item onPress={logoutHandler} title={profileOptions[2]}/>
          </Menu>
          }
        </View>
        <Text style={styles.item}>{city}, {country}</Text>
        <Text style={styles.item}>{helloMessage}</Text>
        {isUser &&
        <>
          <Button style={styles.item} mode={'outlined'} onPress={editProfileHandler}>
            {profileOptions[1]}
          </Button>
          <Button style={styles.item} mode={'contained'} onPress={addPromoHandler}>
            {profileOptions[0]}
          </Button>
        </>
        }
      </View>
    )
  }

  return (
    <View>
      <View style={styles.head}/>
      <View style={styles.container}>
        {renderContent()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#F3F6F8',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    top: -10,
    width: '100%',
    height: 10
  },
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#F3F6F8'
  },
  item: {
    marginBottom: 8
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dots: {
    paddingHorizontal: 20
  },
  dot: {
    width: 4,
    height: 4,
    marginBottom: 2,
    backgroundColor: '#000',
    borderRadius: 4
  },
  mb0: {
    marginBottom: 0
  },
});
