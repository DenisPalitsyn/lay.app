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
import {useDispatch, useSelector} from "react-redux";
import firebase from "firebase/app";
import {FormProvider, useForm} from "react-hook-form";
import {updateProfile} from "../../store/actions/profileActions";

export default function EditProfile({navigation}) {
  const {
    personalInformation,
    tabsTitles,
    // backToProfile
  } = useContext(LocalisationContext);

  const dispatch = useDispatch();
  const theme = useTheme();

  const {uid} = firebase.auth().currentUser;
  const profile = useSelector(s => {
    const {profile} = s;
    return profile.data[uid];
  })

  const [index, setIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    mode: "all",
    defaultValues: {...profile}
  });

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

  const onSubmit = async v => {
    setSubmitting(true);

    const updateAndGoToProfile = async () => {
      try {
        await dispatch(updateProfile(v));
      } catch (e) {
        console.log('e', e);
      }
      setSubmitting(false);
      navigation.navigate('Main');
    }

    const updateAndGoNext = async (optionalData) => {
      try {
        await dispatch(updateProfile({
          ...v,
          ...optionalData
        }));
      } catch (e) {
        console.log('e', e);
      }
      setSubmitting(false);
      setIndex(prev => prev + 1);
    }

    if (index === 0) {
      if (profile.profileSubmitted) {
        await updateAndGoToProfile();
      } else {
        await updateAndGoNext({profileSubmitted: true});
      }
    } else if (index === routes.length) {
      await updateAndGoToProfile();
    } else {
      if (profile.profileSubmitted) {
        await updateAndGoToProfile();
      } else {
        await updateAndGoNext();
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FormProvider submitting={submitting} onSubmit={onSubmit} {...form}>
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
      </FormProvider>
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

