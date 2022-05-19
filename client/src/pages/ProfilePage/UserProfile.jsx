import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faCamera } from "@fortawesome/free-solid-svg-icons";
import nodpImg from "../../images/nodp.jpg";
import css from "./profile.module.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useHistory, useParams } from "react-router-dom";

const feed = <FontAwesomeIcon icon={faTh} />;
const camera = <FontAwesomeIcon icon={faCamera} />;

const UserProfile = () => {
  const { userid } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [isProfile, setIsProfile] = useState(true);
  const history = useHistory();

  const redirectToPost = (id) => {
    history.push(`/post/${id}`);
  };

  const dispatch = useDispatch();
  const { otherUser, isLoading } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );

  useEffect(() => {
    dispatch(actionCreators.getUser(userid));
  }, [dispatch, userid]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  // return <h1>{console.log(otherUser)} </h1>;
  return (
    <section className={css.profileContainer}>
      <div>
        <Sidebar isProfile={isProfile} />
      </div>
      <div className={css.profileData}>
        {/* Profile Image */}
        <div className={css.profile}>
          <div className={css.profileImg}>
            {otherUser?.about.profilepic !== null ? (
              <img src={otherUser?.about.profilepic} alt="" />
            ) : (
              <img src={nodpImg} alt={otherUser?.username} />
            )}
            {/* <img src={nodpImg} alt={profile.username} /> */}
          </div>
          <div className={css.name}>
            <h1>{otherUser?.name}</h1>
          </div>
          <span>@{otherUser?.username}</span>
        </div>

        {/* About */}
        <div className={css.about}>
          <div className={css.box}>
            <h3>{otherUser?.posts.length}</h3>
            <span>Posts</span>
          </div>
          <div className={css.box}>
            <h3>{otherUser?.followers.length}</h3>
            <span>Followers</span>
          </div>
          <div className={css.box}>
            <h3>{otherUser?.following.length}</h3>
            <span>Following</span>
          </div>
        </div>

        {/* Posts */}
        <div className={css.posts}>
          <h4>
            <span className={css.icon}>{feed}</span> POSTS
          </h4>
          <div className={css.postContainer}>
            {otherUser?.posts.length !== 0 &&
              otherUser?.posts.map((post) => {
                return (
                  <div className={css.card} key={post._id}>
                    <img
                      src={post.image}
                      alt={post.caption}
                      onClick={() => redirectToPost(post._id)}
                    />
                  </div>
                );
              })}
          </div>
          {otherUser?.posts.length === 0 && (
            <div className={css.no_post_container}>
              <div className={css.cameraContainer}>
                <span className={css.iconCamera}>{camera}</span>
              </div>
              <p className={css.noPost}>No Posts Yet</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
