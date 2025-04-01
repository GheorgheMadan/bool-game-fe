import { Joystick, Gamepad2, Disc } from "lucide-react";
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
export default function HomepageNav() {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const dropdownRef = useRef(null); // Riferimento al container dei dropdown

    // Aggiungi useEffect per gestire i click esterni
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setIsOpen2(false);
                setIsOpen3(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup dell'event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Array vuoto perché vogliamo che l'effect si esegua solo al mount


    function toggleDropdown() {
        setIsOpen(!isOpen)
        setIsOpen2(false);
        setIsOpen3(false);
    }
    function toggleDropdown2() {
        setIsOpen2(!isOpen2)
        setIsOpen(false);
        setIsOpen3(false);
    }
    function toggleDropdown3() {
        setIsOpen3(!isOpen3)
        setIsOpen2(false);
        setIsOpen(false);
    }
    return (
        <section className="container-nav-home">
            <div className='container-navigator-icons homepage' ref={dropdownRef}>
                <div>
                    {/* Pulsante Console */}
                    <button onClick={toggleDropdown}>
                        <Joystick size={30} /> Console
                    </button>
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