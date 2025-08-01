import React, {useEffect} from "react";
import SubReddit from "./SubReddit";
import { loadSubredditsList, selectSubList } from "../../Features/subredditsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SubRedditContainer(){
    const subs = useSelector(selectSubList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSubredditsList())
    },[])
    
    return (
        <ul className="subreddits-list">
            {
                Object.values(subs).map((sub) => {
                    return <SubReddit sub={sub} />
                })
            }
        </ul>
    );
}