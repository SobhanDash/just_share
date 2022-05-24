/* eslint-disable eqeqeq */
import React, { useContext } from "react";
import axios from "axios";
import css from "./modal.module.css";
import reactDom from "react-dom";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useForm from "../../services/useForm";
import { UserContext } from "../../App";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";

const FeatModal = ({ post, id, fshow, fn, setUShow, userid }) => {
  const dispatch = useDispatch();
  const {posts} = useSelector(state=> state.postReducer,shallowEqual);
  // const { userposts } = useForm();
  // const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  if (!fshow) {
    return null;
  }

  const handleDeletebtn = (e) => {
    dispatch(actionCreators.deletePost(post._id));
    history.push("/");
  };

  return reactDom.createPortal(
    <>
      <div className={css.fbackdrop}></div>
      <div className={css.featcont}>
        {post.user._id == userid && (
          <button
            className={`${css.fbutton} ${css.delete}`}
            onClick={handleDeletebtn}
          >
            Delete
          </button>
        )}
        <button className={`${css.fbutton} ${css.share}`}>Share</button>
        {post.user._id == userid && (
          <Link
            to=""
            className={`${css.fbutton}`}
            onClick={() => setUShow(true)}
          >
            <button className={`${css.update}`}>Update</button>
          </Link>
        )}
        <button className={`${css.fbutton} ${css.cancel}`} onClick={fn}>
          Cancel
        </button>
      </div>
    </>,
    document.getElementById("featModal")
  );
};

export default FeatModal;
