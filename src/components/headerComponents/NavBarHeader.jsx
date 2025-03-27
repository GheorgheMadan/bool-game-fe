import '../../style/HeaderStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router';
import { BsNintendoSwitch } from "react-icons/bs";
import SearchBar from './SearchBar';

export default function NavBarHeader() {


    return (
        <>
            <div className='container-nav'>
                <div className='logo'>Next Level Shop</div>
                <div className='container-link'>
                    <NavLink to='/' className='icon home'><FontAwesomeIcon icon={faHome} /></NavLink>
                    <NavLink to='/playstation' className='icon playstation'><FontAwesomeIcon icon={faPlaystation} /></NavLink>
                    <NavLink to='/xbox' className='icon xbox'><FontAwesomeIcon icon={faXbox} /></NavLink>
                    <NavLink to='/nintendo' className='icon nintendo'>
                        <BsNintendoSwitch />
                    </NavLink>
                </div>
                <SearchBar />
            </div>
        </>
    )
}