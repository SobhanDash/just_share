/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import css from "./post.module.css";
import nodpImg from "../../images/nodp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import FeatModal from "../Modal/FeatModal";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import UpdateModal from "../Modal/UpdateModal";
// import useForm from "../../services/useForm";
// import { UserContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";

const likeHeart = <FontAwesomeIcon icon={faHeart} />;
const commentIcon = <FontAwesomeIcon icon={faComment} />;
const more = <FontAwesomeIcon icon={faEllipsisV} />;

const PostItem = ({ post, postid, username, caption, dp, pic, userid }) => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const {user,profile} = useSelector(state=> state.userReducer);
  const [show, setShow] = useState(false);
  const [fshow, setFShow] = useState(false);
  const [ushow, setUShow] = useState(false);
  // const { userposts, setUserPosts } = useForm();
  // eslint-disable-next-line no-unused-vars
  // const { state, dispatch } = useContext(UserContext);

  function handleModalClose() {
    setFShow(!fshow);
  }
  const likePost = () => {
    dispatch(actionCreators.likePost(postid));
  };

  const unlikePost = (id) => {
    dispatch(actionCreators.likePost(postid));
  };

  useEffect(() => {
    if(user) {
      dispatch(actionCreators.fetchPost(postid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <Modal show={show} setShow={setShow} />
      <UpdateModal ushow={ushow} setUShow={setUShow} post={post} />
      <section className={css.post_container}>
        <div className={css.user}>
          <div className={css.profile_img}>
            {dp !== null ? (
              <img src={dp} alt="" />
            ) : (
              <img src={nodpImg} alt={username} />
            )}
          </div>
          <div className={css.username}>
            <span>{username}</span>
          </div>
        </div>
        <div className={css.post}>
          <img src={pic} alt={caption} />
          <figcaption className={css.img_caption}>
            {username} <span>{caption}</span>
          </figcaption>
          <div className={css.post_icons}>
            <div className={css.post_icon}>
              {post.likes.includes(profile._id) ? (
                <button
                  type="button"
                  onClick={unlikePost}
                  className={css.icon}
                >
                  <i className={css.active}>{likeHeart}</i>
                  <span className={css.ispan}>{post.likes.length}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={likePost}
                  className={css.icon}
                >
                  <i>{likeHeart}</i>
                  <span className={css.ispan}>{post.likes.length}</span>
                </button>
              )}
              <button className={css.icon}>
                <Link to={`/post/${postid}`}>{commentIcon}</Link>
                <span className={css.ispan}>{post.comments.length}</span>
              </button>
            </div>
            <span className={css.icon} onClick={() => setFShow(!fshow)}>
              {more}
              <FeatModal
                id={postid}
                userid={userid}
                fshow={fshow}
                fn={handleModalClose}
                setUShow={setUShow}
              />
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostItem;
