import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadHomePageFeed, selectFeedData, isLoadingFeed, failedToLoadFeed } from "../../Features/postsSlice";
import Post from "./Post";

export default function PostFeed(){
    const feedData = useSelector(selectFeedData);
    const loadingFeed = useSelector(isLoadingFeed);
    const failedFeed = useSelector(failedToLoadFeed);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadHomePageFeed());
    },[])

    const handleClick = () => {
        console.log(feedData);
        console.log(`Loading Feed: ${loadingFeed}  Failed Feed: ${failedFeed}`)
    }
    return (
        <div>
            <ul>
                {Object.entries(feedData).map(([key, value]) => (
                    <Post id={key} data={value}/>
                ))}
            </ul>
            <button onClick={handleClick}>Click</button>
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