import '../style/HomePageStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//COMPONENTE CHE CONTINE IN ANTEMPRIMA 2 BUNDLE 
import CardHomePage from '../components/homepageComponents/CardHomePage'
// COMPNENTE CHE CONTIENE LA LISTA DEI GIOCHI XBOX IN CAROSELLO
import XboxGamesList from '../components/homepageComponents/XboxGamesList'
// COMPNENTE CHE CONTIENE LA LISTA DEI GIOCHI PIU RECENTI IN CAROSELLO
import NewReleasedList from '../components/homepageComponents/NewReleasedList'
// COMPNENTE CHE CONTIENE LA LISTA DEI GIOCHI PLAYSTATION IN CAROSELLO
import PlaystationGamesList from '../components/homepageComponents/PlaystationGamesList'
// COMPNENTE CHE CONTIENE LA LISTA DEI GIOCHI NINTENDO IN CAROSELLO
import NintendoGamesList from '../components/homepageComponents/NintendoGamesList'
// COMPONENTE CHE CONTIENE IN ANTEMPRIMA 3 CONSOLE DELLA NINTENDO
import NintendoItems from '../components/homepageComponents/NintendoItems';

import { Joystick, Gamepad2, Disc } from "lucide-react";
import { Link } from 'react-router-dom';



export default function HomePage() {
    return (
        <>
            <div className='general-container'>
                <div className='container-navigator-icons'>
                    <Link>
                        <button>
                            <Joystick size={30} />  Console
                        </button>
                    </Link>
                    <Link>
                        <button>
                            <Gamepad2 size={30} />  Accessori
                        </button>
                    </Link>
                    <Link>
                        <button>
                            <Disc size={30} />  Giochi
                        </button>
                    </Link>
                </div>
            </div>
            <div className='general-container'>
                <NewReleasedList />
            </div>
            <section className='bg-xbox'>
                <div className='general-container'>
                    <XboxGamesList />
                </div>
            </section>
            <div className='general-container'>
                <CardHomePage />
            </div>
            <section className="bg-play">
                <div className='general-container'>
                    <PlaystationGamesList />
                </div>
            </section>
            <div className='general-container'>
                <NintendoItems />
            </div>
            <section className='bg-nintendo'>
                <div className='general-container'>
                    <NintendoGamesList />
                </div>
            </section>
        </>
    )
}
