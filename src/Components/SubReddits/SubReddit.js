import { useDispatch, useSelector } from "react-redux"
import { updateCurrentSub,currentSub } from "../../Features/subredditsSlice";

export default function SubReddit({ sub }){
    const dispatch = useDispatch();
    const current = useSelector(currentSub);

    const handleClick = (value) => {
        //dispatch the subreddit name to the subredditSlice. We want to update the feed with the currently selected subreddit
        dispatch(updateCurrentSub(value))
        console.log(current)
    }

    return (
        <div className='sub-tile' id={sub.id}>
            <img onClick={() => handleClick(sub.name)} src={sub.icon} alt="Sub" className="subreddit-image" />
            <p onClick={() => handleClick(sub.name)}>{sub.name}</p>
        </div>
    )
}
