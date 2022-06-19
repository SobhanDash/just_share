import React, { useState, useEffect, Fragment } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators } from "../../redux";

import styles from "./onlineUsers.module.css";

const OnlineUsers = ({ users }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, profile, onlineUsers } = useSelector(state => state.userReducer,shallowEqual);

  const redirect = (e,userid) => {
    e.preventDefault();
    dispatch(actionCreators.newCnv(profile._id, userid));
    history.push('/message');
  }

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } 
    else {
      dispatch(actionCreators.getOnlineUsers(users));
    }
  }, [users]);

  return (
    <div className={styles.online_wrap}>
      <h2>Online Users</h2>
      {onlineUsers && onlineUsers.length > 0 && onlineUsers.map((user) => {
          return(
            <Fragment key={user._id}>
                {user._id !== profile._id && <div className={styles.onlineUser} onClick={(e)=> redirect(e,user._id)}>
                    <img src={user.about.profilepic} alt={user.username} />
                    <h4>{user.username}</h4>
                </div>}
            </Fragment>
          );
      })}
    </div>
  );
};

export default OnlineUsers;
