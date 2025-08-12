import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* export const loadComments = createAsyncThunk(
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
) */

export const loadComments = createAsyncThunk(
    'comments/loadComments',
    async(subData,thunkApi) => {
        try{
            const commentsData = await Promise.all(
                subData.map(async ({id,sub}) => {
                    const res = await fetch(`http://localhost:5000/api/${sub}/comments/${id}`);
                    if(!res.ok) throw new Error(`Failed to fetch ${id}`);
                    const json = await res.json();
                    return json
            })
        )
        return commentsData
            
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
            const tempComments = {}
            for (let i = 0; i < action.payload.length; i++) {
                let tempList = [];
                for (let j = 0; j < action.payload[i].length; j++) {
                    tempList.push(action.payload[i][j])
                }
                tempComments[i] = tempList;
            }
            state.comments = tempComments;
/*             const tempArray = [];
            let postId = null;
            Object.entries(action.payload).forEach(([commentId, comment]) => {
                const removedPrefix = comment.data.parent_id.replace(/^t3_/, '')
                tempArray.push({id: comment.data.id, body: comment.data.body, author: comment.data.author})
                if(!postId){
                    postId = removedPrefix
                }
            })
            state.comments[postId] = tempArray; */
        })
    }
})

export const selectComments = (state) => state.comments.comments;

export default commentsSlice.reducer;