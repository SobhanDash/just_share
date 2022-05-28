import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import css from "./followlist.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { actionCreators } from "../../redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Followers = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { profile, isLoading } = useSelector((state) => state.userReducer);
  const followers = profile.followers;

  const remove = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.unfollow(id));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <section className={css.container}>
      <div>
        <Sidebar isProfile={profile} />
      </div>
      <section className={css.main}>
        <h1 className={css.header}>Followers</h1>
        <ul className={css.userdiv}>
          {followers.map((user) => {
            return (
              <li key={user?._id} className={css.followList}>
                <div className={css.card_wrapper}>
                  <div className={css.fpicdiv}>
                    <img
                      src={user?.about.profilepic}
                      alt="users"
                      width="40px"
                      className={css.fpic}
                    />
                  </div>
                  <div className={css.user_info}>
                    <Link
                      to={`/users/${user?._id}/${user?.username}`}
                      className={css.user_name}
                    >
                      {user?.username}
                    </Link>
                  </div>
                </div>
                <div className={css.btnDiv}>
                  <button
                    className={css.followBtn}
                    onClick={(e) => remove(e, user?._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};

export default Followers;
