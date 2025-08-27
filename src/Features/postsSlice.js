import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadComments } from "./commentsSlice";

export const loadHomePageFeed = createAsyncThunk(
    'posts/loadHomePageFeed',
    async(subreddit, {dispatch, getState}) => {
        try{
            const response = await fetch(`/.netlify/functions/fetch-subreddit?subreddit=${subreddit}`)

            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
                
            }
            const json = await response.json();
            const postIds = [];
            Object.values(json).forEach(post => {
                postIds.push({id: post.id, sub: post.subreddit})
            })

            if(postIds.length > 0){
                await dispatch(loadComments(postIds))
            }

            return json;
            
        }catch(error){
            console.error('Fetch error:', error);
            throw error;
        }
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        byPostId: {},
        searchTerm: '',
        isLoadingHomePageFeed: false,
        failedToLoadHomePageFeed: false
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadHomePageFeed.pending, (state) => {
                state.isLoadingHomePageFeed = true;
                state.failedToLoadHomePageFeed = false;
            })
            .addCase(loadHomePageFeed.rejected, (state) => {
                state.isLoadingHomePageFeed = false;
                state.failedToLoadHomePageFeed = true;
            })
            .addCase(loadHomePageFeed.fulfilled, (state, action) => {
                state.isLoadingHomePageFeed = false;
                state.failedToLoadHomePageFeed = false;
                const newPostId = {};
                Object.entries(action.payload).forEach(([postId, post]) => {
                    newPostId[post.id] = {
                        id: post.id,
                        title: post.title,
                        sub: post.subreddit,
                        thumbnail: post.thumbnail,
                        commentCount: post.num_comments,
                        upVotes: post.ups,
                        downVotes: post.downs,
                        mediaType: post.post_hint,
                        url_overridden_by_dest: post.url_overridden_by_dest
                    }
                })
                state.byPostId = newPostId;
                //map through payload object and assign id: id, title: title, thumbnail: thumbnail, commentCount: num_comments, upVotes: ups, downVotes: downs
            })
    }
})

export const selectFeedData = (state) => state.posts.byPostId;
export const isLoadingFeed = (state) => state.posts.isLoadingHomePageFeed;
export const failedToLoadFeed = (state) => state.posts.failedToLoadHomePageFeed;
export const {setSearchTerm} = postsSlice.actions;

export default postsSlice.reducer;