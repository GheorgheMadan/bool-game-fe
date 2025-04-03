import { Joystick, Gamepad2, Disc } from "lucide-react";
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
export default function HomepageNav() {

    // Stati per gestire l'apertura dei menu a tendina
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    // Riferimento al container dei dropdown per gestire il click esterno
    const dropdownRef = useRef(null);


    // useEffect per gestire il click esterno per chiudere i dropdown
    useEffect(() => {
        // Funzione per rilevare il click esterno al container del dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Chiude tutti i dropdown se il click è esterno
                setIsOpen(false);
                setIsOpen2(false);
                setIsOpen3(false);
            }
        };
        // Aggiunge l'event listener per il click del mouse
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup dell'event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Array vuoto perché vogliamo che l'effect si esegua solo al mount

    // Funzione per alternare l'apertura del primo dropdown (Console)
    function toggleDropdown() {
        setIsOpen(!isOpen)  // Cambia lo stato del dropdown Console
        setIsOpen2(false);
        setIsOpen3(false);
    }
    // Funzione per alternare l'apertura del secondo dropdown (Accessori)
    function toggleDropdown2() {
        setIsOpen2(!isOpen2)  // Cambia lo stato del dropdown Accessori
        setIsOpen(false);
        setIsOpen3(false);
    }
    // Funzione per alternare l'apertura del terzo dropdown (Giochi)
    function toggleDropdown3() {
        setIsOpen3(!isOpen3)  // Cambia lo stato del dropdown Giochi   
        setIsOpen2(false);
        setIsOpen(false);
    }
    return (

        <section className="container-nav-home">
            {/* Container principale per i pulsanti di navigazione */}
            <div className='container-navigator-icons homepage' ref={dropdownRef}>
                <div>
                    {/* Pulsante Console */}
                    <button onClick={toggleDropdown}>
                        <Joystick size={30} /> Console
                    </button>
                    {/* Condizione per mostrare il menu a tendina della Console */}
                    {isOpen && (
                        <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                            <li className="dropdown-item1"><Link to='/xbox/console'>Xbox console</Link></li>
                            <li className="dropdown-item1"><Link to='/playstation/consoles'>PlayStation console</Link></li>
                            <li className="dropdown-item1"><Link to='/nintendo/consoles'>Nintendo Console</Link></li>
                        </ul>
                    )}
                </div>
                <div>
                    {/* Pulsante Accessori */}
                    <button onClick={() => toggleDropdown2()}>
                        <Gamepad2 size={30} /> Accessori
                    </button>
                    {/* Condizione per mostrare il menu a tendina degli Accessori */}
                    {isOpen2 && (
                        <ul className={`dropdown-menu ${isOpen2 ? 'show' : ''}`}>
                            <li className="dropdown-item1"><Link to='/xbox/accessories'>Accessori Xbox</Link></li>
                            <li className="dropdown-item1"><Link to='/playstation/accessories'>Accessori PlayStation</Link></li>
                            <li className="dropdown-item1"><Link to='/nintendo/accessories'>Accessori Nintendo</Link></li>
                        </ul>
                    )}
                </div>
                <div>
                    {/* Pulsante Giochi */}
                    <button onClick={() => toggleDropdown3()}>
                        <Disc size={30} /> Giochi
                    </button>
                    {/* Condizione per mostrare il menu a tendina dei Giochi */}
                    {isOpen3 && (
                        <ul className={`dropdown-menu ${isOpen3 ? 'show' : ''}`}>
                            <li className="dropdown-item1"><Link to='/xbox/games'>Giochi Xbox</Link></li>
                            <li className="dropdown-item1"><Link to='/playstation/games'>Giochi PlayStation</Link></li>
                            <li className="dropdown-item1"><Link to='/nintendo/games'>Giochi Nintendo</Link></li>
                        </ul>
                    )}
                </div>
            </div>

        </section>
    );
}