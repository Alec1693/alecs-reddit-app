import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { setSearchTerm } from '../Features/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Searchbox(){
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.posts.searchTerm);
    const handleClick = (term) => {
        dispatch(searchTerm(term))
    }
    return (
        <div>
            <input value={searchTerm} type="text" onChange={handleClick} placeholder="Search"></input>
            <FontAwesomeIcon icon={faSearch} />
        </div>
    )
}