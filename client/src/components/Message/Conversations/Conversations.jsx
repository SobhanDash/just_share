import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../redux";
import css from "./convos.module.css";
import nodp from "../../../images/nodp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const oncircle = <FontAwesomeIcon icon="fa-solid fa-circle" />;

const Conversations = ({
  profile,
  setClick,
  setReceiver,
  onlineUsers,
  setSender,
}) => {
  const dispatch = useDispatch();
  // const { conversations, messages } = useSelector(
  //   (state) => state.messageReducer,
  //   shallowEqual
  // );
  // const myconvos =
  //   conversations &&
  //   [...conversations].filter(
  //     (cnv) =>
  //       cnv.recipients[0]._id === profile._id ||
  //       cnv.recipients[1]._id === profile._id
  //   );

  // const cnvLength = [...myconvos].length;

  // useEffect(() => {
  //   dispatch(actionCreators.getConversations());
  // }, [messages, cnvLength, dispatch]);

  // const onCnvClick = (receiver, sender) => {
  //   setReceiver(receiver);
  //   setSender(sender);
  //   setClick(true);
  // };

  return (
    <div className={css.convos}>
      <div>
        <div className={css.top}>
          <img src={nodp} alt={profile.username} />
          {/* <img src={profile.about.profilePic} alt={profile.username} /> */}
          <h3>{profile.username}</h3>
        </div>
        <div className={css.bottom}>
          <div className={css.cflex}>
            <div className={css.cnv}>
              <img src={nodp} alt="" />
              <div className={css.cnvflex}>
                <h2>
                  {"Name" ? (
                    <span className={css.online}>{oncircle}</span>
                  ) : (
                    <span className={css.offline}>{oncircle}</span>
                  )}
                </h2>
                <p>You</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className={css.convos}>
    //   {profile !== [] && (
    //     <div>
    //       <div className={css.top}>
    //         <img src={nodp} alt={profile.username} />
    //         {/* <img src={profile.about.profilePic} alt={profile.username} /> */}
    //         <h2>{profile.username}</h2>
    //       </div>
    //       <div className={css.bottom}>
    //         {myconvos !== [] &&
    //           myconvos.map((cnv) => {
    //             return (
    //               <div className={css.cflex}>
    //                 <div
    //                   className={css.cnv}
    //                   onClick={() =>
    //                     onCnvClick(cnv.recipients[1], cnv.recipients[0])
    //                   }
    //                 >
    //                   <img
    //                     src={
    //                       cnv.recipients[0]._id === profile._id
    //                         ? cnv.recipients[1].profilepic
    //                           ? cnv.recipients[1].profilepic
    //                           : { nodp }
    //                         : cnv.recipients[0].profilepic
    //                         ? cnv.recipients[0].profilepic
    //                         : { nodp }
    //                     }
    //                     alt=""
    //                   />
    //                   <div className={css.cnvflex}>
    //                     <h2>
    //                       {cnv.recipients[0]._id === profile._id
    //                         ? cnv.recipients[1].name
    //                           ? cnv.recipients[1].name
    //                           : "Deleted User"
    //                         : cnv.recipients[0].name
    //                         ? cnv.recipients[0].name
    //                         : "Deleted User"}
    //                       {onlineUsers.includes(
    //                         cnv.recipients[0]._id === profile._id
    //                           ? cnv.recipients[1]._id
    //                           : cnv.recipients[1]._id
    //                       ) ? (
    //                         <span className={css.online}>{oncircle}</span>
    //                       ) : (
    //                         <span className={css.offline}>{oncircle}</span>
    //                       )}
    //                     </h2>
    //                     <p>
    //                       {cnv.recipients[0]._id === profile._id
    //                         ? "You"
    //                         : cnv.recipients[0].username}
    //                       : {cnv.text}
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //             );
    //           })}
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default Conversations;
