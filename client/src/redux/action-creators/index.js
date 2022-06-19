import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const register =
  ({ username, name, email, phone, password }) =>
    async (dispatch) => {
      dispatch({
        type: "set-loading",
      });

      try {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          username,
          name,
          email,
          phone,
          password,
        });
        if (res.data.success) {
          localStorage.setItem("just_token", res.data.authToken);
          // localStorage.setItem("just_profile",JSON.stringify(res.data.user));
          localStorage.removeItem("just_error");
          dispatch({
            type: "register",
            payload: {
              user: res.data.authToken,
              error: null,
            },
          });
        }

        if (res.data.error) {
          localStorage.setItem("just_error", res.data.error);
          dispatch({
            type: "register",
            payload: {
              error: res.data.error,
            },
          });
        }
      } catch (error) {
        // console.log(error.message);
        dispatch({
          type: "register",
          payload: {
            error: error.message,
          },
        });
      }
    };

export const login =
  ({ email, password }) =>
    async (dispatch) => {
      dispatch({
        type: "set-loading",
      });

      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        if (res.data.success) {
          localStorage.setItem("just_token", res.data.authToken);
          // localStorage.setItem("just_profile",JSON.stringify(res.data.user));
          toast.success("Welcome Back", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          localStorage.removeItem("just_error");
          dispatch({
            type: "login",
            payload: {
              user: res.data.authToken,
              error: null,
            },
          });
        }

        if (res.data.error) {
          localStorage.setItem("just_error", res.data.error);
          toast.error("Login Failed", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch({
            type: "login",
            payload: {
              error: res.data.error,
            },
          });
        }
      } catch (error) {
        // console.log(error.message);
        toast.error("Error with Login", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        dispatch({
          type: "login",
          payload: {
            error: error.message,
          },
        });
      }
    };

export const getProfile = () => async (dispatch) => {
  dispatch({
    type: "user-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.get("http://localhost:5000/api/auth/profile", {
      headers: { "auth-token": token },
    });
    // console.log(res.data);
    if (res.data.success) {
      localStorage.setItem("just_profile", JSON.stringify(res.data.user));
      localStorage.removeItem("just_error");
      dispatch({
        type: "profile",
        payload: {
          profile: res.data.user,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "profile",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "profile",
      payload: {
        error: error.message,
      },
    });
  }
};

export const editProfile =
  ({ username, name, email, phone, profilepic, bio }) =>
    async (dispatch) => {
      dispatch({
        type: "user-loading",
      });

      const token = localStorage.getItem("just_token");
      try {
        const res = await axios.put(
          "http://localhost:5000/api/auth/editProfile",
          { username, name, email, phone, profilepic, bio },
          { headers: { "auth-token": token } }
        );

        if (res.data.success) {
          localStorage.setItem("just_profile", JSON.stringify(res.data.user));
          localStorage.removeItem("just_error");
          dispatch({
            type: "edit-profile",
            payload: {
              profile: res.data.user,
              error: null,
            },
          });
        }

        if (res.data.error) {
          localStorage.setItem("just_error", res.data.error);
          dispatch({
            type: "edit-profile",
            payload: {
              error: res.data.error,
            },
          });
        }
      } catch (error) {
        // console.log(error.message);
        dispatch({
          type: "edit-profile",
          payload: {
            error: error.message,
          },
        });
      }
    };

export const follow = (id) => async (dispatch) => {
  // dispatch({
  //     type: "user-loading"
  // });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.put(
      `http://localhost:5000/api/auth/follow/${id}`,
      {},
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.setItem("just_profile", JSON.stringify(res.data.user));
      localStorage.removeItem("just_error");
      dispatch({
        type: "follow",
        payload: {
          profile: res.data.user,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "follow",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "follow",
      payload: {
        error: error.message,
      },
    });
  }
};

export const unfollow = (id) => async (dispatch) => {
  // dispatch({
  //     type: "user-loading"
  // });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.put(
      `http://localhost:5000/api/auth/unfollow/${id}`,
      {},
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.setItem("just_profile", JSON.stringify(res.data.user));
      localStorage.removeItem("just_error");
      dispatch({
        type: "unfollow",
        payload: {
          profile: res.data.user,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "unfollow",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "unfollow",
      payload: {
        error: error.message,
      },
    });
  }
};

export const remove = (id) => async (dispatch) => {
  // dispatch({
  //     type: "user-loading"
  // });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.put(
      `http://localhost:5000/api/auth/remove/${id}`,
      {},
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.setItem("just_profile", JSON.stringify(res.data.user));
      localStorage.removeItem("just_error");
      dispatch({
        type: "remove",
        payload: {
          profile: res.data.user,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "remove",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "remove",
      payload: {
        error: error.message,
      },
    });
  }
};

export const getSuggestion = () => async (dispatch) => {
  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.get(
      "http://localhost:5000/api/auth/getSuggestion",
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.setItem(
        "just_suggestions",
        JSON.stringify(res.data.suggestions)
      );
      localStorage.removeItem("just_error");
      dispatch({
        type: "get-suggestion",
        payload: {
          suggestions: res.data.suggestions,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "get-suggestion",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "get-suggestion",
      payload: {
        error: error.message,
      },
    });
  }
};

export const addDp = (image) => async (dispatch) => {
  dispatch({
    type: "user-loading",
  });

  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "just_connect");
  data.append("cloud_name", "alpha2625");
  const response = await axios.post("https://api.cloudinary.com/v1_1/alpha2625/image/upload", data);
  const url = response.data.secure_url;

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.put(
      "http://localhost:5000/api/auth/adddp",
      { image: url },
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.setItem("just_profile", JSON.stringify(res.data.user));
      localStorage.removeItem("just_error");
      dispatch({
        type: "add-dp",
        payload: {
          profile: res.data.user,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "add-dp",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "add-dp",
      payload: {
        error: error.message,
      },
    });
  }
};

export const searchUsers = (name) => async (dispatch) => {
  dispatch({
    type: "user-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.get(
      `http://localhost:5000/api/auth/users/${name}`,
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.removeItem("just_error");
      dispatch({
        type: "search-users",
        payload: {
          searchedUsers: res.data.users,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "search-users",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "search-users",
      payload: {
        error: error.message,
      },
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  dispatch({
    type: "user-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.get(`http://localhost:5000/api/auth/user/${id}`, {
      headers: { "auth-token": token },
    });

    if (res.data.success) {
      dispatch({
        type: "get-user",
        payload: {
          otherUser: res.data.otherUser,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "get-user",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "get-user",
      payload: {
        error: error.message,
      },
    });
  }
};

export const getOnlineUsers = (users) => async (dispatch) => {
  dispatch({
    type: "user-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.put(`http://localhost:5000/api/auth/onlineusers/`, {
      users: users
    }, {
      headers: { "auth-token": token },
    });

    if (res.data.success) {
      dispatch({
        type: "get-online-users",
        payload: {
          onlineUsers: res.data.onlineUsers,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "get-online-users",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "get-online-users",
      payload: {
        error: error.message,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: "logout",
  });
};
// ***************POST SECTION******************\\

export const getPosts = () => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.get("http://localhost:5000/api/posts/getposts", {
      headers: { "auth-token": token },
    });

    if (res.data.success) {
      localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
      localStorage.removeItem("just_error");
      dispatch({
        type: "get-posts",
        payload: {
          posts: res.data.posts,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "get-posts",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "get-posts",
      payload: {
        error: error.message,
      },
    });
  }
};

export const fetchPost = (id) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
      headers: { "auth-token": token },
    });
    // console.log(res.data);
    if (res.data.success) {
      localStorage.removeItem("just_error");
      dispatch({
        type: "fetch-post",
        payload: {
          post: res.data.post,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "fetch-post",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "fetch-post",
      payload: {
        error: error.message,
      },
    });
  }
};

export const addPost = (image, caption) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.post(
      "http://localhost:5000/api/posts/addpost",
      { image, caption },
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.setItem("just_profile", JSON.stringify(res.data.user));
      localStorage.removeItem("just_error");
      localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
      dispatch({
        type: "add-post",
        payload: {
          profile: res.data.user,
          posts: res.data.posts,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "add-post",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "add-post",
      payload: {
        error: error.message,
      },
    });
  }
};

export const updatePost =
  ({ id, image, caption }) =>
    async (dispatch) => {
      dispatch({
        type: "set-loading",
      });

      const token = localStorage.getItem("just_token");
      try {
        const res = await axios.put(
          `http://localhost:5000/api/posts/updatepost/${id}`,
          { image, caption },
          { headers: { "auth-token": token } }
        );

        if (res.data.success) {
          localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
          localStorage.removeItem("just_error");
          toast.success("Post Updated", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch({
            type: "update-post",
            payload: {
              posts: res.data.posts,
              error: null,
            },
          });
        }

        if (res.data.error) {
          localStorage.setItem("just_error", res.data.error);
          toast.error(res.data.error, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch({
            type: "update-post",
            payload: {
              error: res.data.error,
            },
          });
        }
      } catch (error) {
        // console.log(error.message);
        dispatch({
          type: "update-post",
          payload: {
            error: error.message,
          },
        });
      }
    };

export const deletePost = (id) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/posts/deletepost/${id}`,
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.setItem("just_profile", JSON.stringify(res.data.user));
      localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
      localStorage.removeItem("just_error");
      toast.success("Post Deleted", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "delete-post",
        payload: {
          profile: res.data.user,
          posts: res.data.posts,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      toast.error("Something Occured, Try Again!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "delete-post",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "delete-post",
      payload: {
        error: error.message,
      },
    });
  }
};

export const likePost = (id) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/like/${id}`,
      {},
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
      localStorage.removeItem("just_error");
      dispatch({
        type: "like-post",
        payload: {
          posts: res.data.posts,
          mypost: res.data.post,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "like-post",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "like-post",
      payload: {
        error: error.message,
      },
    });
  }
};

export const unlikePost = (id) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/unlike/${id}`,
      {},
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
      localStorage.removeItem("just_error");
      dispatch({
        type: "unlike-post",
        payload: {
          posts: res.data.posts,
          mypost: res.data.post,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "unlike-post",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "unlike-post",
      payload: {
        error: error.message,
      },
    });
  }
};

export const getComments = (id) => async (dispatch) => {
  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.get(
      `http://localhost:5000/api/comments/post/${id}`,
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.removeItem("just_error");
      dispatch({
        type: "get-comments",
        payload: {
          comments: res.data.comments,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "add-comment",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "add-comment",
      payload: {
        error: error.message,
      },
    });
  }
};

export const addComment = (id, text) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.post(
      `http://localhost:5000/api/comments/addcomment/${id}`,
      { comment: text },
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
      localStorage.removeItem("just_error");
      dispatch({
        type: "add-comment",
        payload: {
          posts: res.data.posts,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "add-comment",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "add-comment",
      payload: {
        error: error.message,
      },
    });
  }
};

// *************MESSAGE SECTION******************\\
export const getConversations = () => async (dispatch) => {
  // dispatch({
  //     type: 'msg-loading'
  // });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.get(
      "http://localhost:5000/api/message/conversations",
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      localStorage.setItem(
        "just_conversations",
        JSON.stringify(res.data.conversations)
      );
      dispatch({
        type: "get-cnvs",
        payload: {
          cnvs: res.data.conversations,
          error: null,
        },
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "get-cnvs",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "get-cnvs",
      payload: {
        error: error.message,
      },
    });
  }
};

export const getMessages = (receiverId, senderId) => async (dispatch) => {
  dispatch({
    type: "msg-loading",
  });

  const token = localStorage.getItem("just_token");
  try {
    // console.log(senderId);
    const res = await axios.get(
      `http://localhost:5000/api/message/msg/${senderId}/${receiverId}`,
      { headers: { "auth-token": token } }
    );
    if (res.data.success) {
      // console.log(res.data);
      dispatch({
        type: "get-msgs",
        payload: {
          msgs: res.data.messages,
          error: null,
        },
      });
    }

    if (res.data.error) {
      // console.log("error in getMessages");
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "get-msgs",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "get-msgs",
      payload: {
        error: error.message,
      },
    });
  }
};

export const receiveMessages = (receiverId, senderId) => async (dispatch) => {
  // dispatch({
  //     type: 'msg-loading'
  // });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.get(
      `http://localhost:5000/api/message/msg/${senderId}/${receiverId}`,
      { headers: { "auth-token": token } }
    );
    if (res.data.success) {
      // console.log(res.data);
      dispatch({
        type: "get-msgs",
        payload: {
          msgs: res.data.messages,
          error: null,
        },
      });
    }

    if (res.data.error) {
      // console.log("error in receiveMessages");
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: "get-msgs",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "get-msgs",
      payload: {
        error: error.message,
      },
    });
  }
};

export const sendMessage =
  ({ socket, text, images, receiverId, senderId }) =>
    async (dispatch) => {
      // dispatch({
      //     type: 'loading'
      // });

      const token = localStorage.getItem("just_token");
      try {
        // console.log("Sender: ",senderId);
        // console.log("Receiver: ",receiverId);
        const res = await axios.post(
          `http://localhost:5000/api/message/${senderId}/${receiverId}`,
          { text, images },
          { headers: { "auth-token": token } }
        );

        if (res.data.success) {
          socket.current.emit("sendMessage", res.data.message);
          dispatch({
            type: "send-msg",
            payload: {
              msgs: res.data.messages,
              error: null,
            },
          });
        }

        if (res.data.error) {
          localStorage.setItem("just_error", res.data.error);
          dispatch({
            type: "send-msg",
            payload: {
              error: res.data.error,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: "send-msg",
          payload: {
            error: error.message,
          },
        });
      }
    };

export const newCnv = (senderId, receiverId) => async (dispatch) => {
  dispatch({
    type: 'convo-loading'
  });

  const token = localStorage.getItem("just_token");
  try {
    const res = await axios.post(`http://localhost:5000/api/message/newcnv/${senderId}/${receiverId}`,
      {},
      { headers: { 'auth-token': token } });

    if (res.data.success) {
      localStorage.setItem("just_conversations", JSON.stringify(res.data.conversations));
      dispatch({
        type: 'new-cnv',
        payload: {
          cnv: res.data.conversations,
          msgs: res.data.messages,
          error: null
        }
      });
    }

    if (res.data.error) {
      localStorage.setItem("just_error", res.data.error);
      dispatch({
        type: 'new-cnv',
        payload: {
          error: res.data.error
        }
      });
    }

  } catch (error) {
    dispatch({
      type: 'new-cnv',
      payload: {
        error: error.message
      }
    });
  }
}
