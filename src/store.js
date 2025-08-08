import { configureStore } from "@reduxjs/toolkit";
import postsSliceReducer from "./Features/postsSlice";
import subredditsSliceReducer from "./Features/subredditsSlice";
import commentsSliceReducer from "./Features/commentsSlice";

export default configureStore({
    reducer: {
        posts: postsSliceReducer,
        subs: subredditsSliceReducer,
        comments: commentsSliceReducer
    }
})