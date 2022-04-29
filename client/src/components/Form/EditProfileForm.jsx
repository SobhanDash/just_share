import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import useForm from "../../services/useForm";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import css from "./form.module.css";

const EditProfileForm = () => {
  // const { profileChange, editProfile, getProfile, editUserProfile } = useForm();
  const dispatch = useDispatch();
  const {profile, isLoading} = useSelector(state=> state.userReducer,shallowEqual);
  const [editProfile, setEditProfile] = useState({
    username: profile && profile.username,
    name: profile && profile.name,
    email: profile && profile.email,
    phone: profile && profile.phone,
    profilepic: profile && profile.about.profilepic,
  });

  const profileChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({
      ...editProfile,
      [name]: value,
    });
  };

  const editUserProfile = ()=> {
    dispatch(actionCreators.editProfile(editProfile));
  }

  // console.log(editProfile);
  useEffect(()=> {
    dispatch(actionCreators.getProfile());
  }, [dispatch]);

  if(isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <form className={css.eform}>
        <main className={css.eform_main}>
          <div className={css.username}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter Your Username"
              id="username"
              name="username"
              value={editProfile.username}
              onChange={profileChange}
            />
          </div>
          <div className={css.name}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              id="name"
              name="name"
              value={editProfile.name}
              onChange={profileChange}
            />
          </div>
          <div className={css.mobileNo}>
            <label htmlFor="Mobile No">Mobile No.</label>
            <input
              type="text"
              placeholder="Enter Your Mobile No."
              id="mobile"
              name="mobile"
              value={editProfile.phone}
              onChange={profileChange}
            />
          </div>
          <div className={css.email}>
            <label htmlFor="Email address">Email Address</label>
            <input
              type="email"
              placeholder="email@example.com"
              id="email"
              name="email"
              value={editProfile.email}
              onChange={profileChange}
            />
          </div>
          {/* <div className={css.password}>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              name="password"
              value={profile.username}
              onChange={handleRegisterChange}
            />
          </div>
          <div className={css.confirmPassword}>
            <label htmlFor="Confirm Password">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleRegisterChange}
            />
          </div> */}
          <button className={css.saveChanges} onClick={editUserProfile}>
            Save Changes
          </button>
        </main>
      </form>
    </>
  );
};

export default EditProfileForm;
