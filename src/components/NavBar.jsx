import '../style/HeaderStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function NavBar() {

    // setto lo stato del componente EditMovieForm a false per non renderizzarlo all'avvio della pagina
    const [isOpen, setIsOpen] = useState(false)

    // funzione per aprire il componente EditMovieForm
    function openMenu() {
        setIsOpen(true)
    }
    // funzione per chiudere il componente EditMovieForm
    function closeMenu() {
        setIsOpen(false)
    }

    return (
        <>
            <div className='container-nav'>
                <div>
                    <FontAwesomeIcon icon={faBars} onClick={openMenu} className='burger-menu' />
                    logo
                </div>
                <div>
                    <input type="text" />
                    <button>Cerca</button>
                </div>
            </div>
            {isOpen &&
                <div>
                    <FontAwesomeIcon icon={faBars} onClick={closeMenu} className='burger-menu' />
                    <span>sezione playstation</span>
                </div>}
        </>
    )
}