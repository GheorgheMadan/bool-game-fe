import { Joystick, Gamepad2, Disc } from "lucide-react";
import { Link } from 'react-router-dom';
import { useState } from "react";
export default function HomepageNav() {

    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen)
    }
    return (
        <section className="container-nav-home">
            <div className='container-navigator-icons'>
                <div>
                    {/* Pulsante Console */}
                    <button onClick={toggleDropdown}>
                        <Joystick size={30} /> Console
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            <li className="dropdown-item">Opzione 1</li>
                            <li className="dropdown-item">Opzione 2</li>
                            <li className="dropdown-item">Opzione 3</li>
                        </ul>
                    )}
                </div>
                {/* Pulsante Accessori */}
                <button onClick={() => toggleDropdown()}>
                    <Gamepad2 size={30} /> Accessori
                </button>
                {/* Pulsante Giochi */}
                <button onClick={() => toggleDropdown()}>
                    <Disc size={30} /> Giochi
                </button>
            </div>

        </section>
    );
}