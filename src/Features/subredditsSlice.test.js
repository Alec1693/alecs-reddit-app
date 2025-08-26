import subredditsReducer, {loadSubredditsList, loadSubredditIcons, updateCurrentSub} from "./subredditsSlice"

describe('subredditsSlice reducer', () => {
    const initialState = {
        bySubId: {},
        isLoadingSubs: false,
        failedToLoadSubs: false,
        isLoadingIcons: false,
        failedToLoadIcons: false,
        currentSub: 'pics'
    }

    it('should return an empty state when passed an empty action', () => {
        const results = subredditsReducer(undefined, {type: ''});
        expect(results).toEqual(initialState);
    });

    it('should handle currentSub', () => {
        const action = {type: updateCurrentSub.type, payload: 'reactjs'};
        const state = subredditsReducer(initialState, action);
        expect(state.currentSub).toBe('reactjs');
    });

    it('should handle loadSubredditsList.pending', () => {
        const action = {type: loadSubredditsList.pending.type};
        const state = subredditsReducer(initialState, action);
        expect(state.isLoadingSubs).toBe(true);
        expect(state.failedToLoadSubs).toBe(false);
    });

    it('should handle loadSubredditsList.rejected', () => {
        const action = {type: loadSubredditsList.rejected.type};
        const state = subredditsReducer(initialState, action);
        expect(state.isLoadingSubs).toBe(false);
        expect(state.failedToLoadSubs).toBe(true);
    });

    it('should handle loadSubredditsList.fulfilled', () => {
        const fakePayload = [{display_name: 'Cruncyroll', name: '1234', icon_img: 'url:test'}];

        const action = {type: loadSubredditsList.fulfilled.type, payload: fakePayload};
        const state = subredditsReducer(initialState, action);

        expect(state.isLoadingSubs).toBe(false);
        expect(state.failedToLoadSubs).toBe(false);
        expect(state.bySubId).toEqual({
            '1234': {
                id: '1234',
                name: 'Cruncyroll',
                icon: 'url:test'
            }
        });
    })

    it('should handle loadSubredditIcons.pending', () => {
        const action = {type: loadSubredditIcons.pending.type};
        const state = subredditsReducer(initialState, action);
        expect(state.isLoadingIcons).toBe(true);
        expect(state.failedToLoadIcons).toBe(false);
    });

    it('should handle loadSubredditIcons.rejected', () => {
        const action = {type: loadSubredditIcons.rejected.type};
        const state = subredditsReducer(initialState, action);
        expect(state.isLoadingIcons).toBe(false);
        expect(state.failedToLoadIcons).toBe(true);
    });

    it('should handle loadSubredditIcons.fulfilled', () => {
        const fakePayload = [{icon: 'url:test', name: '1234'}];
        let filledState = {
            bySubId: {'1234': {id: '1234', name: 'Cruncyroll', icon: 'url:test'}},
            isLoadingSubs: false,
            failedToLoadSubs: false,
            isLoadingIcons: false,
            failedToLoadIcons: false,
            currentSub: 'pics'
        };

        const action = {type: loadSubredditIcons.fulfilled.type, payload: fakePayload};
        const state = subredditsReducer(filledState, action);

        expect(state.isLoadingIcons).toBe(false);
        expect(state.failedToLoadIcons).toBe(false);

        expect(state.bySubId).toEqual({
            '1234': {
                id: '1234',
                name: 'Cruncyroll',
                icon: 'url:test'
            }
        })
    })
})

describe('loadSubredditsList thunk', () => {
    it('dispatches fulfilled when API resolves', async () => {
        const mockData = [{display_name: 'Cruncyroll', name: '1234', icon_img: 'url:test'},{display_name: 'Pics', name: '5678', icon_img: 'url:testv2'}];

        global.fetch = jest.fn(() => 
            Promise.resolve({ok: true, json: () => Promise.resolve(mockData)})
        );
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({}));

        await loadSubredditsList()(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: loadSubredditsList.pending.type
        }));

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: loadSubredditsList.fulfilled.type,
            payload: mockData
        }));
    })
    it('dispatches rejected when API fails', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

        const dispatch = jest.fn();
        const getState = jest.fn(() => ({}));

        await loadSubredditsList()(dispatch,getState,undefined);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: loadSubredditsList.pending.type
        }));

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: loadSubredditsList.rejected.type,
            error: expect.any(Object)
        }))
    })
});

describe('loadSubredditIcons thunk', () => {
    it('dispatches fulfilled when API resolves', async () => {
        const mockData = [{icon:'url:test', name:'reactjs'},{icon:'url:testv2', name:'pics'}]; 

        global.fetch = jest.fn(() => 
            Promise.resolve({ok: true, json: () => Promise.resolve(mockData)})
        )
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({}))

        await loadSubredditIcons(['reactjs', 'pics'])(dispatch,getState,undefined);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: loadSubredditIcons.pending.type
        }));

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: loadSubredditIcons.fulfilled.type,
            payload: mockData
        }))
    })
})