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

export const loadSubredditIcons = createAsyncThunk(
    'subreddits/loadSubredditIcons',
    async(subNames,thunkApi) => {
        try{
            const iconData = await Promise.all(
                subNames.map(async (name) => {
                    const res = await fetch(`https://www.reddit.com/r/${name}/about.json`);
                    if (!res.ok) throw new Error(`Failed to fetch ${name}`);
                    const json = await res.json();
                    const { icon_img, community_icon } = json.data;
                    const rawIcon = community_icon || icon_img || '';
                    const icon = rawIcon.split('?')[0].replace(/&amp;/g, '&') || null;
                    return { name, icon}
                })
            );
            return iconData;
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
        failedToLoadSubs: false,
        isLoadingIcons: false,
        failedToLoadIcons: false,
        currentSub: 'pics'
    },
    reducers: {
        updateCurrentSub: (state, action) => {
            if(action.payload){
                state.currentSub = action.payload;
            }
        }
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
                const newSubId = {};
                //for getting sub names from api, the id of subreddit is "name", when querying the actual sub the id is "subreddit_id"
                Object.entries(action.payload).forEach(([subId, sub]) => {
                    newSubId[sub.name] = {
                        id: sub.name,
                        name: sub.display_name,
                        icon: sub.icon_img
                    }
                })
                state.bySubId = newSubId;
            })
            .addCase(loadSubredditIcons.pending, (state) => {
                state.isLoadingIcons = true;
                state.failedToLoadIcons = false;
            })
            .addCase(loadSubredditIcons.rejected, (state) => {
                state.isLoadingIcons = false;
                state.failedToLoadIcons = true;
            })
            .addCase(loadSubredditIcons.fulfilled, (state, action) => {
                state.isLoadingIcons = false;
                state.failedToLoadIcons = false;
                action.payload.forEach(({name, icon}) => {
                    if(state.bySubId[name]){
                        state.bySubId[name].icon = icon
                    }
                });
            }) 
            
    }
})

export const selectSubList = (state) => state.subs.bySubId;
export const isLoadingSubs = (state) => state.subs.isLoadingSubs;
export const failedToLoadSubs = (state) => state.subs.failedToLoadSubs;
export const {updateCurrentSub} = subredditsSlice.actions;
export const currentSub = (state) => state.subs.currentSub;

export default subredditsSlice.reducer;