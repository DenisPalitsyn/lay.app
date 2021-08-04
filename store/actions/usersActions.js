import {initPhotoObj} from "../../constants/initialState";
import {profileData} from "../../constants/profile";
import {adminUid} from "../../constants/adminUid";
import firebase from 'firebase/app';

export const getAllUsers = (state) => {
  const authProfile = state.firebase.profile;
  const {uid} = state.firebase.auth;
  const profiles = state.profile.data;
  // const usersList = state.firestore.ordered.filteredUsers;
  // let filteredUsers = {};

  // if (usersList) {
  //   for (let user of usersList) {
  //     filteredUsers[user.id] = user;
  //   }
  // }

  return {
    ...state.users.users,
    ...profiles,
    // ...filteredUsers,
    [uid]: authProfile,
    [adminUid]: {
      ...profileData,
      displayName: 'Lay Support',
      gender: 'Woman',
      id: adminUid,
      photos: [
        {
          path: 'dzBLjstBBlbaCGe6xAFawf9ZWvu1/public/4444.jpg',
          isPrivate: false
        }
      ]
    }
  };
}

const getMainPhotoUrl = async (firebase, user, size) => {
  const storageRef = firebase.storage().ref();

  const {photos, mainPhoto = -1} = user;
  const findMainIndex = photos && photos.findIndex((photo) => !photo.isPrivate);
  const mainPhotoIndex = mainPhoto < 0 ? findMainIndex : mainPhoto;

  let path = '';
  if (photos && photos.length) {
    let photoUrl;

    switch (size) {
      case 'XS':
        photoUrl = photos[mainPhotoIndex]?.pathS;
        break;
      case 'S':
        photoUrl = photos[mainPhotoIndex]?.pathS;
        break;
      case 'M':
        photoUrl = photos[mainPhotoIndex]?.pathM;
        break;
      case 'L':
        photoUrl = photos[mainPhotoIndex]?.pathL;
        break;
      case 'BIG':
        photoUrl = photos[mainPhotoIndex]?.path;
        break;
      default:
        photoUrl = photos[mainPhotoIndex]?.path;
    }

    path = mainPhotoIndex < 0 ? '' : (photoUrl || '');

    if (path) {
      return await storageRef.child(path).getDownloadURL()
        .then((photo) => photo)
        .catch((err) => {
          console.log(err);
        });
    }
    return undefined;
  }
  return undefined;
}

export const getUserPhoto = (uid, size = 'BIG') => async (dispatch, getState) => {
  const state = getState();
  const photoIndex = size.toLowerCase();
  const statePhotoObj = state.users.photos[uid] ?
    {
      ...initPhotoObj,
      ...state.users.photos[uid]
    } : initPhotoObj;
  const userPhoto = statePhotoObj[photoIndex];

  const userPhotoIsExist = userPhoto !== undefined;

  const users = getAllUsers(state);
  const user = users[uid];

  if (user && !userPhotoIsExist) {
    const photo = await getMainPhotoUrl(firebase, user, size);

    const photoObj = {
      ...statePhotoObj,
      [photoIndex]: photo
    };

    dispatch({type: 'GET_USER_PHOTO_SUCCESS', data: {uid, photo: photoObj}});
    return photo;
  }
  return userPhoto;
};

// export const getUsersPhoto = (usersId: Array<string>) => async (dispatch: any, getState: any, getFirebase: any) => {
//   const firebase = getFirebase();
//   const state = getState();
//   const users: UsersType = getAllUsers(state);
//   let photos: UsersPhotoType = {};
//
//   for (let userId of usersId) {
//     const user = users[userId];
//     const userPhotoIsExist = state.users.photos[userId] !== undefined;
//     if (userPhotoIsExist) {
//       photos[userId] = state.users.photos[userId];
//     }
//     if (!userPhotoIsExist) {
//       photos[userId] = await getMainPhotoUrl(firebase, user);
//     }
//   }
//
//   dispatch({type: 'GET_USERS_PHOTO_SUCCESS', data: photos});
//   return photos;
// }

export const goChatViaRequests = (requestId, profileUid) => async (dispatch, getState) => {
  const db = firebase.firestore();
  const state = getState();
  const allRequests = state.firestore.ordered.datingRequests;

  const request = allRequests.find((r) => r.id === requestId);

  const newRequest = {...request};
  !newRequest.chats.includes(profileUid) && (newRequest.chats = [...newRequest.chats, profileUid]);

  const dateRequest = db.collection('dating-requests').doc(requestId);
  await dateRequest.update(newRequest)
}

export const getUser = (uid) => async (dispatch, getState) => {
  const db = firebase.firestore();
  const state = getState();
  const users = getAllUsers(state);
  const user = users[uid];
  const userIsExists = user !== undefined;

  if (userIsExists) {
    return user;
  }
  return await db.collection('users').doc(uid).get().then(async (doc) => {
    if (doc.exists) {
      const profile = doc.data();
      dispatch({type: 'GET_PROFILE_DATA_SUCCESS', data: {profile, uid}});
      return profile;
    } else {
      return undefined;
    }
  });
}

export const getUsers = (usersId) => async (dispatch, getState) => {
  const state = getState();
  const users = getAllUsers(state);

  let newUsers = {};

  for (let userId of usersId) {
    const user = users[userId];
    const userIsExists = user !== undefined;
    if (userIsExists) {
      newUsers[userId] = user;
    } else {
      const profile = await dispatch(getUser(userId));
      if (profile) {
        newUsers[userId] = profile;
      }
    }
  }

  return newUsers;
}

export const getFilteredUsers = () => async (dispatch, getState) => {
  const {uid} = firebase.auth().currentUser;
  const state = getState();
  const {profile} = state;
  const {role, gender, lookingFor} = profile.data[uid];

  const docs = await firebase.firestore()
    .collection('users')
    .where('approved', '==', true)
    .where('role', '==', role !== 'deleted' && (role === 'favorite' ? 'patron' : 'favorite'))
    .where('lookingFor', "array-contains", gender)
    .where('gender', 'in', lookingFor)
    .get()
    .catch(e => console.log(e));

  const users = [];
  docs.forEach(doc => {
    users.push(doc.data());
  });
  dispatch({type: 'SAVE_USERS', data: users});
  return users;
}

