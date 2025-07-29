import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadHomePageFeed = createAsyncThunk(
    'posts/loadHomePageFeed',
    async(_,thunkApi) => {
        try{
            const response = await fetch('http://localhost:3000/api/reddit-top');

            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
                
            }
            const json = await response.json();
            const posts = json.data.children.map((child) => child.data);
            return posts;
            
        }catch(error){
            console.error('Fetch error:', error);
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        byPostId: null,
        isLoadingHomePageFeed: false,
        failedtoLoadHomePageFeed: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadHomePageFeed.pending, (state) => {
                state.isLoadingHomePageFeed = true;
                state.failedtoLoadHomePageFeed = false;
            })
            .addCase(loadHomePageFeed.rejected, (state) => {
                state.isLoadingHomePageFeed = false;
                state.failedtoLoadHomePageFeed = true;
            })
            .addCase(loadHomePageFeed.fulfilled, (state, action) => {
                state.isLoadingHomePageFeed = false;
                state.failedtoLoadHomePageFeed = false;
                state.byPostId = action.payload;
                console.log(action.payload);
            })
    }
})

export const selectFeedData = (state) => state.posts.byPostId;
export const isLoadingFeed = (state) => state.posts.isLoadingHomePageFeed;
export const failedToLoadFeed = (state) => state.posts.failedtoLoadHomePageFeed;

export default postsSlice.reducer;