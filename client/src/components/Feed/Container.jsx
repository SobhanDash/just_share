import React, { useEffect } from "react";
import PostItem from "../PostItem/PostItem";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";

import css from "./container.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Container = () => {
  const dispatch = useDispatch();
  const {user, profile} = useSelector(state=> state.userReducer,shallowEqual);
  const isLoading = useSelector(state=> state.postReducer.isLoading,shallowEqual);

  useEffect(() => {
    if(user) {
      dispatch(actionCreators.getPosts());
    }
  }, [dispatch,user]);

  if(isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <section className={css.feed}>
        {profile.length !== {} &&
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
