import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faComment } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loadComments } from '../../Features/commentsSlice';

export default function Post({data}){
    const comments = useSelector((state) => state.comments.comments);
    const [showComments, setShowComments] = useState(false);
    const dispatch = useDispatch();
    const toggleComments = () => {
        setShowComments(prev => !prev)
    }
    const handleClick = (() => {
        //this needs to change a useState var to toggle comments view
        toggleComments()
        console.log(comments)
    })

    const test = () => {
        console.log(comments[data.id].length)
    }

/*     if(showComments){
        const tempC = comments[data.i]
        console.log(tempC)
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
                <ul>
                    {comments[data.i].map((comment, index) => (
                        <li key={index}>Author: {comment.author} -- {comment.body}</li>
                    ))}
                </ul>
            </div>
            <button onClick={test}>Here</button>
        </div>
        )
    }
 */
    return (
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
    )
}
