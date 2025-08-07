import { useDispatch } from "react-redux"
import { updateCurrentSub } from "../../Features/subredditsSlice";

export default function SubReddit({ sub }){
    const dispatch = useDispatch();

    const handleClick = (value) => {
        //dispatch the subreddit name to the subredditSlice. We want to update the feed with the currently selected subreddit
        dispatch(updateCurrentSub(value));
    }

    if(sub.icon === ''){
        return (<div className='sub-tile' id={sub.id}>
            <img onClick={() => handleClick(sub.name)} src={'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'} alt="Sub" className="subreddit-image" />
            <p onClick={() => handleClick(sub.name)}>{sub.name}</p>
        </div>)
    }

    return (
        <div className='sub-tile' id={sub.id}>
            <img onClick={() => handleClick(sub.name)} src={sub.icon} alt="Sub" className="subreddit-image" />
            <p onClick={() => handleClick(sub.name)}>{sub.name}</p>
        </div>
    )
}
