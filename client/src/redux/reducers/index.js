import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import messagereducer from "./messageReducer";

const reducers = combineReducers({
  userReducer: userReducer,
  postReducer: postReducer,
  messagereducer: messagereducer,
});

export default reducers;
