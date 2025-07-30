import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadHomePageFeed, selectFeedData, isLoadingFeed, failedToLoadFeed } from "../../Features/postsSlice";

export default function PostFeed(){
    const feedData = useSelector(selectFeedData);
    const loadingFeed = useSelector(isLoadingFeed);
    const failedFeed = useSelector(failedToLoadFeed);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!loadingFeed && !failedFeed){
            dispatch(loadHomePageFeed());
        }
    },[dispatch,loadingFeed,failedFeed])

    const handleClick = () => {
        console.log(feedData);
        console.log(`Loading Feed: ${loadingFeed}  Failed Feed: ${failedFeed}`)
    }
    return (
        <div>
            <button onClick={handleClick}>Click</button>
        </div>
    )
}