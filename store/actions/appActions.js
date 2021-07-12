export const changeLanguage = (lang) => async (dispatch, getState, getFirebase) => {
  const state = getState();
  const firebase = getFirebase();
  const db = firebase.firestore();
  const {uid} = state.firebase.auth;

  if (uid) {
    dispatch({type: 'UPDATE_LANG', data: {lang, uid}});
    db.collection('users').doc(uid).update({lang});
  }
  dispatch({type: 'SET_LANG', lang});
};

export const closeInfoMessage = () => async (dispatch) => {
  dispatch({type: 'CLOSE_INFO_MESSAGE'});
};
