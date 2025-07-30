import { configureStore } from "@reduxjs/toolkit";
import postsSliceReducer from "./Features/postsSlice";
import subredditsSliceReducer from "./Features/subredditsSlice"

export default configureStore({
    reducer: {
        posts: postsSliceReducer,
        subs: subredditsSliceReducer
    }
})