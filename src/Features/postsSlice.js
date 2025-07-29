import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadHomePageFeed = createAsyncThunk(
    'posts/loadHomePageFeed',
    async() => {
        const response = await fetch('https://www.reddit.com/top.json');
        const json = await response.json();
        return json;
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        byPostId: null,
        isLoadingHomePageFeed: false,
        faileDtoLoadHomePageFeed: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadHomePageFeed.pending, (state) => {
                state.isLoadingHomePageFeed = true;
                state.faileDtoLoadHomePageFeed = false;
            })
            .addCase(loadHomePageFeed.rejected, (state) => {
                state.isLoadingHomePageFeed = false;
                state.faileDtoLoadHomePageFeed = true;
            })
            .addCase(loadHomePageFeed.fulfilled, (state, action) => {
                state.isLoadingHomePageFeed = false;
                state.faileDtoLoadHomePageFeed = false;
                state.byPostId = action.payload;
                console.log(state.byPostId);
            })
    }
})

export const postFeedData = (state) => state.posts.byPostId;

export default postsSlice.reducer;