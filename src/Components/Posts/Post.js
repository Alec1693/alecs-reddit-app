import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faComment } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadComments } from '../../Features/commentsSlice';

export default function Post({data}){
    const comments = useSelector((state) => state.comments.comments);
    const dispatch = useDispatch();
    const handleClick = (() => {
        const sendSub = {sub: data.sub, id: data.id}
        dispatch(loadComments(sendSub));
    })

    return (
        <div className='post-all-content'>
            <div className='post-container'>
                <div className='vote-section'>
                    <FontAwesomeIcon icon={faArrowUp} />
                    <p>{data.upVotes}</p> 
                    <FontAwesomeIcon icon={faArrowDown} />
                </div>
                <div className='post-content'>
                    <h2>{data.title}</h2>
                    <div className='post-image-container'>
                        {data.mediaType === 'image' ? <img src={data.thumbnail} alt="Post" className="post-image" /> : null}
                    </div>
                    <div className='comment-icon-container'>
                        <FontAwesomeIcon onClick={handleClick} icon={faComment} />
                        <p>{data.commentCount}</p>
                    </div>
                </div>
            </div>
            <div className='comments-container'>
                {comments[data.i] && (
                    <ul>
                        {comments[data.i].map((comment, index) => (
                            <li key={index}>Author: {comment.author} -- {comment.body}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
