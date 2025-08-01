import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSubredditsList = createAsyncThunk(
    'subreddits/loadSubreddits',
    async(_,thunkApi) => {
        try{
            const response = await fetch('http://localhost:5000/api/reddit-popular-subreddits');

            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
                
            }
            const json = await response.json();
            return json;
            
        }catch(error){
            console.error('Fetch error:', error);
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const subredditsSlice = createSlice({
    name: 'subs',
    initialState: {
        bySubId: {},
        isLoadingSubs: false,
        failedToLoadSubs: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSubredditsList.pending, (state) => {
                state.isLoadingSubs = true;
                state.failedToLoadSubs = false;
            })
            .addCase(loadSubredditsList.rejected, (state) => {
                state.isLoadingSubs = false;
                state.failedToLoadSubs = true;
            })
            .addCase(loadSubredditsList.fulfilled, (state, action) => {
                state.isLoadingSubs = false;
                state.failedToLoadSubs = false;
                //for getting sub names from api, the id of subreddit is "name", when querying the actual sub the id is "subreddit_id"
                Object.entries(action.payload).forEach(([subId, sub]) => {
                    state.bySubId[sub.name] = {
                        id: sub.name,
                        name: sub.display_name,
                        icon: sub.icon_img
                    }
                })
            })
    }
})

export const selectSubList = (state) => state.subs.bySubId;
export const isLoadingSubs = (state) => state.subs.isLoadingSubs;
export const failedToLoadSubs = (state) => state.subs.failedToLoadSubs;

export default subredditsSlice.reducer;