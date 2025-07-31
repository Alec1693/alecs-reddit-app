import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faComment } from '@fortawesome/free-solid-svg-icons';

export default function Post({data}){
    return (
        <div className='post-container'>
            <div className='vote-section'>
                <FontAwesomeIcon icon={faArrowUp} />
                <p>{data.commenetCount}</p> 
                <FontAwesomeIcon icon={faArrowDown} />
            </div>
            <div className='post-content'>
                <h2>{data.title}</h2>
                <img src={data.thumbnail} alt="Post" className="post-image" />
                <FontAwesomeIcon icon={faComment} />
            </div>
        </div>
    )
}
//vote count <span>{post.votes}</span>
/*
 <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        {post.image && (
          <img src={post.image} alt="Post" className="post-image" />
        )}
        <button className="comment-button">💬 {post.comments} Comments</button>
      </div>
*/