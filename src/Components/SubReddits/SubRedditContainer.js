import React, {useEffect} from "react";
import SubReddit from "./SubReddit";
import { loadSubredditIcons, loadSubredditsList } from "../../Features/subredditsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SubRedditContainer(){
    const subs = useSelector((state) => state.subs.bySubId);
    const names = useSelector((state) => state.subs.subNames);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSubredditsList())
        dispatch(loadSubredditIcons(names))
    },[names,dispatch])

    if(!subs){
        return (<p>Error Loading Subs</p>)
    }
    
    return (
        <div>
            <p className="sub-list-title">SubReddits</p>
            <ul className="subreddits-list">
            {
                Object.values(subs).map((sub) => {
                    return <SubReddit sub={sub} />
                })
            }
        </ul>
        </div>
    );
}