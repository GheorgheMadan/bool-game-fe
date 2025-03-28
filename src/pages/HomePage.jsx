import '../style/HomePageStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';



import CardHomePage from '../components/homepageComponents/CardHomePage'
// import 'bootstrap/dist/css/bootstrap.min.css';
import XboxGamesList from '../components/homepageComponents/XboxGamesList'
import NewReleasedList from '../components/homepageComponents/NewReleasedList'
import PlaystationGamesList from '../components/homepageComponents/PlaystationGamesList'
import NintendoGamesList from '../components/homepageComponents/NintendoGamesList'
import NintendoItems from '../components/homepageComponents/NintendoItems';
export default function HomePage() {


    return (
        <>
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
