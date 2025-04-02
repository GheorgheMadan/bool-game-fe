import XboxConsoles from "../components/PrincipalPageComponents/categoriesXbox/XboxConsoles"
import XboxAccessories from "../components/PrincipalPageComponents/categoriesXbox/XboxAccessories"
import XboxGames from "../components/PrincipalPageComponents/categoriesXbox/XboxGames"

// import icon 
import { Joystick, Gamepad2, Disc } from "lucide-react";
import { Link } from "react-router-dom";

export default function XboxPage() {
    return (
        <>
            <div className="xbox-products-container">
                <div className='general-container'>
                    <section className="container-nav-home">
                        <div className='container-navigator-icons xbox'>
                            <div>
                                {/* Pulsante Console */}
                                <Link to='/xbox/console'>
                                    <button>
                                        <Joystick size={30} /> Console
                                    </button>
                                </Link>
                            </div>
                            <div>
                                {/* Pulsante Accessori */}
                                <Link to='/xbox/accessories'>
                                    <button>
                                        <Gamepad2 size={30} /> Accessori
                                    </button>
                                </Link>
                            </div>
                            <div>
                                {/* Pulsante Giochi */}
                                <Link to='/xbox/games'>
                                    <button>
                                        <Disc size={30} /> Giochi
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
                <div className='xbox-products-container-2'>
                    <h2 className='xbox-h2'>Benvenuto nel mondo Xbox</h2>
                    <XboxConsoles />
                    <XboxAccessories />
                    <XboxGames />
                </div>
            </div>
        </>
    )
}