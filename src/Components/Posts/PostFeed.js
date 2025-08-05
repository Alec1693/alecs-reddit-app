import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadHomePageFeed, selectFeedData } from "../../Features/postsSlice";
import Post from "./Post";
import { currentSub } from "../../Features/subredditsSlice";

export default function PostFeed(){
    const feedData = useSelector(selectFeedData);
    const dispatch = useDispatch();
    const sub = useSelector(currentSub);

    useEffect(() => {
        if(sub){
            dispatch(loadHomePageFeed());
        }
    },[dispatch,sub])

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

/*
useEffect(() => {
  if (Object.keys(byPostId).length === 0 && !loadingFeed && !failedFeed) {
    dispatch(loadHomePageFeed());
  }
}, [dispatch, byPostId, loadingFeed, failedFeed]);
*/