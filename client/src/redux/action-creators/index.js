import axios from 'axios';

export const register = ({username,name,email,phone,password})=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });

    try {
        const res = await axios.post("http://localhost:5000/api/auth/register", {username,name,email,phone,password});
        if(res.data.success) {
            localStorage.setItem("just_token",res.data.authToken);
            // localStorage.setItem("just_profile",JSON.stringify(res.data.user));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'register',
                payload: {
                    user: res.data.authToken,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'register',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'register',
            payload: {
                error: error.message
            }
        });
    }
}

export const login = ({email,password})=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });

    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {email,password});

        if(res.data.success) {
            localStorage.setItem("just_token",res.data.authToken);
            // localStorage.setItem("just_profile",JSON.stringify(res.data.user));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'login',
                payload: {
                    user: res.data.authToken,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'login',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'register',
            payload: {
                error: error.message
            }
        });
    }
}

export const getProfile = ()=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });

    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {headers: {"auth-token": token}});
        // console.log(res.data);
        if(res.data.success) {
            localStorage.setItem("just_profile",JSON.stringify(res.data.user));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'profile',
                payload: {
                    profile: res.data.user,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'profile',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'profile',
            payload: {
                error: error.message
            }
        });
    }
}

export const editProfile = ({username,name,email,phone,profilePic})=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });

    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.put("http://localhost:5000/api/auth/editProfile", {username,name,email,phone,profilePic} , {headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_profile",JSON.stringify(res.data.user));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'edit-profile',
                payload: {
                    profile: res.data.user,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'edit-profile',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'edit-profile',
            payload: {
                error: error.message
            }
        });
    }
}

export const follow = (adduser)=> async(dispatch)=> {
    // dispatch({
    //     type: "set-loading"
    // });

    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.put("http://localhost:5000/api/auth/follow", {adduser} , {headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_profile",JSON.stringify(res.data.savedUser));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'follow',
                payload: {
                    profile: res.data.savedUser,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'follow',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'follow',
            payload: {
                error: error.message
            }
        });
    }
}

export const unfollow = (removeuser)=> async(dispatch)=> {
    // dispatch({
    //     type: "set-loading"
    // });

    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.put("http://localhost:5000/api/auth/unfollow", {removeuser} , {headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_profile",JSON.stringify(res.data.savedUser));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'unfollow',
                payload: {
                    profile: res.data.savedUser,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'unfollow',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'unfollow',
            payload: {
                error: error.message
            }
        });
    }
}

export const getSuggestion = ()=> async(dispatch)=> {
    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.get("http://localhost:5000/api/auth/getSuggestion", {headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_suggestions",JSON.stringify(res.data.suggestedUsers));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'get-suggestion',
                payload: {
                    suggestedUsers: res.data.suggestedUsers,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'get-suggestion',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'get-suggestion',
            payload: {
                error: error.message
            }
        });
    }
}

export const addDp = (image)=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });

    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.put("http://localhost:5000/api/auth/adddp", {image} , {headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_profile",JSON.stringify(res.data.savedUser));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'add-dp',
                payload: {
                    profile: res.data.savedUser,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'add-dp',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'add-dp',
            payload: {
                error: error.message
            }
        });
    }
}

export const searchUsers = (username)=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });
    
    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.get(`http://localhost:5000/api/auth/users/${username}`, {headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.removeItem("just_error");
            dispatch({
                type: 'search-users',
                payload: {
                    searchedUsers: res.data.users,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'search-users',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'search-users',
            payload: {
                error: error.message
            }
        });
    }
}

// ***************POST SECTION******************\\

export const getPosts = ()=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });
    
    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.get("http://localhost:5000/api/posts/getposts", {headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'get-posts',
                payload: {
                    posts: res.data.posts,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'get-posts',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'get-posts',
            payload: {
                error: error.message
            }
        });
    }
}

export const logout = ()=> async(dispatch)=> {
    localStorage.clear();
    dispatch({
        type: "logout"
    });
    
}

export const fetchPost = (id)=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });
    
    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {headers: {"auth-token": token}});
        // console.log(res.data);
        if(res.data.success) {
            localStorage.removeItem("just_error");
            dispatch({
                type: 'fetch-post',
                payload: {
                    post: res.data.post,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'fetch-post',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'fetch-post',
            payload: {
                error: error.message
            }
        });
    }
}

export const addPost = (image,caption)=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });
    
    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.post("http://localhost:5000/api/posts/addpost", {image,caption} , {headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_profile", JSON.stringify(res.data.user));
            localStorage.removeItem("just_error");
            localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
            dispatch({
                type: 'add-post',
                payload: {
                    profile: res.data.user,
                    posts: res.data.posts,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'add-post',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'add-post',
            payload: {
                error: error.message
            }
        });
    }
}

export const updatePost = ({id,image,caption})=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });
    
    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/updatepost/${id}`, {image,caption} , {headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'update-post',
                payload: {
                    posts: res.data.posts,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'update-post',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'update-post',
            payload: {
                error: error.message
            }
        });
    }
}

export const deletePost = (id)=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });
    
    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.delete(`http://localhost:5000/api/posts/deletepost/${id}`,{headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_profile", JSON.stringify(res.data.user));
            localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'delete-post',
                payload: {
                    profile: res.data.user,
                    posts: res.data.posts,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'delete-post',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'delete-post',
            payload: {
                error: error.message
            }
        });
    }
}

export const likePost = (id)=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });
    
    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/like/${id}`, {} ,{headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'like-post',
                payload: {
                    posts: res.data.posts,
                    mypost: res.data.post,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'like-post',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'like-post',
            payload: {
                error: error.message
            }
        });
    }
}

export const unlikePost = (id)=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });
    
    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/unlike/${id}`, {} ,{headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'unlike-post',
                payload: {
                    posts: res.data.posts,
                    mypost: res.data.post,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'unlike-post',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'unlike-post',
            payload: {
                error: error.message
            }
        });
    }
}

export const addComment = (id,text)=> async(dispatch)=> {
    dispatch({
        type: "set-loading"
    });
    
    const token = localStorage.getItem("just_token");
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/comment/${id}`, {text: text} ,{headers: {"auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("just_posts", JSON.stringify(res.data.posts));
            localStorage.removeItem("just_error");
            dispatch({
                type: 'add-comment',
                payload: {
                    posts: res.data.posts,
                    mypost: res.data.post,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("just_error",res.data.error);
            dispatch({
                type: 'add-comment',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: 'add-comment',
            payload: {
                error: error.message
            }
        });
    }
}