import React, {useEffect} from "react";
import SubReddit from "./SubReddit";
import { loadSubredditIcons, loadSubredditsList } from "../../Features/subredditsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SubRedditContainer(){
    const subs = useSelector((state) => state.subs.selectSubList);
    const names = useSelector((state) => state.subs.subNames);
    const icons = useSelector((state) => state.subs.icons);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSubredditsList())
        dispatch(loadSubredditIcons(names))
    },[])

    if(!subs){
        return (<p>Error Loading Subs</p>)
    }
    
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