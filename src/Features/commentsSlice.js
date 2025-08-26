import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadComments = createAsyncThunk(
    'comments/loadComments',
    async(subData,thunkApi) => {
        try{
            const commentsData = await Promise.all(
                subData.map(async ({id,sub}) => {
                    const res = await fetch(`https://www.reddit.com/r/${sub}/comments/${id}.json?limit=5`);
                    if(!res.ok){
                        console.warn(`Failed to fetch comments ${id}`)
                        return [];
                    } 
                    const json = await res.json();
                    return json;
/*                     const commentsArray = json[1]?.data?.children || [];
                    const safeComments = commentsArray.filter(c => c?.data)
                    return safeComments; */
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
                    if(action.payload[i][j].kind !== 'more'){
                        tempList.push(action.payload[i][j])
                    }
                }
                let id = ''
                if(action.payload[i][0]){
                    id = action.payload[i][0].data.parent_id.replace(/^t3_/,'');
                }
                if(id){
                    tempComments[id] = tempList;
                }
                else{
                    tempComments[i] = tempList
                }
            }
            state.comments = tempComments;
        })
    }
})

export const selectComments = (state) => state.comments.comments;

export default commentsSlice.reducer;


