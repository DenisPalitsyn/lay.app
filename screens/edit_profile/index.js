import React, {useContext, useState} from "react";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {LocalisationContext} from "../../localisation/context";
import {Main} from "./main";
import {About} from "./about";
import {Secrets} from "./secrets";
import {Photos} from "./photos";
import {useTheme, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ProfileContext from "./profile_context";
import {useSelector} from "react-redux";
import firebase from "firebase/app";

export default function EditProfile() {
  const {
    personalInformation,
    tabsTitles,
    backToProfile
  } = useContext(LocalisationContext);

  const theme = useTheme();

  const {uid} = firebase.auth().currentUser;
  const profile = useSelector(s => {
    const {profile} = s;
    return profile.data[uid];
  })

  const [index, setIndex] = useState(0);

  const routes = [
    {key: 'main', title: tabsTitles[0]},
    {key: 'about', title: tabsTitles[1]},
    {key: 'secrets', title: tabsTitles[2]},
    {key: 'photos', title: tabsTitles[3]}
  ];

  const renderScene = SceneMap({
    main: Main,
    about: About,
    secrets: Secrets,
    photos: Photos
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      contentContainerStyle={{backgroundColor: theme.colors.primary}}
      labelStyle={{fontSize: 12}}
      style={{color: theme.colors.surface}}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ProfileContext.Provider value={profile}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{personalInformation}</Text>
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{width: '100%'}}
          sceneContainerStyle={styles.container}
        />
      </ProfileContext.Provider>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleWrap: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20
  },
  title: {
    fontSize: 20
  }
});

