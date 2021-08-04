import firebase from "firebase/app";
import * as Google from 'expo-google-app-auth';
import {androidClientId, iosClientId} from "../../constants/firebaseConfig";

export const signInWithEmailAndPassword = (email, password) => async (dispatch) => {
    dispatch({type: 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_IN_PROGRESS'});

    const db = firebase.firestore();
    // const state = getState();
    // const lang = state.app.lang;

    await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((resp) => {
            dispatch({type: 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS'});

            return resp.user;
        })
        .then(() => {
            // const {uid, email, metadata} = user;

            //
            // const {creationTime, lastSignInTime} = metadata;

            // mixpanel.identify(uid);
            // mixpanel.people.set({"$email": email, "$lang": lang, '$creationTime': creationTime, '$lastSignInTime': lastSignInTime});
            // mixpanel.people.increment("logInCompleted", 1);
        })
        .catch((error) => {
            if (error.code === 'auth/multi-factor-auth-required') {
                db.collection('users').doc(error.a.localId).get().then((doc) => {
                    if (doc.exists) {
                        const phoneNumber = doc.data().phoneNumber;
                        const resolver = error.resolver;

                        dispatch({type: 'UPDATE_MFA_INFO', data: {phoneNumber, resolver}});
                    }
                })

                dispatch({type: 'MULTI_FACTOR_ERROR'});

            } else {
                dispatch(
                    {type: 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_ERROR', data: {error: error.message, code: error.code}});
            }
            throw new Error(error);
        });
};

export const checkEmailVerified = () => async (dispatch) => {
    const user = firebase.auth().currentUser;

    if (user) {
        if (user.emailVerified) {
            dispatch({type: 'EMAIL_IS_VERIFIED'});
        }
        dispatch(isModeratorCheck());
    }
};

export const signInWithGoogle = () => async (dispatch) => {
    dispatch({type: 'SIGN_IN_WITH_GOOGLE_IN_PROGRESS'});

    const db = firebase.firestore();

    function isUserEqual(googleUser, firebaseUser) {
        if (firebaseUser) {
            const providerData = firebaseUser.providerData;
            for (let i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    return true;
                }
            }
        }
        return false;
    }

    function onSignIn(googleUser) {
        console.log('Google Auth Response', googleUser);
        const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            if (!isUserEqual(googleUser, firebaseUser)) {
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );

                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then(async result => {
                        console.log('user signed in')
                        const user = result.user;
                        const {
                            uid,
                            // email,
                            metadata
                        } = user;

                        const {
                            creationTime,
                            // lastSignInTime
                        } = metadata;

                        if (result.additionalUserInfo.isNewUser) {
                            // mixpanel.identify(uid);
                            // mixpanel.people.set({"$email": email, "$lang": lang, '$creationTime': creationTime, '$lastSignInTime': lastSignInTime});
                            // mixpanel.people.increment("logInCompleted", 1);
                            const userProfile = firebase.firestore().collection('users').doc(`${uid}`);
                            await userProfile.set({creationTime})
                                .catch(function (error) {
                                    console.error('Error uploaded document: ', error);
                                });
                        } else {
                            const userProfile = firebase.firestore().collection('users').doc(`${uid}`);
                            await userProfile.update({creationTime})
                                .catch(function (error) {
                                    console.error('Error uploaded document: ', error);
                                });
                        }

                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                console.log('User already signed-in Firebase.');
            }
        });
    }

    try {
        const result = await Google.logInAsync({
            androidClientId: androidClientId,
            iosClientId: iosClientId,
            scopes: ['profile', 'email']
        });

        if (result.type === 'success') {
            onSignIn(result);
            return result.accessToken;
        } else {
            return {cancelled: true};
        }
    } catch (error) {
        if (error.code === 'auth/multi-factor-auth-required') {
            db.collection('users').doc(error.a.localId).get().then((doc) => {
                if (doc.exists) {
                    const phoneNumber = doc.data().phoneNumber;
                    const resolver = error.resolver;

                    dispatch({type: 'UPDATE_MFA_INFO', data: {phoneNumber, resolver}});
                }
            })

            dispatch({type: 'MULTI_FACTOR_ERROR'});

        }
        throw new Error(error);
    }
};

export const signUpWithEmailAndPassword = (email, password) => async (dispatch, getState) => {
    const db = firebase.firestore();

    dispatch({type: 'SIGN_UP_WITH_EMAIL_AND_PASSWORD_IN_PROGRESS'});

    const state = getState();
    const initialProfileData = state.profile.data;
    // const lang = state.app.lang;

    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((resp) => {
            dispatch({type: 'SIGN_UP_WITH_EMAIL_AND_PASSWORD_SUCCESS'});
            dispatch({type: 'SEND_EMAIL_VERIFICATION_IN_PROGRESS'});

            return resp.user;
        })
        .then(async (user) => {
            const {uid, metadata} = user;

            const {creationTime} = metadata;

            // mixpanel.identify(uid);
            // mixpanel.people.set({"$email": email, "$lang": lang, '$creationTime': creationTime, '$lastSignInTime': lastSignInTime});

            const userProfile = db.collection('users').doc(`${uid}`);
            await userProfile.set({...initialProfileData, creationTime: creationTime})
                .catch(function (error) {
                    console.error('Error uploaded document: ', error);
                });
        })
        .catch(function (error) {
            dispatch({type: 'SEND_EMAIL_VERIFICATION_ERROR'});
            dispatch({type: 'SIGN_UP_WITH_EMAIL_AND_PASSWORD_ERROR', data: {error: error.message, code: error.code}});
            throw new Error();
        })
};

export const logout = () => async (dispatch) => {
    dispatch({type: 'LOGOUT_IN_PROGRESS'});

    await firebase.auth().signOut();
};

export const isModeratorCheck = () => async (dispatch) => {
    await firebase.auth().currentUser.getIdTokenResult().then((token) => {
        const isModerator = token?.claims?.moderator;
        dispatch({type: 'IS_MODERATOR_CHECK', data: {isModerator}});
    });
};

