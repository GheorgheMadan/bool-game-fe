import '../../style/HeaderStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router';
import { BsNintendoSwitch } from "react-icons/bs";
import SearchBar from './SearchBar';
import { Link } from 'react-router';
import { FaBars } from "react-icons/fa6";
import { useState } from 'react';


export default function NavBarHeader() {
    const [isOpen, setIsOpen] = useState(false)

    function toggleMenu() {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div className='container-nav'>
                <div className='logo'>
                    <FaBars className='burger-icon' onClick={toggleMenu} />
                    <Link to='/'><div className='img-logo-container'><img className='img-logo-header' src="/next_level_shop.gif" /></div></Link>                </div>
                <div className='container-link'>
                    <NavLink to='/' className='icon home' >
                        <FontAwesomeIcon icon={faHome} /></NavLink>
                    <NavLink to='/playstation' className='icon playstation'>
                        <FontAwesomeIcon icon={faPlaystation} />
                    </NavLink>
                    <NavLink to='/xbox' className='icon xbox'>
                        <FontAwesomeIcon icon={faXbox} />
                    </NavLink>
                    <NavLink to='/nintendo' className='icon nintendo'>
                        <BsNintendoSwitch />
                    </NavLink>
                </div>
                <SearchBar />
            </div>
            {
                isOpen &&
                <div className={`container-b-menu ${isOpen ? 'open' : 'close'}`} onClick={toggleMenu}>
                    <NavLink to='/' className='icon home' onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faHome} />
                        <span>Home</span>
                    </NavLink>
                    <NavLink to='/playstation' className='icon playstation' onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faPlaystation} />
                        <span>PlayStation</span>
                    </NavLink>
                    <NavLink to='/xbox' className='icon xbox' onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faXbox} />
                        <span>Xbox</span>
                    </NavLink>
                    <NavLink to='/nintendo' className='icon nintendo' onClick={() => setIsOpen(false)}  >
                        <BsNintendoSwitch />
                        <span>Nintendo</span>
                    </NavLink>
                </div>
            }

        </>
    )
}