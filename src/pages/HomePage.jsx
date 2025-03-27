import '../style/HomePageStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import CardHomePage from '../components/homepageComponents/CardHomePage'
// import 'bootstrap/dist/css/bootstrap.min.css';
import XboxGamesList from '../components/homepageComponents/XboxGamesList'
import NewReleasedList from '../components/homepageComponents/NewReleasedList'
import PlaystationGamesList from '../components/homepageComponents/PlaystationGamesList'
import NintendoGamesList from '../components/homepageComponents/NintendoGamesList'
export default function HomePage() {
    return (
        <>
            <div className='general-container'>
                <NewReleasedList />
                <CardHomePage />
                <XboxGamesList />
                <PlaystationGamesList />
                <NintendoGamesList />
            </div>
        </>
    )
}