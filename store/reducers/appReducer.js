import {initAppState} from "../../constants/initialState";

const appReducer = (state = initAppState, action) => {
  switch (action.type) {
    case 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS':
    case 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_ERROR':
    case 'SAVE_CHAT_USER_SUCCESS':
    case 'SAVE_CHAT_USER_ERROR':
    case 'SAVE_PROFILE_DATA_SUCCESS':
    case 'SAVE_PROFILE_DATA_ERROR':
    case 'LOGOUT_SUCCESS':
    case 'LOGOUT_ERROR':
    case 'GET_PROFILE_DATA_SUCCESS':
    case 'GET_PROFILE_DATA_ERROR':
    case 'GET_MESSAGE_DATA_SUCCESS': {
        return {
        ...state,
        appLoaded: true
      };
    }
    case 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_IN_PROGRESS':
    case 'LOGOUT_IN_PROGRESS':
    case 'SAVE_PROFILE_DATA_IN_PROGRESS':
    case 'SAVE_CHAT_USER_IN_PROGRESS':
    case 'GET_PROFILE_DATA_IN_PROGRESS':
    case 'GET_CHATS_IN_PROGRESS': {
      return {
        ...state,
        appLoaded: false
      };
    }
    case 'SET_EMAIL_FOR_RESET_PASSWORD_SUCCESS': {
      return {
        ...state,
        appLoaded: true,
        resetPassword: 'SUCCESS'
      };
    }
    case 'SET_EMAIL_FOR_RESET_PASSWORD_ERROR': {
      return {
        ...state,
        resetPassword: action.error
      };
    }
    case 'SET_EMAIL_FOR_RESET_PASSWORD_IN_PROGRESS': {
      return {
        ...state,
        resetPassword: 'IN_PROGRESS'
      };
    }
    case 'GET_DOWNLOAD_URLS_SUCCESS': {
      return {
        ...state,
        photoLoaded: true
      };
    }
    case 'GET_DOWNLOAD_URLS_IN_PROGRESS': {
      return {
        ...state,
        photoLoaded: false
      };
    }
    case 'SET_LANG': {
      return {
        ...state,
        lang: action.lang
      };
    }
    case 'CLOSE_INFO_MESSAGE': {
      return {
        ...state,
        showInfoMessage: false
      };
    }
    default:
      return state;
  }
};

export default appReducer;
