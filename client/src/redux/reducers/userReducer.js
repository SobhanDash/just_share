let isUser;
let isProfile;
let isError;
let isSuggestions;

if (localStorage.getItem("just_token") === null) {
  isUser = null;
} else {
  isUser = localStorage.getItem("just_token");
}

if (localStorage.getItem("just_profile") === null) {
  isProfile = [];
} else {
  isProfile = JSON.parse(localStorage.getItem("just_profile"));
}

if (localStorage.getItem("just_error") === null) {
  isError = null;
} else {
  isError = localStorage.getItem("just_token");
}

if (localStorage.getItem("just_suggestions") === null) {
  isSuggestions = [];
} else {
  isSuggestions = JSON.parse(localStorage.getItem("just_suggestions"));
}

const initState = {
  user: isUser,
  profile: isProfile,
  isLoading: false,
  error: isError,
  suggestions: isSuggestions,
  otherUser: null,
  searchedUsers: [],
};

const userReducer = (state = initState, action) => {
  if (action.type === "user-loading") {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === "register") {
    const { user, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        user: user,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "login") {
    const { user, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        user: user,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "profile") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "edit-profile") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "follow") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "unfollow") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "remove") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "get-suggestion") {
    const { suggestions, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        suggestions: suggestions,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "add-dp") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "search-users") {
    const { searchedUsers, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        searchedUsers: searchedUsers,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "add-post") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "delete-post") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "get-user") {
    const { otherUser, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        otherUser: otherUser,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "logout") {
    return {
      ...state,
      user: null,
      profile: [],
      suggestions: [],
      isLoading: false,
      error: null,
    };
  } else {
    return state;
  }
};

export default userReducer;
