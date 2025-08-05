import { useDispatch } from "react-redux"
import { updateCurrentSub } from "../../Features/subredditsSlice";

export default function SubReddit({ sub }){
    const dispatch = useDispatch();

    const handleClick = (value) => {
        //dispatch the subreddit name to the subredditSlice. We want to update the feed with the currently selected subreddit
        dispatch(updateCurrentSub(value));
    }

    return (
        <div className='sub-tile' id={sub.id}>
            <img onClick={() => handleClick(sub.name)} src={sub.icon} alt="Sub" className="subreddit-image" />
            <p onClick={() => handleClick(sub.name)}>{sub.name}</p>
        </div>
    )
}
