import React, { useEffect } from "react";
import PostItem from "../PostItem/PostItem";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";

import css from "./container.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Container = () => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state=> state.userReducer,shallowEqual);
  const {posts, isLoading} = useSelector(state=> state.postReducer,shallowEqual);

  useEffect(() => {
    dispatch(actionCreators.getPosts());
    // if(isLoading) {
    //   return <LoadingSpinner />
    // }
  }, [dispatch]);

  if(isLoading) {
    return <LoadingSpinner />
  }
  // console.log(profile);
  // console.log(profile.posts);
  
  return (
    <>
      <section className={css.feed}>
        {posts.length > 0 &&
          posts.map((post) => {
            // console.log(post);
            return (
              <PostItem
                key={post._id}
                post={post}
                postid={post._id}
                userid={profile._id}
                username={profile.username}
                caption={post.caption}
                dp={profile.about.profilepic}
                pic={post.image}
              />
            );
          })}
      </section>
    </>
  );
};

export default Container;
