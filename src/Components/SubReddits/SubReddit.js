export default function SubReddit({ sub }){

    return (
        <div className='sub-tile' id={sub.id}>
            <img src={sub.icon} alt="Sub" className="subreddit-image" />
            <p>{sub.name}</p>
        </div>
    )
}