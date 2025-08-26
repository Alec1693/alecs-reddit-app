import React, {useEffect} from "react";
import SubReddit from "./SubReddit";
import { loadSubredditIcons, loadSubredditsList } from "../../Features/subredditsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SubRedditContainer(){
    const subs = useSelector((state) => state.subs.bySubId);    
    
    const getNames = (obj) => {
        let nList = [];
        Object.values(obj).forEach(value => {
            nList.push(value.name);
        })
        return nList
    }


    const names = getNames(subs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSubredditsList())
        dispatch(loadSubredditIcons(names))
    },[dispatch, names])

    if(Object.entries(subs).length <= 0){
        return (
            <div>
                <h3>Subreddits</h3>
                <p>Error Loading Subs</p>
            </div>
        )
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