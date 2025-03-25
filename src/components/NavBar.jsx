import '../style/HeaderStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
export default function NavBar() {
    return (
        <>
            <div>
                <div>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div>
                    logo
                </div>
                <div>
                    <SearchBar />
                </div>

            </div>
        </>
    )
}