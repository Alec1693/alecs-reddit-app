export default function SubReddit({ sub }){
    const { id, name, icon } = sub;

    return (
        <div id={id}>
            <img src={icon} alt="Sub" className="subreddit-image" />
            <p>{name}</p>
        </div>
    )
}