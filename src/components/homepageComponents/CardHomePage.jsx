import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// Per aggiungere i prodotti al carrello
import { useCart } from "../../contexts/CartContext";
export default function CardHomePage() {

    // Estraggo la funzione addToCart dal contesto
    const { addToCart } = useCart();

    const [query, setQuery] = useState({})
    const [query2, setQuery2] = useState({})

    // Funzione per recuperare i dettagli del primo prodotto (bundle 128)
    const searchBundle = () => {
        axios.get('http://localhost:3000/api/products/128')
            .then(res => {
                setQuery(res.data);
                console.log(res.data)
            })
            .catch(err => console.error(err));
    }

    useEffect(() => { searchBundle() }, [])

    // Esegue la funzione searchBundle al montaggio del componente
    const searchBundle2 = () => {
        axios.get('http://localhost:3000/api/products/138')
            .then(res => {
                setQuery2(res.data);
                console.log(res.data)
            })
            .catch(err => console.error(err));
    }

    // Esegue la funzione searchBundle2 al montaggio del componente
    useEffect(() => { searchBundle2() }, [])

    return (
        <>
            <h2 className="black-title title-h2">SCOPRI I NOSTRI BUNDLE</h2>

            {/* Primo bundle */}
            <section className="container-cards">
                {/* Sezione per il primo prodotto del bundle */}
                <div className="div-1">
                    <Link to={`/products/${query.id}`}>
                        <img src={query.images?.[0]} alt={query.name} className="bundle-img" />
                    </Link>
                </div>
                <div className='div-2'>
                    <Link to={`/products/${query.id}`}>
                        <img src={query.images?.[3]} alt={query.name} className="game-img" />
                    </Link>
                </div>
                <div className="container-text container-details-nintendo bg-light  rounded shadow p-2 bg-opacity-75">
                    <Link to={`/products/${query.id}`}>
                        <h4>{query.name}</h4>
                    </Link>
                    <div className="d-flex justify-content-center gap-4 mt-3 ">
                        <span className="fs-3 fw-bold text-success">€ {query.price}</span>
                        <Link to={`/products/${query.id}`}>
                            <button
                                onClick={() => addToCart({ id: query.id, name: query.name, price: query.price })}
                            >
                                Acquista ora!
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Secondo bundle */}
            <section className="container-cards">
                {/* Sezione per il secondo prodotto del bundle */}
                <div className='div-2'>
                    <Link to={`/products/${query2.id}`}>
                        <img src={query2.images?.[1]} alt={query2.name} className="game-img2" />
                    </Link>
                </div>
                <div className="div-1">
                    <Link to={`/products/${query2.id}`}>
                        <img src={query2.images?.[0]} alt={query2.name} className="bundle-img2" />
                    </Link>
                </div>
                <div className="container-text2 container-details-nintendo  bg-light  rounded shadow p-2 bg-opacity-75">
                    <Link to={`/products/${query2.id}`}>
                        <h4>{query2.name}</h4>
                    </Link>
                    <div className="d-flex justify-content-center gap-4 mt-3">
                        <span className="fs-3 fw-bold text-success container-details-nintendo">€ {query2.price}</span>
                        <Link to={`/products/${query2.id}`}>
                            <button
                                className=""
                                onClick={() => addToCart({ id: query2.id, name: query2.name, price: query2.price })}
                            >
                                Acquista ora!
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
