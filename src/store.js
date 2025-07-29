import { configureStore } from "@reduxjs/toolkit";
import postsSliceReducer from "./Features/postsSlice";

export default configureStore({
    reducer: {
        posts: postsSliceReducer
    }
})