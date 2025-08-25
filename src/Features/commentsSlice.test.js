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
    });

    it('should handle loadComments.rejected', () => {
        const action = {type: loadComments.rejected.type};
        const state = commentsReducer(initialState, action);
        expect(state.isLoadingComments).toBe(false);
        expect(state.failedToLoadComments).toBe(true);
    });
    //what does the shape of the data sent to the comments slice look like?
    it('should handle loadComments.fulfilled',() => {
        const fakePayload = [[{kind: 't1', data: {id: 1, parent_id: 't3_123', content: 'Hello world'}},{kind: 't1', data: {id: 2, parent_id: 't3_123', content: 'Me Again!'}}],[{kind: 't1', data: {id: 3, parent_id: 't3_456', content: 'Hello world, Vol. 2'}},{kind: 't1', data: {id: 4, parent_id: 't3_456',content: 'Me Again! vol 2'}}]]
        const action = { type: loadComments.fulfilled.type, payload: fakePayload};
        const state = commentsReducer(initialState, action);

        expect(state.isLoadingComments).toBe(false);
        expect(state.failedToLoadComments).toBe(false);
        expect(state.comments).toEqual({
            "123": [{kind: 't1', data: {id: 1, parent_id: 't3_123', content: 'Hello world'}},{kind: 't1', data: {id: 2, parent_id: 't3_123', content: 'Me Again!'}}],
            "456": [{kind: 't1', data: {id: 3, parent_id: 't3_456', content: 'Hello world, Vol. 2'}},{kind: 't1', data: {id: 4, parent_id: 't3_456',content: 'Me Again! vol 2'}}]
        });
    });
});

describe('loadComments thunk', () => {
    it('dispatchces fulfilled when API resolves', async () => {
        const mockData = [{id: '123', sub: 'pics'}]

        global.fetch = jest.fn(() => 
            Promise.resolve({ok: true, json: () => Promise.resolve(mockData)})
        );
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({}));

        await loadComments([{id: '123', sub: 'pics'}])(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: loadComments.pending.type
        }));

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: loadComments.fulfilled.type,
            payload: [mockData]
        }))
    })
})
