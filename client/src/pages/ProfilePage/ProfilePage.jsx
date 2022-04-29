import React, { useEffect } from "react";
// import useForm from "../../services/useForm";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faCamera } from "@fortawesome/free-solid-svg-icons";
import nodpImg from "../../images/nodp.jpg";
import css from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators } from "../../redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const feed = <FontAwesomeIcon icon={faTh} />;
const camera = <FontAwesomeIcon icon={faCamera} />;

const ProfilePage = () => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const dispatch = useDispatch();
  const {user,profile,isLoading} = useSelector(state=> state.userReducer);
  // const [isProfile, setIsProfile] = useState(true);
  // const { getProfile, profile, userposts, setUserPosts } = useForm();

  useEffect(() => {
    if(!user) {
      history.push('/login');
    }
    else {
      dispatch(actionCreators.getProfile());
    }
  }, [dispatch,history,user]);

  if(isLoading) {
    return <LoadingSpinner />
  }

  return (
    <section className={css.profileContainer}>
      <div>
        <Sidebar isProfile={profile} />
      </div>
      <div className={css.profileData}>
        {/* Profile Image */}
        <div className={css.profile}>
          <div className={css.profileImg}>
            {profile.about.profilepic !== null ? (
              <img src={profile.about.profilepic} alt="" />
            ) : (
              <img src={nodpImg} alt={profile.username} />
            )}
          </div>
          <div className={css.name}>
            <h1>{profile.name}</h1>
          </div>
          <span>@{profile.username}</span>
        </div>

        {/* About */}
        <div className={css.about}>
          <div className={css.box}>
            <h3>{profile.posts.length}</h3>
            <span>Posts</span>
          </div>
          <div className={css.box}>
            <h3>{profile.followers.length}</h3>
            <span>Followers</span>
          </div>
          <div className={css.box}>
            <h3>{profile.following.length}</h3>
            <span>Following</span>
          </div>
        </div>

        {/* Posts */}
        <div className={css.posts}>
          <h4>
            <span className={css.icon}>{feed}</span> POSTS
          </h4>
          <div className={css.postContainer}>
            {profile.posts.length !== 0 &&
              profile.posts.map((post) => {
                return (
                  <div className={css.card} key={post._id}>
                    <img src={post.image} alt={post.caption} />
                  </div>
                );
              })}
          </div>
          {profile.posts.length === 0 && (
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

export default ProfilePage;
