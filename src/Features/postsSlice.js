import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadComments } from "./commentsSlice";

export const loadHomePageFeed = createAsyncThunk(
    'posts/loadHomePageFeed',
    async(subreddit, {dispatch}) => {
        try{
            const response = await fetch(`http://localhost:5000/api/${subreddit}`);

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
        }
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        byPostId: {},
        searchTerm: '',
        isLoadingHomePageFeed: false,
        failedtoLoadHomePageFeed: false
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
                state.failedtoLoadHomePageFeed = false;
            })
            .addCase(loadHomePageFeed.rejected, (state) => {
                state.isLoadingHomePageFeed = false;
                state.failedtoLoadHomePageFeed = true;
            })
            .addCase(loadHomePageFeed.fulfilled, (state, action) => {
                state.isLoadingHomePageFeed = false;
                state.failedtoLoadHomePageFeed = false;
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
export const failedToLoadFeed = (state) => state.posts.failedtoLoadHomePageFeed;
export const {setSearchTerm} = postsSlice.actions;

export default postsSlice.reducer;