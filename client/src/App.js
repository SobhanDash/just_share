import React, { createContext, useReducer } from "react";
import { Route, Routes } from "react-router";
import CommentsPage from "./pages/CommentsPage/CommentsPage";
import Index from "./pages/Index/Index";
import LoginPage from "./pages/LoginPage/LoginPage";
import EditProfile from "./pages/ProfilePage/EditProfile";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserProfile from "./pages/ProfilePage/UserProfile";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import "./styles/App.css";
import RouteConfig from "./Router";

import { reducer, initialState } from "./reducers/userReducer";
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <RouteConfig UserContext={UserContext} />
    </UserContext.Provider>
    // <Routes>
    //   <Route exact path="/" element={Index} />
    //   <Route exact path="/login" element={LoginPage} />
    //   <Route exact path="/register" element={RegisterPage} />
    //   <Route exact path="/profile" element={ProfilePage} />
    //   <Route exact path="/editProfile" element={EditProfile} />
    //   <Route exact path="/post/:postid" element={CommentsPage} />
    //   <Route exact path="/profile/:userid" element={UserProfile} />
    // </Routes>
  );
};

export default App;
