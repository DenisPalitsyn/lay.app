import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {LocalisationContext} from "../../../localisation/context";
import {Tabs} from "./tabs";
import {
  getAuthUserDateRequests,
  getDateOffers,
  getGalleryPhotos,
  getProfileData
} from "../../../store/actions/profileActions";
import {getUserPhoto} from "../../../store/actions/usersActions";
import {profileData} from "../../../constants/profile";
import {MainPhoto} from "./main_photo";
import {ProfileCard} from "./profile_card";
import {UserContext} from "../../../utils/context";

export default function Profile({navigation}) {
  const {} = useContext(LocalisationContext);
  const {profileUid, isUser} = useContext(UserContext);
  const dispatch = useDispatch();

  const users = useSelector(s => {
    const {profile, users} = s;
    return ({
      ...profile.data,
      ...users
    });
  });
  const mainPhotos = useSelector(s => {
    const {users} = s;
    return users.photos;
  });
  const galleryPhotos = useSelector(s => {
    const {profile} = s;
    return profile.photos;
  });

  const initialUser = users[profileUid] || null;
  const initialMainPhoto = mainPhotos[profileUid] ? mainPhotos[profileUid]['l'] : null;
  const initialPhotosGallery = galleryPhotos[profileUid] || null;

  const [user, setUser] = useState(initialUser);
  const [mainPhotoUrl, setMainPhotoUrl] = useState(initialMainPhoto);
  const [photosGallery, setPhotosGallery] = useState(initialPhotosGallery);
  const [requests, setRequests] = useState(null);
  const [offersData, setOffersData] = useState(null);

  const userProfile = initialUser || user || profileData;

  const {
    gender,
    role,
    id: userId
  } = userProfile;

  const deletedUser = role === 'deleted';

  const profileIsCorrect = userId === profileUid;
  const profileIsLoaded = user !== null && profileIsCorrect;
  const mainPhotoIsLoaded = mainPhotoUrl !== null && profileIsCorrect;
  const photosGalleryIsLoaded = photosGallery !== null && profileIsCorrect;
  const requestsIsLoaded = requests !== null && profileIsCorrect;
  const offersDataIsLoaded = offersData !== null && profileIsCorrect;

  useEffect(() => {
    !initialUser && setUser(null);
    !initialMainPhoto && setMainPhotoUrl(null);
    !initialPhotosGallery && setPhotosGallery(null);
    setRequests(null);
    setOffersData(null);
  }, [profileUid]);

  useEffect(() => {
    let Mounted = true;
    if (!initialUser) {
      const fetchData = async () => dispatch(getProfileData(profileUid));
      fetchData().then((user) => Mounted && setUser(user));
    }
    return () => {
      Mounted = false;
    }
  }, [profileUid, initialUser]);

  useEffect(() => {
    let Mounted = true;
    if (profileIsLoaded && !initialMainPhoto) {
      const fetchData = async () => dispatch(getUserPhoto(profileUid, 'L'));
      fetchData().then((mainPhotoUrl) => Mounted && setMainPhotoUrl(mainPhotoUrl));
    }
    return () => {
      Mounted = false;
    }
  }, [profileIsLoaded, profileUid, initialMainPhoto]);

  useEffect(() => {
    let Mounted = true;
    if (profileIsLoaded && initialPhotosGallery && !initialPhotosGallery.length) {
      const fetchData = async () => dispatch(getGalleryPhotos(profileUid, 'L'));
      fetchData().then((photosGallery) => Mounted && setPhotosGallery(photosGallery));
    }
    return () => {
      Mounted = false;
    }
  }, [profileIsLoaded, profileUid, initialPhotosGallery]);

  useEffect(() => {
    let Mounted = true;
    if (profileIsLoaded && isUser && !deletedUser) {
      const fetchData = async () => dispatch(getAuthUserDateRequests(profileUid));
      fetchData().then((requests) => Mounted && setRequests(requests));
    }
    return () => {
      Mounted = false;
    }
  }, [profileIsLoaded, profileUid]);

  useEffect(() => {
    let Mounted = true;
    if (profileIsLoaded && isUser && !deletedUser) {
      const fetchData = async () => dispatch(getDateOffers(profileUid));
      fetchData().then((offersData) => Mounted && setOffersData(offersData));
    }
    return () => {
      Mounted = false;
    }
  }, [profileIsLoaded, profileUid]);

  return (
    <SafeAreaView style={styles.container}>
      <MainPhoto
        mainPhotoIsLoaded={mainPhotoIsLoaded}
        gender={gender}
        mainPhotoUrl={initialMainPhoto || mainPhotoUrl || ''}
      />
      <ProfileCard
        profileIsLoaded={profileIsLoaded}
        userProfile={userProfile}
        isUser={isUser}
        navigation={navigation}
      />
      <Tabs
        requests={requests}
        offers={offersData}
        profileIsLoaded={profileIsLoaded}
        requestsIsLoaded={requestsIsLoaded}
        offersDataIsLoaded={offersDataIsLoaded}
        isUser={isUser}
        profile={userProfile}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
