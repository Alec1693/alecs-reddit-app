import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { setSearchTerm } from '../Features/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Searchbox(){
    const searchTerm = useSelector((state) => state.posts.searchTerm);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(setSearchTerm(e.target.value))
    }
    return (
        <div className='searchbox-container'>
            <input value={searchTerm} type="text" onChange={handleChange} placeholder="Search"></input>
            <FontAwesomeIcon icon={faSearch} />
        </div>
    )
}