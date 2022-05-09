import React, { useContext } from "react";
import css from "./comments.module.css";
import CommentForm from "../Form/CommentForm";
import Comment from "../Comments/Comment";
import { UserContext } from "../../App";


const Comments = ({ profile, post }) => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);

  return (
    <div className={css.commentSection}>
      <header className={css.cname}>Comments</header>
      {/* handleSubmit={addComment} */}
      <CommentForm
        submitLabel="Post"
        profile={profile}
        post={post}
      />
      <div className={css.comments_container}>
        {post.comments.map((rootComment) => {
          return (<Comment
            key={rootComment._id}
            comment={rootComment}
            currentUserId={rootComment.user._id}
          />);
        } )}
      </div>
    </div>
  );
};

export default Comments;
