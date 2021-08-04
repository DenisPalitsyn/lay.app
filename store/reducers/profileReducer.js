import {initProfileState} from "../../constants/initialState";
import {profileData} from "../../constants/profile";

const profileReducer = (state = initProfileState, action) => {
    switch (action.type) {
        case 'SAVE_ROLE_SUCCESS':
        case 'SAVE_ROLE_IN_PROGRESS':
        case 'SAVE_ROLE_ERROR': {
            return {
                ...state
            }
        }
        case 'GET_PROFILE_DATA_SUCCESS': {
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.data.uid]: {
                        ...profileData,
                        ...action.data.profile
                    }
                },
            }
        }

        case 'UPDATE_PROFILE_DATA':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.data.id]: {
                        ...state.data[action.data.id],
                        ...action.data.newValue
                    }
                }
            }

        case 'GET_DOWNLOAD_URLS_IN_PROGRESS': {
            return {
                ...state,
                photos: {
                    ...state.photos,
                    [action.data.uid]: {}
                }
            }
        }
        case 'GET_DOWNLOAD_URLS_SUCCESS': {
            return {
                ...state,
                photos: {
                    ...state.photos,
                    [action.data.uid]: {
                        ...state.photos[action.data.uid],
                        ...action.data.downloadUrls
                    }
                }
            }
        }
        case 'UPDATE_FILE_UPLOAD': {
            return {
                ...state,
                fileUploadProcess: [
                    ...state.fileUploadProcess.slice(0, action.data.index),
                    action.data.progress,
                    ...state.fileUploadProcess.slice(action.data.index + 1)
                ]
            };
        }
        case 'UPDATE_LANG': {
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.data.uid]: {
                        ...state.data[action.data.uid],
                        lang: action.data.lang
                    }
                }
            }
        }
        case 'SAVE_PROFILE_DATA_SUCCESS': {
            return {
                ...state,
                isSaveProfile: true
            };
        }
        case 'IS_MODERATOR_CHECK': {
            return {
                ...state,
                isModerator: action.data.isModerator
            }
        }
        case 'SAVE_AUTH_DATE_REQUEST_SUCCESS': {
            return {
                ...state,
                authRequests: [
                    ...state.authRequests,
                    ...action.data
                ]
            }
        }
        case 'UPDATE_DATE_REQUEST_SUCCESS': {
            return {
                ...state,
                authRequests: [
                    ...action.data
                ]
            }
        }
        case 'GET_DATE_OFFERS_SUCCESS': {
            return {
                ...state,
                offers: [
                    // ...state.offers,
                    ...action.data
                ]
            }
        }
        case 'UPDATE_DATE_OFFERS': {
            return {
                ...state,
                offers: [
                    ...action.payload
                ]
            }
        }
        default:
            return state;
    }
};

export default profileReducer;
