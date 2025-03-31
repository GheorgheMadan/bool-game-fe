
import PlaystationConsoles from '../components/PrincipalPageComponents/categoriesPlaystation/PlaystationConsoles'
import PlaystationGames from '../components/PrincipalPageComponents/categoriesPlaystation/PlaystationGames'
import PlaystationAccessories from '../components/PrincipalPageComponents/categoriesPlaystation/PlaystationAccessories'
import '../style/PrincipalPageStyle/PlaystationPageStyle.css';

import { Joystick, Gamepad2, Disc } from "lucide-react";
import { Link } from "react-router-dom";


export default function PlaystationPage() {
    return (
        <>
            <div className="playstation-products-container">
                <section className="container-nav-home">
                    <div className='container-navigator-icons'>
                        <div>
                            {/* Pulsante Console */}
                            <Link to='/playstation/consoles'>
                                <button>
                                    <Joystick size={30} /> Console
                                </button>
                            </Link>
                        </div>
                        <div>
                            {/* Pulsante Accessori */}
                            <Link to='/playstation/accessories'>
                                <button>
                                    <Gamepad2 size={30} /> Accessori
                                </button>
                            </Link>
                        </div>
                        <div>
                            {/* Pulsante Giochi */}
                            <Link to='/playstation/games'>
                                <button>
                                    <Disc size={30} /> Giochi
                                </button>
                            </Link>
                        </div>
                    </div>

                </section>
                <div className='playstation-products-container-2 '>
                    <h2 className='playstation-h2'>Benvenuto nel mondo Playstation</h2>
                    <PlaystationConsoles />
                    <PlaystationAccessories />
                    <PlaystationGames />
                </div>
            </div>
        </>
    )
}