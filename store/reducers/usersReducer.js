import {initUsersState} from "../../constants/initialState";

const usersReducer = (state = initUsersState, action) => {
  switch (action.type) {
    case 'GET_USER_PHOTO_SUCCESS': {
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.data.uid]: {
            ...state.photos[action.data.uid],
            ...action.data.photo
          }
        }
      };
    }
    case 'GET_USERS_PHOTO_SUCCESS': {
      return {
        ...state,
        photos: {
          ...state.photos,
          ...action.data
        }
      };
    }
    case 'GET_USERS_DATE_REQUEST_SUCCESS': {
      return {
        ...state,
        requests: [
          ...state.requests,
          ...action.data
        ]
      }
    }
    case 'SAVE_USER':
      return {
        ...state,
        users: {
          ...state.users,
          [action.data.id]: action.data.user
        }
      }
    case 'SAVE_USERS':
      const usersArray = action.data;
      const users = {};

      usersArray.forEach((user) => {
        users[user.id] = {...user};
      })
      return {
        ...state,
        users: {
          ...state.users,
          ...users
        }
      }
    case 'UPDATE_USER':
      return {
        ...state,
        users: {
          ...state.users,
          [action.data.id]: {
            ...state.users[action.data.id],
            ...action.data.newValue
          }
        }
      }
    default:
      return state;
  }
};

export default usersReducer;
