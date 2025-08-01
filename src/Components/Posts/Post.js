import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faComment } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

export default function Post({data}){
    return (
        <div className='post-container'>
            <div className='vote-section'>
                <FontAwesomeIcon icon={faArrowUp} />
                <p>{data.upVotes}</p> 
                <FontAwesomeIcon icon={faArrowDown} />
            </div>
            <div className='post-content'>
                <h2>{data.title}</h2>
                {data.mediaType === 'image' ? <img src={data.thumbnail} alt="Post" className="post-image" /> : null}
                <FontAwesomeIcon icon={faComment} />
                <p>{data.commentCount}</p>
            </div>
        </div>
    )
}