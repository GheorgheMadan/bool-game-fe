import '../style/HeaderStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faHome } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { NavLink } from 'react-router';


export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false)
    // funzione per aprire la search bar 
    function toggleSearch() {
        setIsOpen(!isOpen);
    }


    return (
        <>
            <div className='container-nav'>
                <div className='logo'>Next Level Shop</div>
                <div className='container-link'>
                    <NavLink to='/' className='icon'><FontAwesomeIcon icon={faHome} /></NavLink>
                    <NavLink to='/playstation' className='icon'><FontAwesomeIcon icon={faPlaystation} /></NavLink>
                    <NavLink to='/xbox' className='icon'><FontAwesomeIcon icon={faXbox} /></NavLink>
                    <NavLink to='/nintendo' className='icon'>Nintendo</NavLink>
                </div>
                <div className='container-icons'>
                    <div className={`container-search ${isOpen ? 'open' : ''}`}>
                        <input type="text" placeholder='Cerca...' />
                        <button onClick={toggleSearch}>
                            <FontAwesomeIcon icon={faSearch} className='icon' />
                        </button>
                    </div>
                    <div>
                        <NavLink to='/cart'>
                            <FontAwesomeIcon icon={faShoppingCart} className='icon' />
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}