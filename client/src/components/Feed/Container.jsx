import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
// import useForm from "../../services/useForm";
import PostItem from "../PostItem/PostItem";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";

import css from "./container.module.css";

const Container = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {user, profile} = useSelector(state=> state.userReducer,shallowEqual);
  // const { getProfile, profile, getPost, userposts } = useForm();

  useEffect(() => {
    if(user) {
      dispatch(actionCreators.getProfile());
      dispatch(actionCreators.getPosts());
    }
  }, [dispatch]);

  return (
    <>
      <section className={css.feed}>
        {profile &&
          profile.posts.map((post) => {
            return (
              <PostItem
                key={post._id}
                post={post}
                postid={post._id}
                userid={post.user._id}
                username={post.user.username}
                caption={post.caption}
                dp={post.user.about.profilepic}
                pic={post.image}
              />
            );
          })}
      </section>
    </>
  );
};

export default Container;
