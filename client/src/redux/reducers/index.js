import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

const reducers = combineReducers({
    userReducer: userReducer,
    postReducer: postReducer
});

export default reducers;