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
  const { conversations, messages } = useSelector(
    (state) => state.messagereducer,
    shallowEqual
  );

  const myconvos =
    conversations &&
    [...conversations].filter(
      (cnv) =>
        cnv.recipients[0]._id === profile._id ||
        cnv.recipients[1]._id === profile._id
    );

  useEffect(() => {
    dispatch(actionCreators.getConversations());
  }, [messages, conversations.length, dispatch]);

  const onCnvClick = (receiver, sender) => {
    setReceiver(receiver);
    setSender(sender);
    setClick(true);
  };

  return (
    <div className={css.convos}>
      <div>
        <div className={css.top}>
          <img src={profile.about.profilepic} alt={profile.username} />
          <h3>{profile.username}</h3>
        </div>
        <div className={css.bottom}>
          {conversations.length === 0 && <h2>No Conversations to show!</h2>}
          {conversations.length > 0 && conversations.map((cnv) => {
            return (
              <div className={css.cflex} key={cnv._id}>
                <div className={css.cnv} onClick={() => onCnvClick(cnv.recipients[1], cnv.recipients[0])}>
                  <img
                    src={
                      cnv.recipients[0]._id === profile._id
                        ? cnv.recipients[1].profilepic
                          ? cnv.recipients[1].profilepic
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                        : cnv.recipients[0].profilepic
                          ? cnv.recipients[0].profilepic
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    }
                    alt=""
                  />
                  <div className={css.cnvflex}>
                    <h2>
                      {cnv.recipients[0]._id === profile._id
                        ? cnv.recipients[1].name
                          ? cnv.recipients[1].name
                          : "Deleted User"
                        : cnv.recipients[0].name
                          ? cnv.recipients[0].name
                          : "Deleted User"}
                      {/* {onlineUsers.includes(
                        cnv.recipients[0]._id === profile._id
                          ? cnv.recipients[1]._id
                          : cnv.recipients[1]._id
                      ) ? (
                        <FiberManualRecordIcon style={{ color: "green" }} />
                      ) : (
                        <FiberManualRecordIcon style={{ color: "red" }} />
                      )} */}
                    </h2>
                    {cnv.text !== null || cnv.media.length !== 0 ? <p>{cnv.recipients[0]._id === profile._id ? "You" : cnv.recipients[0].username} : {cnv.text}</p> : <p className={css.newcnv}>Send message to start conversation!</p>}
                  </div>
                </div>
              </div>
            );
          })}
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
