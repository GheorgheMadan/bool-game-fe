import NintendoConsoles from "../components/PrincipalPageComponents/categoriesNintendo/NintendoConsoles"
import NintendoGames from "../components/PrincipalPageComponents/categoriesNintendo/NintendoGames"
import NintendoAccessories from "../components/PrincipalPageComponents/categoriesNintendo/NintendoAccessories"

// import icon 
import { Joystick, Gamepad2, Disc } from "lucide-react";
import { Link } from "react-router-dom";

export default function XboxPage() {
    return (
        <>
            <div className="nintendo-products-container">
                <section className="container-nav-home">
                    <div className='container-navigator-icons nintendo'>
                        <div>
                            {/* Pulsante Console */}
                            <Link to='/nintendo/consoles'>
                                <button>
                                    <Joystick size={30} /> Console
                                </button>
                            </Link>
                        </div>
                        <div>
                            {/* Pulsante Accessori */}
                            <Link to='/nintendo/accessories'>
                                <button>
                                    <Gamepad2 size={30} /> Accessori
                                </button>
                            </Link>
                        </div>
                        <div>
                            {/* Pulsante Giochi */}
                            <Link to='/nintendo/games'>
                                <button>
                                    <Disc size={30} /> Giochi
                                </button>
                            </Link>
                        </div>
                    </div>

                </section>
                <div className='nintendo-products-container-2'>
                    <h2 className='nintendo-h2'>Benvenuto nel mondo Nintendo</h2>
                    <NintendoConsoles />
                    <NintendoAccessories />
                    <NintendoGames />
                </div>
            </div>
        </>
    )
}