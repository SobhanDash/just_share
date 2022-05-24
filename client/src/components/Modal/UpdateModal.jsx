import React, { useEffect, useRef, useState } from "react";
import reactDom from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faImages } from "@fortawesome/free-solid-svg-icons";
import css from "./modal.module.css";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux";

toast.configure();
const cloud = <FontAwesomeIcon icon={faCloudUploadAlt} />;
const imgIcon = <FontAwesomeIcon icon={faImages} />;

const UpdateModal = ({ ushow, setUShow, post }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(post.image ? post.image : '');
  const [cap, setCap] = useState(post.caption ? post.caption : '');
  const imageRef = useRef();

  if (!ushow) {
    return null;
  }
  // ----------

  // --------CLOUDINARY UPLOAD----------
  const getImagePreview = (event) => {
    var image = post.image;
    setImage(post.image);
    var imagediv = document.querySelector("#image");
    var newimg = document.createElement("img");
    newimg.src = image;
    imagediv.appendChild(newimg);
  };

  const updateDetails = (e) => {
    dispatch(actionCreators.updatePost({id: post._id, image: image, caption: cap}));
    setUShow(false);
  };
  // --------------

  return reactDom.createPortal(
    <>
      <div className={css.backdrop}></div>
      <section className={css.modal}>
        <div className={css.wrapper}>
          <div className={css.image} id="image"></div>
          <div className={css.content}>
            <div className={css.icon}>{imgIcon}</div>
            <div className={css.text}>No File Chosen</div>
          </div>
        </div>
        {imageRef.current !== undefined && (
          <div className={css.picDisplay}></div>
        )}
        <label htmlFor="update_file" className={css.customLabel}>
          <span> {cloud} </span> Get Image
        </label>
        <input
          className={css.getImgBtn}
          id="update_file"
          type="button"
          name="post"
          onClick={getImagePreview}
          ref={imageRef}
        />
        <input
          className={css.caption}
          value={cap}
          type="text"
          name="caption"
          placeholder="Enter caption"
          onChange={(e) => setCap(e.target.value)}
        />
        <button
          className={css.uploadBtn}
          onClick={(e) => {
            updateDetails(e);
          }}
        >
          Update
        </button>
        <button className={css.uploadBtn} onClick={() => setUShow(false)}>
          Cancel
        </button>
      </section>
    </>,
    document.getElementById("updatemodal")
  );
};

export default UpdateModal;
