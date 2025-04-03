import '../../style/HeaderStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons';
import { BsNintendoSwitch } from "react-icons/bs";
import SearchBar from './SearchBar';
import { Link, NavLink } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";
import { useState } from 'react';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function NavBarHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const [openDropdown1, setOpenDropdown1] = useState(null);
    const [openDropdown2, setOpenDropdown2] = useState(null);
    const [openDropdown3, setOpenDropdown3] = useState(null);

    function toggleMenu() {
        setIsOpen(!isOpen)
    }
    function dropdown1() {
        setOpenDropdown1(!openDropdown1)
        setOpenDropdown2(false)
        setOpenDropdown3(false)
    }
    function dropdown2() {
        setOpenDropdown2(!openDropdown2)
        setOpenDropdown1(false)
        setOpenDropdown3(false)
    }
    function dropdown3() {
        setOpenDropdown3(!openDropdown3)
        setOpenDropdown1(false)
        setOpenDropdown2(false)
    }
    return (
        <>
            <div className='container-nav'>
                <div className='logo'>
                    <FaBars className='burger-icon' onClick={toggleMenu} />
                    <Link to='/'>
                        <div className='img-logo-container'>
                            <img className='img-logo-header' src="/next_level_shop.gif" />
                        </div>
                    </Link>
                </div>
                <div className='container-link'>
                    <NavLink to='/' className='icon home' >
                        <FontAwesomeIcon icon={faHome} />
                    </NavLink>
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
                <div className={`container-b-menu ${isOpen ? 'open' : 'close'}`} onClick={() => setIsOpen(false)}>
                    <div className='home-m'>
                        <NavLink to='/'>
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                        </NavLink>
                    </div>
                    <div onClick={(event) => event.stopPropagation()}>
                        <div onClick={dropdown1} className='container-items-b-menu'>
                            <div className='playstation-m'>
                                <FontAwesomeIcon icon={faPlaystation} className='menu-icon' />
                                <span>PlayStation</span>
                            </div>
                            <FontAwesomeIcon icon={openDropdown1 ? faChevronUp : faChevronDown} />
                        </div>
                        {openDropdown1 && (
                            <div className='dropdown-content'>
                                <NavLink to='/playstation' onClick={() => setIsOpen(false)}>Playstation</NavLink>
                                <NavLink to='/playstation/consoles' onClick={() => setIsOpen(false)}>Console</NavLink>
                                <NavLink to='/playstation/accessories' onClick={() => setIsOpen(false)}>Accessori</NavLink>
                                <NavLink to='/playstation/games' onClick={() => setIsOpen(false)}>Giochi</NavLink>
                            </div>
                        )}
                    </div>
                    <div onClick={(event) => event.stopPropagation()}>
                        <div onClick={dropdown2} className='container-items-b-menu'>
                            <div className='xbox-m'>
                                <FontAwesomeIcon icon={faXbox} className='menu-icon' />
                                <span>Xbox</span>
                            </div>
                            <FontAwesomeIcon icon={openDropdown2 ? faChevronUp : faChevronDown} />
                        </div>
                        {openDropdown2 && (
                            <div className='dropdown-content'>
                                <NavLink to='/xbox' onClick={() => setIsOpen(false)}>Xbox</NavLink>
                                <NavLink to='/xbox/console' onClick={() => setIsOpen(false)}>Console</NavLink>
                                <NavLink to='/xbox/accessories' onClick={() => setIsOpen(false)}>Accessori</NavLink>
                                <NavLink to='/xbox/games' onClick={() => setIsOpen(false)}>Giochi</NavLink>
                            </div>
                        )}
                    </div>
                    <div onClick={(event) => event.stopPropagation()} >
                        <div onClick={dropdown3} className='container-items-b-menu'>
                            <div className='nintendo-m'>
                                <BsNintendoSwitch className='menu-icon' />
                                <span>Nintendo</span>
                            </div>
                            <FontAwesomeIcon icon={openDropdown3 ? faChevronUp : faChevronDown} />
                        </div>
                        {openDropdown3 && (
                            <div className='dropdown-content'>
                                <NavLink to='/nintendo' onClick={() => setIsOpen(false)}>Nintendo</NavLink>
                                <NavLink to='/nintendo/consoles' onClick={() => setIsOpen(false)}>Console</NavLink>
                                <NavLink to='/nintendo/accessories' onClick={() => setIsOpen(false)}>Accessori</NavLink>
                                <NavLink to='/nintendo/games' onClick={() => setIsOpen(false)}>Giochi</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            }
            {/*  */}
        </>
    )
}