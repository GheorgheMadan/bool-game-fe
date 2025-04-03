import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// Per aggiungere i prodotti al carrello
import { useCart } from "../../contexts/CartContext";


export default function CardHomePage() {

    // Estraggo la funzione addToCart dal contesto
    const { addToCart } = useCart();

    // Stato per gestire i dati del primo bundle (nella home)
    const [query, setQuery] = useState({})
    // Stato per gestire i dati del secondo bundle (nella home)
    const [query2, setQuery2] = useState({})

    // Funzione per recuperare i dettagli del primo prodotto (bundle 128)
    const searchBundle = () => {
        // Richiesta GET per ottenere il primo prodotto
        axios.get('http://localhost:3000/api/products/128')
            .then(res => {
                setQuery(res.data); // Aggiorna lo stato con i dati ricevuti
                console.log(res.data)
            })
            .catch(err => console.error(err));
    }

    // Effettua la ricerca del primo bundle al montaggio del componente
    useEffect(() => { searchBundle() }, [])

    // Esegue la funzione searchBundle al montaggio del componente
    const searchBundle2 = () => {
        // Richiesta GET per ottenere il secondo prodotto
        axios.get('http://localhost:3000/api/products/138')
            .then(res => {
                setQuery2(res.data);
                console.log(res.data)
            })
            .catch(err => console.error(err));
    }

    // Effettua la ricerca del secondo bundle al montaggio del componente
    useEffect(() => { searchBundle2() }, [])

    return (
        <>
            <h2 className="black-title title-h2 titolo-bundle">SCOPRI I NOSTRI BUNDLE</h2>

            {/* Primo bundle */}
            <section className="container-bundle">
                {/* Sezione per il primo prodotto del bundle */}
                <div className="div-1">
                    <Link to={`/products/${query.id}`}>
                        {/* Immagine del primo prodotto del bundle */}
                        <img src={query.images?.[0]} alt={query.name} className="bundle-img" />
                    </Link>
                </div>
                <div className='div-2'>
                    <Link to={`/products/${query.id}`}>
                        {/* Immagine del secondo prodotto del bundle */}
                        <img src={query.images?.[3]} alt={query.name} className="game-img" />
                    </Link>
                </div>
                <div className="container-text container-details-nintendo bg-light  rounded shadow p-2 bg-opacity-75">
                    <Link to={`/products/${query.id}`}>
                        <h4>{query.name}</h4>  {/* Nome del primo prodotto del bundle */}
                    </Link>
                    <div className="d-flex justify-content-center gap-4 mt-3 ">
                        {/* Prezzo del primo prodotto */}
                        <span className="fs-3 fw-bold text-success">€ {query.price}</span>
                        <Link to={`/products/${query.id}`} state={{ image: query.images?.[0] }}>
                            {/* Bottone per acquistare il primo prodotto */}
                            <button>
                                Acquista ora!
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Secondo bundle */}
            <section className="container-bundle">
                {/* Sezione per il secondo prodotto del bundle */}
                <div className='div-2'>
                    <Link to={`/products/${query2.id}`}>
                        {/* Immagine del secondo prodotto del secondo bundle */}
                        <img src={query2.images?.[1]} alt={query2.name} className="game-img2" />
                    </Link>
                </div>
                <div className="div-1">
                    <Link to={`/products/${query2.id}`}>
                        {/* Immagine del primo prodotto del secondo bundle */}
                        <img src={query2.images?.[0]} alt={query2.name} className="bundle-img2" />
                    </Link>
                </div>
                <div className="container-text2 container-details-nintendo  bg-light  rounded shadow p-2 bg-opacity-75">
                    <Link to={`/products/${query2.id}`}>
                        <h4>{query2.name}</h4>  {/* Nome del secondo prodotto del bundle */}
                    </Link>
                    <div className="d-flex justify-content-center gap-4 mt-3">
                        {/* Prezzo del secondo prodotto */}
                        <span className="fs-3 fw-bold text-success container-details-nintendo">€ {query2.price}</span>
                        <Link to={`/products/${query2.id}`} state={{ image: query2.images?.[1] }}>
                            {/* Bottone per acquistare il secondo prodotto */}
                            <button>
                                Acquista ora!
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
