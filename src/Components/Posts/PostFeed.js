import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadHomePageFeed  } from "../../Features/postsSlice";
import Post from "./Post";
import Comment from "../Comments/Comment";

function filterObjectBySearch(searchTerm, postsObject){
    const postsArray = Object.values(postsObject);
    if(searchTerm === ''){
        return postsArray;
    }
    return postsArray.filter(post => post.title.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
}

export default function PostFeed(){
    const comments = useSelector((state) => state.comments.comments)
    const term = useSelector((state) => state.posts.searchTerm);
    const feedData = useSelector((state) => state.posts.byPostId);
    const dispatch = useDispatch();
    const sub = useSelector((state) => state.subs.currentSub);
    const postFeed = filterObjectBySearch(term, feedData)

    useEffect(() => {
        if(sub){
            dispatch(loadHomePageFeed(sub));
        }
    },[dispatch,sub])

    if(!feedData){
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

                        {comments[post.id] && (
                            <ul>
                                {Object.entries(comments).forEach(([id, comment]) => {
                                <Comment data={comment}/>}
                            )}
                            </ul>
                        )}
                    </li>
                )}
            </ul>
        </div>
    )
}