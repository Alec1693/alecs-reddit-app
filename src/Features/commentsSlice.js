import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadComments = createAsyncThunk(
    'comments/loadComments',
    async(subData,thunkApi) => {
        const {sub,id} = subData;
        try{
            const response = await fetch(`http://localhost:5000/api/${sub}/comments/${id}`);

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

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: {},
        isLoadingComments: false,
        failedToLoadComments: false
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadComments.pending, (state) => {
            state.isLoadingComments = true;
            state.failedToLoadComments = false;
        })
        .addCase(loadComments.rejected, (state) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = true;
        })
        .addCase(loadComments.fulfilled, (state, action) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = false;
            const newComments = {};
            Object.entries(action.payload).forEach(([commentId, comment]) => {
                const removedPrefix = comment.data.parent_id.replace(/^t3_/, '')
                newComments[comment.data.id] = {
                    body: comment.data.body,
                    author: comment.data.author,
                    sub: removedPrefix
                }
            })
            state.comments = newComments;
        })
    }
})

export const selectComments = (state) => state.comments.comments;

export default commentsSlice.reducer;