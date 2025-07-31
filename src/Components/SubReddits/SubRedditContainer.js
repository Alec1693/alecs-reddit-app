import React from "react";
import SubReddit from "./SubReddit";
import { selectSubList } from "../../Features/subredditsSlice";
import { useSelector } from "react-redux";

export default function SubRedditContainer(){
    const subs = useSelector(selectSubList);
    const handleClick = () => {
        console.log(subs)
    }
    return (
        <button onClick={handleClick}>Click</button>
    )
    /* return (
        <ul className="subreddits-list">
            {
                Object.values(subs).map((sub) => {
                    return <SubReddit sub={sub} />
                })
            }
        </ul>
    ); */
}