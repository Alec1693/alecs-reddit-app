import { useDispatch } from "react-redux"

export default function SubReddit({ sub }){
    const dipatch = useDispatch();

    const handleClick = (value) => {
        //dispatch the subreddit name to the subredditSlice. We want to update the feed with the currently selected subreddit
    }

    return (
        <div className='sub-tile' id={sub.id}>
            <img src={sub.icon} alt="Sub" className="subreddit-image" />
            <p>{sub.name}</p>
        </div>
    )
}