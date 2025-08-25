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
        const fakePayload = [[{
        "kind": "t1",
        "data": {
            "subreddit_id": "t5_2qh0u",
            "approved_at_utc": null,
            "author_is_blocked": false,
            "comment_type": null,
            "awarders": [],
            "mod_reason_by": null,
            "banned_by": null,
            "author_flair_type": "text",
            "total_awards_received": 0,
            "subreddit": "pics",
            "author_flair_template_id": null,
            "likes": null,
            "replies": {
                "kind": "Listing",
                "data": {
                    "after": null,
                    "dist": null,
                    "modhash": "",
                    "geo_filter": "",
                    "children": [
                        {
                            "kind": "t1",
                            "data": {
                                "subreddit_id": "t5_2qh0u",
                                "approved_at_utc": null,
                                "author_is_blocked": false,
                                "comment_type": null,
                                "awarders": [],
                                "mod_reason_by": null,
                                "banned_by": null,
                                "author_flair_type": "text",
                                "total_awards_received": 0,
                                "subreddit": "pics",
                                "author_flair_template_id": null,
                                "likes": null,
                                "replies": {
                                    "kind": "Listing",
                                    "data": {
                                        "after": null,
                                        "dist": null,
                                        "modhash": "",
                                        "geo_filter": "",
                                        "children": [
                                            {
                                                "kind": "t1",
                                                "data": {
                                                    "subreddit_id": "t5_2qh0u",
                                                    "approved_at_utc": null,
                                                    "author_is_blocked": false,
                                                    "comment_type": null,
                                                    "awarders": [],
                                                    "mod_reason_by": null,
                                                    "banned_by": null,
                                                    "author_flair_type": "text",
                                                    "total_awards_received": 0,
                                                    "subreddit": "pics",
                                                    "author_flair_template_id": null,
                                                    "likes": null,
                                                    "replies": {
                                                        "kind": "Listing",
                                                        "data": {
                                                            "after": null,
                                                            "dist": null,
                                                            "modhash": "",
                                                            "geo_filter": "",
                                                            "children": [
                                                                {
                                                                    "kind": "more",
                                                                    "data": {
                                                                        "count": 1,
                                                                        "name": "t1_nafx5u4",
                                                                        "id": "nafx5u4",
                                                                        "parent_id": "t1_naeul1l",
                                                                        "depth": 3,
                                                                        "children": [
                                                                            "nafx5u4"
                                                                        ]
                                                                    }
                                                                }
                                                            ],
                                                            "before": null
                                                        }
                                                    },
                                                    "user_reports": [],
                                                    "saved": false,
                                                    "id": "naeul1l",
                                                    "banned_at_utc": null,
                                                    "mod_reason_title": null,
                                                    "gilded": 0,
                                                    "archived": false,
                                                    "collapsed_reason_code": null,
                                                    "no_follow": false,
                                                    "author": "mallchin",
                                                    "can_mod_post": false,
                                                    "send_replies": true,
                                                    "parent_id": "t1_naed8qw",
                                                    "score": 1,
                                                    "author_fullname": "t2_73cqq",
                                                    "removal_reason": null,
                                                    "approved_by": null,
                                                    "mod_note": null,
                                                    "all_awardings": [],
                                                    "body": "They take up loads of room but are tiny inside.  Boiling a kettle takes ages.  Running them all year round is costly and good luck knowing what temperature it is inside.",
                                                    "edited": false,
                                                    "top_awarded_type": null,
                                                    "downs": 0,
                                                    "author_flair_css_class": null,
                                                    "name": "t1_naeul1l",
                                                    "is_submitter": false,
                                                    "collapsed": false,
                                                    "author_flair_richtext": [],
                                                    "author_patreon_flair": false,
                                                    "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;They take up loads of room but are tiny inside.  Boiling a kettle takes ages.  Running them all year round is costly and good luck knowing what temperature it is inside.&lt;/p&gt;\n&lt;/div&gt;",
                                                    "gildings": {},
                                                    "collapsed_reason": null,
                                                    "distinguished": null,
                                                    "associated_award": null,
                                                    "stickied": false,
                                                    "author_premium": false,
                                                    "can_gild": false,
                                                    "link_id": "t3_1mysx5g",
                                                    "unrepliable_reason": null,
                                                    "author_flair_text_color": null,
                                                    "score_hidden": true,
                                                    "permalink": "/r/pics/comments/1mysx5g/the_best_roast_dinners_are_made_in_an_aga_oc/naeul1l/",
                                                    "subreddit_type": "public",
                                                    "locked": false,
                                                    "report_reasons": null,
                                                    "created": 1756043227,
                                                    "author_flair_text": null,
                                                    "treatment_tags": [],
                                                    "created_utc": 1756043227,
                                                    "subreddit_name_prefixed": "r/pics",
                                                    "controversiality": 0,
                                                    "depth": 2,
                                                    "author_flair_background_color": null,
                                                    "collapsed_because_crowd_control": null,
                                                    "mod_reports": [],
                                                    "num_reports": null,
                                                    "ups": 1
                                                }
                                            },
                                            {
                                                "kind": "more",
                                                "data": {
                                                    "count": 4,
                                                    "name": "t1_naeeerf",
                                                    "id": "naeeerf",
                                                    "parent_id": "t1_naed8qw",
                                                    "depth": 2,
                                                    "children": [
                                                        "naeeerf",
                                                        "nag6bdl"
                                                    ]
                                                }
                                            }
                                        ],
                                        "before": null
                                    }
                                },
                                "user_reports": [],
                                "saved": false,
                                "id": "naed8qw",
                                "banned_at_utc": null,
                                "mod_reason_title": null,
                                "gilded": 0,
                                "archived": false,
                                "collapsed_reason_code": null,
                                "no_follow": false,
                                "author": "gingerbreadman42",
                                "can_mod_post": false,
                                "created_utc": 1756036284,
                                "send_replies": true,
                                "parent_id": "t1_naea3ta",
                                "score": 11,
                                "author_fullname": "t2_3zri7",
                                "removal_reason": null,
                                "approved_by": null,
                                "mod_note": null,
                                "all_awardings": [],
                                "body": "Why does it suck?",
                                "edited": false,
                                "top_awarded_type": null,
                                "author_flair_css_class": null,
                                "name": "t1_naed8qw",
                                "is_submitter": false,
                                "downs": 0,
                                "author_flair_richtext": [],
                                "author_patreon_flair": false,
                                "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;Why does it suck?&lt;/p&gt;\n&lt;/div&gt;",
                                "gildings": {},
                                "collapsed_reason": null,
                                "distinguished": null,
                                "associated_award": null,
                                "stickied": false,
                                "author_premium": false,
                                "can_gild": false,
                                "link_id": "t3_1mysx5g",
                                "unrepliable_reason": null,
                                "author_flair_text_color": null,
                                "score_hidden": false,
                                "permalink": "/r/pics/comments/1mysx5g/the_best_roast_dinners_are_made_in_an_aga_oc/naed8qw/",
                                "subreddit_type": "public",
                                "locked": false,
                                "report_reasons": null,
                                "created": 1756036284,
                                "author_flair_text": null,
                                "treatment_tags": [],
                                "collapsed": false,
                                "subreddit_name_prefixed": "r/pics",
                                "controversiality": 0,
                                "depth": 1,
                                "author_flair_background_color": null,
                                "collapsed_because_crowd_control": null,
                                "mod_reports": [],
                                "num_reports": null,
                                "ups": 11
                            }
                        },
                        {
                            "kind": "more",
                            "data": {
                                "count": 1,
                                "name": "t1_naee3u5",
                                "id": "naee3u5",
                                "parent_id": "t1_naea3ta",
                                "depth": 1,
                                "children": [
                                    "naee3u5"
                                ]
                            }
                        }
                    ],
                    "before": null
                }
            },
            "user_reports": [],
            "saved": false,
            "id": "naea3ta",
            "banned_at_utc": null,
            "mod_reason_title": null,
            "gilded": 0,
            "archived": false,
            "collapsed_reason_code": null,
            "no_follow": false,
            "author": "AlmanzoWilder",
            "can_mod_post": false,
            "created_utc": 1756034746,
            "send_replies": true,
            "parent_id": "t3_1mysx5g",
            "score": 50,
            "author_fullname": "t2_ycz7s",
            "approved_by": null,
            "mod_note": null,
            "all_awardings": [],
            "collapsed": false,
            "body": "I got an AGA.  Looks great but it sucks big time.",
            "edited": false,
            "top_awarded_type": null,
            "author_flair_css_class": null,
            "name": "t1_naea3ta",
            "is_submitter": false,
            "downs": 0,
            "author_flair_richtext": [],
            "author_patreon_flair": false,
            "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;I got an AGA.  Looks great but it sucks big time.&lt;/p&gt;\n&lt;/div&gt;",
            "removal_reason": null,
            "collapsed_reason": null,
            "distinguished": null,
            "associated_award": null,
            "stickied": false,
            "author_premium": false,
            "can_gild": false,
            "gildings": {},
            "unrepliable_reason": null,
            "author_flair_text_color": null,
            "score_hidden": false,
            "permalink": "/r/pics/comments/1mysx5g/the_best_roast_dinners_are_made_in_an_aga_oc/naea3ta/",
            "subreddit_type": "public",
            "locked": false,
            "report_reasons": null,
            "created": 1756034746,
            "author_flair_text": null,
            "treatment_tags": [],
            "link_id": "t3_1mysx5g",
            "subreddit_name_prefixed": "r/pics",
            "controversiality": 0,
            "depth": 0,
            "author_flair_background_color": null,
            "collapsed_because_crowd_control": null,
            "mod_reports": [],
            "num_reports": null,
            "ups": 50
        }
    }]]

    const action = { type: loadComments.fulfilled.type, payload: fakePayload};
    const state = commentsReducer(initialState, action);

    expect(state.isLoadingComments).toBe(false);
    expect(state.failedToLoadComments).toBe(false);
    expect(state.comments).toEqual({"1mzbu8p": [{
        "kind": "t1",
        "data": {
            "subreddit_id": "t5_2qh0u",
            "approved_at_utc": null,
            "author_is_blocked": false,
            "comment_type": null,
            "awarders": [],
            "mod_reason_by": null,
            "banned_by": null,
            "author_flair_type": "text",
            "total_awards_received": 0,
            "subreddit": "pics",
            "author_flair_template_id": null,
            "likes": null,
            "replies": {
                "kind": "Listing",
                "data": {
                    "after": null,
                    "dist": null,
                    "modhash": "",
                    "geo_filter": "",
                    "children": [
                        {
                            "kind": "t1",
                            "data": {
                                "subreddit_id": "t5_2qh0u",
                                "approved_at_utc": null,
                                "author_is_blocked": false,
                                "comment_type": null,
                                "awarders": [],
                                "mod_reason_by": null,
                                "banned_by": null,
                                "author_flair_type": "text",
                                "total_awards_received": 0,
                                "subreddit": "pics",
                                "author_flair_template_id": null,
                                "likes": null,
                                "replies": {
                                    "kind": "Listing",
                                    "data": {
                                        "after": null,
                                        "dist": null,
                                        "modhash": "",
                                        "geo_filter": "",
                                        "children": [
                                            {
                                                "kind": "t1",
                                                "data": {
                                                    "subreddit_id": "t5_2qh0u",
                                                    "approved_at_utc": null,
                                                    "author_is_blocked": false,
                                                    "comment_type": null,
                                                    "awarders": [],
                                                    "mod_reason_by": null,
                                                    "banned_by": null,
                                                    "author_flair_type": "text",
                                                    "total_awards_received": 0,
                                                    "subreddit": "pics",
                                                    "author_flair_template_id": null,
                                                    "likes": null,
                                                    "replies": {
                                                        "kind": "Listing",
                                                        "data": {
                                                            "after": null,
                                                            "dist": null,
                                                            "modhash": "",
                                                            "geo_filter": "",
                                                            "children": [
                                                                {
                                                                    "kind": "more",
                                                                    "data": {
                                                                        "count": 1,
                                                                        "name": "t1_nafx5u4",
                                                                        "id": "nafx5u4",
                                                                        "parent_id": "t1_naeul1l",
                                                                        "depth": 3,
                                                                        "children": [
                                                                            "nafx5u4"
                                                                        ]
                                                                    }
                                                                }
                                                            ],
                                                            "before": null
                                                        }
                                                    },
                                                    "user_reports": [],
                                                    "saved": false,
                                                    "id": "naeul1l",
                                                    "banned_at_utc": null,
                                                    "mod_reason_title": null,
                                                    "gilded": 0,
                                                    "archived": false,
                                                    "collapsed_reason_code": null,
                                                    "no_follow": false,
                                                    "author": "mallchin",
                                                    "can_mod_post": false,
                                                    "send_replies": true,
                                                    "parent_id": "t1_naed8qw",
                                                    "score": 1,
                                                    "author_fullname": "t2_73cqq",
                                                    "removal_reason": null,
                                                    "approved_by": null,
                                                    "mod_note": null,
                                                    "all_awardings": [],
                                                    "body": "They take up loads of room but are tiny inside.  Boiling a kettle takes ages.  Running them all year round is costly and good luck knowing what temperature it is inside.",
                                                    "edited": false,
                                                    "top_awarded_type": null,
                                                    "downs": 0,
                                                    "author_flair_css_class": null,
                                                    "name": "t1_naeul1l",
                                                    "is_submitter": false,
                                                    "collapsed": false,
                                                    "author_flair_richtext": [],
                                                    "author_patreon_flair": false,
                                                    "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;They take up loads of room but are tiny inside.  Boiling a kettle takes ages.  Running them all year round is costly and good luck knowing what temperature it is inside.&lt;/p&gt;\n&lt;/div&gt;",
                                                    "gildings": {},
                                                    "collapsed_reason": null,
                                                    "distinguished": null,
                                                    "associated_award": null,
                                                    "stickied": false,
                                                    "author_premium": false,
                                                    "can_gild": false,
                                                    "link_id": "t3_1mysx5g",
                                                    "unrepliable_reason": null,
                                                    "author_flair_text_color": null,
                                                    "score_hidden": true,
                                                    "permalink": "/r/pics/comments/1mysx5g/the_best_roast_dinners_are_made_in_an_aga_oc/naeul1l/",
                                                    "subreddit_type": "public",
                                                    "locked": false,
                                                    "report_reasons": null,
                                                    "created": 1756043227,
                                                    "author_flair_text": null,
                                                    "treatment_tags": [],
                                                    "created_utc": 1756043227,
                                                    "subreddit_name_prefixed": "r/pics",
                                                    "controversiality": 0,
                                                    "depth": 2,
                                                    "author_flair_background_color": null,
                                                    "collapsed_because_crowd_control": null,
                                                    "mod_reports": [],
                                                    "num_reports": null,
                                                    "ups": 1
                                                }
                                            },
                                            {
                                                "kind": "more",
                                                "data": {
                                                    "count": 4,
                                                    "name": "t1_naeeerf",
                                                    "id": "naeeerf",
                                                    "parent_id": "t1_naed8qw",
                                                    "depth": 2,
                                                    "children": [
                                                        "naeeerf",
                                                        "nag6bdl"
                                                    ]
                                                }
                                            }
                                        ],
                                        "before": null
                                    }
                                },
                                "user_reports": [],
                                "saved": false,
                                "id": "naed8qw",
                                "banned_at_utc": null,
                                "mod_reason_title": null,
                                "gilded": 0,
                                "archived": false,
                                "collapsed_reason_code": null,
                                "no_follow": false,
                                "author": "gingerbreadman42",
                                "can_mod_post": false,
                                "created_utc": 1756036284,
                                "send_replies": true,
                                "parent_id": "t1_naea3ta",
                                "score": 11,
                                "author_fullname": "t2_3zri7",
                                "removal_reason": null,
                                "approved_by": null,
                                "mod_note": null,
                                "all_awardings": [],
                                "body": "Why does it suck?",
                                "edited": false,
                                "top_awarded_type": null,
                                "author_flair_css_class": null,
                                "name": "t1_naed8qw",
                                "is_submitter": false,
                                "downs": 0,
                                "author_flair_richtext": [],
                                "author_patreon_flair": false,
                                "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;Why does it suck?&lt;/p&gt;\n&lt;/div&gt;",
                                "gildings": {},
                                "collapsed_reason": null,
                                "distinguished": null,
                                "associated_award": null,
                                "stickied": false,
                                "author_premium": false,
                                "can_gild": false,
                                "link_id": "t3_1mysx5g",
                                "unrepliable_reason": null,
                                "author_flair_text_color": null,
                                "score_hidden": false,
                                "permalink": "/r/pics/comments/1mysx5g/the_best_roast_dinners_are_made_in_an_aga_oc/naed8qw/",
                                "subreddit_type": "public",
                                "locked": false,
                                "report_reasons": null,
                                "created": 1756036284,
                                "author_flair_text": null,
                                "treatment_tags": [],
                                "collapsed": false,
                                "subreddit_name_prefixed": "r/pics",
                                "controversiality": 0,
                                "depth": 1,
                                "author_flair_background_color": null,
                                "collapsed_because_crowd_control": null,
                                "mod_reports": [],
                                "num_reports": null,
                                "ups": 11
                            }
                        },
                        {
                            "kind": "more",
                            "data": {
                                "count": 1,
                                "name": "t1_naee3u5",
                                "id": "naee3u5",
                                "parent_id": "t1_naea3ta",
                                "depth": 1,
                                "children": [
                                    "naee3u5"
                                ]
                            }
                        }
                    ],
                    "before": null
                }
            },
            "user_reports": [],
            "saved": false,
            "id": "naea3ta",
            "banned_at_utc": null,
            "mod_reason_title": null,
            "gilded": 0,
            "archived": false,
            "collapsed_reason_code": null,
            "no_follow": false,
            "author": "AlmanzoWilder",
            "can_mod_post": false,
            "created_utc": 1756034746,
            "send_replies": true,
            "parent_id": "t3_1mysx5g",
            "score": 50,
            "author_fullname": "t2_ycz7s",
            "approved_by": null,
            "mod_note": null,
            "all_awardings": [],
            "collapsed": false,
            "body": "I got an AGA.  Looks great but it sucks big time.",
            "edited": false,
            "top_awarded_type": null,
            "author_flair_css_class": null,
            "name": "t1_naea3ta",
            "is_submitter": false,
            "downs": 0,
            "author_flair_richtext": [],
            "author_patreon_flair": false,
            "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;I got an AGA.  Looks great but it sucks big time.&lt;/p&gt;\n&lt;/div&gt;",
            "removal_reason": null,
            "collapsed_reason": null,
            "distinguished": null,
            "associated_award": null,
            "stickied": false,
            "author_premium": false,
            "can_gild": false,
            "gildings": {},
            "unrepliable_reason": null,
            "author_flair_text_color": null,
            "score_hidden": false,
            "permalink": "/r/pics/comments/1mysx5g/the_best_roast_dinners_are_made_in_an_aga_oc/naea3ta/",
            "subreddit_type": "public",
            "locked": false,
            "report_reasons": null,
            "created": 1756034746,
            "author_flair_text": null,
            "treatment_tags": [],
            "link_id": "t3_1mysx5g",
            "subreddit_name_prefixed": "r/pics",
            "controversiality": 0,
            "depth": 0,
            "author_flair_background_color": null,
            "collapsed_because_crowd_control": null,
            "mod_reports": [],
            "num_reports": null,
            "ups": 50
        }
    }]});
    })
})