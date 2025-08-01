import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadHomePageFeed, selectFeedData } from "../../Features/postsSlice";
import Post from "./Post";

export default function PostFeed(){
    const feedData = useSelector(selectFeedData);
    const dispatch = useDispatch();

    useEffect(() => {
        if(Object.keys(feedData).length === 0){
            dispatch(loadHomePageFeed());
        }
    },[])

    return (
        <div>
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