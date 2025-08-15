import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadHomePageFeed  } from "../../Features/postsSlice";
import Post from "./Post";

function filterObjectBySearch(searchTerm, postsObject){
    const postsArray = Object.values(postsObject);
    if(searchTerm === ''){
        return postsArray;
    }
    return postsArray.filter(post => post.title.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
}

export default function PostFeed(){
    const term = useSelector((state) => state.posts.searchTerm);
    const feedData = useSelector((state) => state.posts.byPostId);
    const dispatch = useDispatch();
    const sub = useSelector((state) => state.subs.currentSub);
    const postFeed = filterObjectBySearch(term, feedData);

    useEffect(() => {
        dispatch(loadHomePageFeed(sub));
    },[dispatch,sub])

    if(postFeed && Object.entries(postFeed).length > 0){
        return (
            <div className="post-feed-container">
                <ul>
                    {postFeed && Object.entries(postFeed).length > 0 && postFeed.map(post => 
                        <li key={post.id}>
                            <Post id={post.id} data={post}/>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
    
    return (
        <div className="post-feed-container">
                <p>Loading Reddit Feed</p>
        </div>
    )
}