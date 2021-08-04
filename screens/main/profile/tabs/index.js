import React, {useContext, useState} from "react";
import {LocalisationContext} from "../../../../localisation/context";
import {SceneMap, TabView, TabBar} from "react-native-tab-view";
import {About} from "./about";
import {Secrets} from "./secrets";
import {Promos} from "./promos";
import {Dates} from "./dates";
import {useTheme} from "react-native-paper";
import {useSelector} from "react-redux";
import {getProfileTabData} from "../../../../utils/profile";
import {StyleSheet} from "react-native";

export const Tabs = (
  {
    requests,
    offers,
    requestsIsLoaded,
    offersDataIsLoaded,
    profile,
    isUser,
    profileIsLoaded
  }) => {
  const {
    profileTabs,
    lookingForOptions,
    languagesOptions,
    figureOptions,
    ethnicityOptions,
    hairOptions,
    eyesOptions
  } = useContext(LocalisationContext);

  const contextOptions = {
    lookingForOptions,
    languagesOptions,
    figureOptions,
    ethnicityOptions,
    hairOptions,
    eyesOptions
  };

  const lang = useSelector(s => {
    const {profile} = s;
    return profile.data.lang;
  });

  const aboutData = getProfileTabData(profile, 'ABOUT_ME', contextOptions, lang);
  const secretsData = getProfileTabData(profile, 'SECRETS', null, lang);
  const requestsData = requests || [];
  const datesData = offers || [];

  const theme = useTheme();
  const [index, setIndex] = useState(0);

  let routes = [{key: 'about', title: profileTabs[0]}];

  if (isUser) {
    routes = [
      ...routes,
      {key: 'secrets', title: profileTabs[1]},
      {key: 'promos', title: profileTabs[2]},
      {key: 'dates', title: profileTabs[3]}
    ]
  }

  const renderScene = SceneMap({
    about: (props) => <About data={aboutData} profileIsLoaded={profileIsLoaded} {...props}/>,
    secrets: (props) => <Secrets data={secretsData} profileIsLoaded={profileIsLoaded} {...props}/>,
    promos: (props) => <Promos isLoaded={requestsIsLoaded} profileIsLoaded={profileIsLoaded} data={requestsData} {...props}/>,
    dates: (props) => <Dates isLoaded={offersDataIsLoaded} profileIsLoaded={profileIsLoaded} data={datesData} {...props}/>
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: theme.colors.primary}}
      style={{backgroundColor: theme.colors.backdrop}}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{width: '100%'}}
      sceneContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
});
