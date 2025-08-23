import commentsReducer, {loadComments} from './commentsSlice';

describe('commentsSlice reducer', () => {
    const initialState = {
        comments: {},
        isLoadingComments: false,
        failedToLoadComments: false
    };

    it('should return an empty state when passed an empty action', () => {
        const results = commentsReducer(undefined, {type: ''});
        expect(results).toEqual(initialState);
    });

    it('should handle loadComments.pending', () => {
        const action = {type: loadComments.pending.type};
        const state = commentsReducer(initialState, action);
        expect(state.isLoadingComments).toBe(true);
        expect(state.failedToLoadComments).toBe(false);
    })

    it('should handle loadComments.rejected', () => {
        const action = {type: loadComments.rejected.type};
        const state = commentsReducer(initialState, action);
        expect(state.isLoadingComments).toBe(false);
        expect(state.failedToLoadComments).toBe(true);
    })
    //what does the shape of the data sent to the comments slice look like?
    it('should handle loadComments.fulfilled',() => {
        const fakePayload = [[]]
    })
})