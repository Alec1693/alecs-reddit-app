import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faComment } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Post({data}){
    const comments = useSelector((state) => state.comments.comments);
    const [showComments, setShowComments] = useState(false);
    const toggleComments = () => {
        setShowComments(prev => !prev)
    }
    const handleClick = (() => {
        //this needs to change a useState var to toggle comments view
        toggleComments()
    })


    return (
             <div>
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
                {showComments &&
                <div className='comments-container'>
                    <ul>
                        {comments[data.id]?.map((comment, index) => (
                            <li key={index}>Author: {comment.data.author} -- {comment.data.body}</li>
                        ))}
                    </ul>
                </div>
                }
            </div>
    )
}
