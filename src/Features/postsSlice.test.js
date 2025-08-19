import postsReducer, {loadHomePageFeed, setSearchTerm} from './postsSlice';

describe('postsSlice reducer', () => {
    const initialState = {
        postById: {},
        searchTerm: "",
        isLoadingHomePageFeed: false,
        failedToLoadHomePageFeed: false
    };

    it('should retrun an empty state when passed an empty action', () => {
        expect(postsReducer(undefined, {type: ''})).toEqual(initialState);
    });

    it('should handle search term', () => {
        const action = {type: setSearchTerm.type, payload: 'reactjs'};
        const state = postsReducer(initialState, action);
        expect(state.searchTerm).toBe('reactjs')
    });

    it("should handle loadHomePageFeed.pending", () => {
    const action = { type: loadHomePageFeed.pending.type };
    const state = postsReducer(initialState, action);
    expect(state.isLoadingHomePageFeed).toBe(true);
    expect(state.failedtoLoadHomePageFeed).toBe(false);
  });

  it("should handle loadHomePageFeed.rejected", () => {
    const action = { type: loadHomePageFeed.rejected.type };
    const state = postsReducer(initialState, action);
    expect(state.isLoadingHomePageFeed).toBe(false);
    expect(state.failedtoLoadHomePageFeed).toBe(true);
  });

  it("should handle loadHomePageFeed.fulfilled", () => {
    const fakePayload = {
      "abc": {
        id: "abc",
        title: "Test Post",
        subreddit: "reactjs",
        thumbnail: "thumb.png",
        num_comments: 5,
        ups: 10,
        downs: 2,
        post_hint: "link",
        url_overridden_by_dest: "http://example.com"
      }
    };

    const action = { type: loadHomePageFeed.fulfilled.type, payload: fakePayload };
    const state = postsReducer(initialState, action);

    expect(state.isLoadingHomePageFeed).toBe(false);
    expect(state.failedtoLoadHomePageFeed).toBe(false);
    expect(state.byPostId).toEqual({
      abc: {
        id: "abc",
        title: "Test Post",
        sub: "reactjs",
        thumbnail: "thumb.png",
        commentCount: 5,
        upVotes: 10,
        downVotes: 2,
        mediaType: "link",
        url_overridden_by_dest: "http://example.com"
      }
    });
  });
})