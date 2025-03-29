import { Joystick, Gamepad2, Disc } from "lucide-react";
import { Link } from 'react-router-dom';
import { useState } from "react";

export default function HomepageNav() {
    const [isOpen, setIsOpen] = useState({ console: false, accessori: false, giochi: false });

    // Funzione toggle generica per ogni categoria
    function toggleDropdown(category) {
        setIsOpen(prevState => ({ ...prevState, [category]: !prevState[category] }));
    }

    return (
        <section className="container-nav-home">
            <div className='container-navigator-icons'>
                {/* Pulsante Console */}
                <button onClick={() => toggleDropdown('console')}>
                    <Joystick size={30} /> Console
                </button>
                {/* Pulsante Accessori */}
                <button onClick={() => toggleDropdown('accessori')}>
                    <Gamepad2 size={30} /> Accessori
                </button>
                {/* Pulsante Giochi */}
                <button onClick={() => toggleDropdown('giochi')}>
                    <Disc size={30} /> Giochi
                </button>
            </div>

            <div className="dropdown-container">
                {/* Dropdown Console */}
                {isOpen.console && (
                    <div className="dropdown">
                        <Link to="/console/playstation">PlayStation</Link>
                        <Link to="/console/xbox">Xbox</Link>
                        <Link to="/console/nintendo">Nintendo</Link>
                    </div>
                )}
                {/* Dropdown Accessori */}
                {isOpen.accessori && (
                    <div className="dropdown">
                        <Link to="/console/playstation">PlayStation 2</Link>
                        <Link to="/console/xbox">Xbox 2</Link>
                        <Link to="/console/nintendo">Nintendo 2</Link>
                    </div>
                )}
                {/* Dropdown Giochi */}
                {isOpen.giochi && (
                    <div className="dropdown">
                        <Link to="/console/playstation">PlayStation 3</Link>
                        <Link to="/console/xbox">Xbox 3</Link>
                        <Link to="/console/nintendo">Nintendo 3</Link>
                    </div>
                )}
            </div>
        </section>
    );
}