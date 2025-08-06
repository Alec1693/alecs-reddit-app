import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadHomePageFeed  } from "../../Features/postsSlice";
import Post from "./Post";

export default function PostFeed(){
    const feedData = useSelector((state) => state.posts.byPostId);
    const dispatch = useDispatch();
    const sub = useSelector((state) => state.subs.currentSub);
    const searchTerm = useSelector((state) => state.posts.searchTerm);

    const filteredPosts = Object.values(feedData).filter((post) => 
        post.title.toLowerCase//current hold up
    )

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
                {Object.entries(feedData).map(([key, value]) => (
                    <Post id={key} data={value}/>
                ))}
            </ul>
        </div>
    )
}