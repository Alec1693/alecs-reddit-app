import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Searchbox(){
    return (
        <div>
            <input type="text" placeholder="Search"></input>
            <FontAwesomeIcon icon={faSearch} />
        </div>
    )
}