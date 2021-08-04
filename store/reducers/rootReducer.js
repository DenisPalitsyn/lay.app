import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    users: usersReducer,
    // firestore: firestoreReducer,
    firebase: firebaseReducer
});
export default rootReducer;
