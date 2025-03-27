import axios from "axios"
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
export default function CardHomePage() {

    const [query, setQuery] = useState({})
    const [query2, setQuery2] = useState({})

    const searchBundle = () => {
        axios.get('http://localhost:3000/api/products/128')
            .then(res => {
                setQuery(res.data);
                // console.log(res.data)
            }
            )
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { searchBundle() }, [])

    const searchBundle2 = () => {
        axios.get('http://localhost:3000/api/products/138')
            .then(res => {
                setQuery2(res.data);
                // console.log(res.data)
            }
            )
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { searchBundle2() }, [])


    return (
        <>
            <h2 className="bundle-title border-bottom p-4">SCOPRI I NOSTRI BUNDLE</h2>
            <section className="container-cards">
                <div className="div-1">
                    <img src={query.images?.[0]} alt={query.name} className="bundle-img" />
                </div>
                <div className='div-2'>
                    <img src={query.images?.[3]} alt={query.name} className="game-img" />
                </div>
                <div className="container-text">
                    <h3 className="bg-light rounded shadow p-2">{query.name}</h3>
                    <div className="d-flex justify-content-center gap-4 mt-3 ">
                        <span className="fs-3 fw-bold text-success">€ {query.price}</span>
                        <button className="btn btn-warning fw-semibold px-4 py-2 shadow-md rounded-pill">Acquista ora!</button>
                    </div>
                </div>
            </section>
            <section className="container-cards">
                <div className='div-2'>
                    <img src={query2.images?.[1]} alt={query2.name} className="game-img2" />
                </div>
                <div className="div-1">
                    <img src={query2.images?.[0]} alt={query2.name} className="bundle-img2" />
                </div>
                <div className="container-text2">
                    <h3 className="bg-light rounded shadow p-2">{query2.name}</h3>
                    <div className="d-flex justify-content-center gap-4 mt-3 ">
                        <span className="fs-3 fw-bold text-success">€ {query2.price}</span>
                        <button className="btn btn-warning fw-semibold px-4 py-2 shadow-md rounded-pill">Acquista ora!</button>
                    </div>
                </div>
            </section>
        </>
    )
}