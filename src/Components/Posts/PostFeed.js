import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadHomePageFeed  } from "../../Features/postsSlice";
import Post from "./Post";
import { loadComments } from "../../Features/commentsSlice";

function filterObjectBySearch(searchTerm, postsObject){
    const postsArray = Object.values(postsObject);
    if(searchTerm === ''){
        return postsArray;
    }
    return postsArray.filter(post => post.title.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
}

const getIds = (obj) => {
    let idList = [];
    Object.values(obj).forEach(sub => {
        idList.push({id: sub.id, sub: sub.sub})
    })
    return idList
}


export default function PostFeed(){
    const term = useSelector((state) => state.posts.searchTerm);
    const feedData = useSelector((state) => state.posts.byPostId);
    const dispatch = useDispatch();
    const sub = useSelector((state) => state.subs.currentSub);
    const postFeed = filterObjectBySearch(term, feedData);
    const comments = useSelector((state) => state.comments.comments);

    useEffect(() => {
        dispatch(loadHomePageFeed(sub));
    },[dispatch,sub])

/*     useEffect(() => {
        if(JSON.stringify(feedData) !== JSON.stringify(prevFeedData)){
            setPrevFeedData(feedData)
            const postIds = getIds(feedData);
            console.log(postIds)
            dispatch(loadComments(postIds));
            console.log(comments)
        }
    },[dispatch,feedData]) */

    if(!postFeed){
        return (
            <div className="post-feed-container">
                <p>Loading Reddit Feed</p>
            </div>
        )
    }

    return (
        <div className="post-feed-container">
            <ul>
                {postFeed.map(post => 
                    <li key={post.id}>
                        <Post id={post.id} data={post}/>
                    </li>
                )}
            </ul>
        </div>
    )
}