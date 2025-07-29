import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadHomePageFeed, selectFeedData, isLoadingFeed, failedToLoadFeed } from "../../Features/postsSlice";

export default function PostFeed(){
    const feedData = useSelector(selectFeedData);
    const loadingFeed = useSelector(isLoadingFeed);
    const failedFeed = useSelector(failedToLoadFeed);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadHomePageFeed())
    },[dispatch])

    const handleClick = () => {
        console.log(feedData);
    }
    return (
        <div>
            <button onClick={handleClick}>Click</button>
        </div>
    )
}