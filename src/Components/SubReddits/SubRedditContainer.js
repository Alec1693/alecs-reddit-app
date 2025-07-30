import React from "react";
import SubReddit from "./SubReddit";

export default function SubRedditContainer({ subs }){

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