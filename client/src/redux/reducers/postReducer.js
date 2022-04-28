let isPosts;
let isError;

if (localStorage.getItem("just_posts") === null) {
    isPosts = [];
} else {
    isPosts = JSON.parse(localStorage.getItem("just_posts"));
}

if (localStorage.getItem("just_error") === null) {
    isError = null;
} else {
    isError = JSON.parse(localStorage.getItem("just_error"));
}

const initState = {
    posts: isPosts,
    mypost: [],
    error: isError,
    isLoading: false
}

const postReducer = (state=initState,action)=> {

    if(action.type === "set-loading") {
        return {
            ...state,
            isLoading: true
        }
    }

    else if(action.type === "get-posts") {
        const {posts,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                posts: posts,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === "add-post") {
        const {mypost,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    mypost
                ],
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === "update-post") {
        const {posts,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                posts: posts,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === "delete-post") {
        const {posts,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                posts: posts,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === "like-post") {
        const {posts,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                posts: posts,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === "unlike-post") {
        const {posts,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                posts: posts,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === "add-comment") {
        const {posts,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                posts: posts,
                isLoading: false,
                error: null
            }
        }
    }

    else {
        return state;
    }

}

export default postReducer;