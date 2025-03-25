import '../style/HeaderStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
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
                <div className='logo'>
                    Next Level Shop
                </div>
                <div className='container-icons'>
                    <div className={isOpen && 'container-search'}>
                        {isOpen && <input type="text" placeholder='Cerca...' />}
                        <button onClick={toggleSearch}><FontAwesomeIcon icon={faSearch} className='icon' /></button>

                    </div>
                    <div className='font-container'>
                        <NavLink to='/cart'><FontAwesomeIcon icon={faShoppingCart} className='icon' /></NavLink>
                        <span>Carrello</span>
                    </div>
                </div>
            </div>
        </>
    )
}