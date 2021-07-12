import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import authReducer from "./authReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    // firestore: firestoreReducer,
    firebase: firebaseReducer
});
export default rootReducer;
