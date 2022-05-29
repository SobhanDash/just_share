import React, { useEffect, useState } from "react";
import css from "./followlist.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { actionCreators } from "../../redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Following = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isFollowing, setIsFollowing] = useState(false);

  const { profile, isLoading } = useSelector((state) => state.userReducer);

  const following = profile.following;

  const follow = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.follow(id));
  };

  const unfollow = (e, id) => {
    e.preventDefault();
    dispatch(actionCreators.unfollow(id));
  };

  // useEffect(() => {
  //   for (let i = 0; i < profile.following.length; i++) {
  //     if (profile.following[i]._id === userid) {
  //       setIsFollowing(true);
  //       break;
  //     } else {
  //       setIsFollowing(false);
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [dispatch, userid, profile.following.length]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className={css.container}>
      <div>
        <Sidebar isProfile={profile} />
      </div>
      <div className={css.main}>
        <h1 className={css.header}>Following</h1>
        <ul className={css.userdiv}>
          {following.map((user) => {
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
                  {isFollowing ? (
                    <button
                      className={css.followBtn}
                      onClick={(e) => follow(e, user?._id)}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      className={css.followBtn}
                      onClick={(e) => unfollow(e, user?._id)}
                    >
                      Unfollow
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Following;
