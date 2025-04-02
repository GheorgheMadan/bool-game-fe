import axios from "axios"
import { useState, useEffect } from "react"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // < e >
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function CorelatedAccessories({ product }) {
    // stato dei giochi presi dal api 
    const [accessories, setAccessories] = useState([]);
    //stato dell'indice di scorriemento
    const [index, setIndex] = useState(0);
    // stato array di giochi filtrati
    const [filteredAccessories, setFilteredAccessories] = useState([])

    // Funzione per richimare i giochi dal api
    function fetchAccessories() {
        axios.get('http://localhost:3000/api/products')
            .then(res => {
                setAccessories(res.data);
                // console.log(res.data)
            }
            )
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { fetchAccessories() }, [])

    useEffect(() => {
        // Applica il filtro quando i giochi sono cambiati
        const filtered = accessories.filter((accessory) =>
            accessory.brand === product.brand_console
        )
        setFilteredAccessories(filtered) // Imposta i giochi filtrati
    }, [accessories])

    // Funzione per lo scorrimento in avanti di una sola immagine 
    function nextSlide() {
        if (index + 1 < filteredAccessories.length - 3) {
            setIndex(index + 1) // aumenta l'indice di 1 
        } else {
            // Ciclico: torna all'inizio quando arrivi alla fine
            setIndex(0); // Torna alla prima immagine
        }
    }

    // Funzione per lo scorrimento indietro di una sola immagine 
    function prevSlide() {
        if (index === 0) {
            // Ciclico: torna all'ultimo gioco quando sei alla prima immagine
            setIndex(filteredAccessories.length - 4); // Torna all'ultimo gruppo di 4 immagini
        } else {
            setIndex(index - 1); // Riduci l'indice di 1
        }
    }

    return (
        <>
            {filteredAccessories.length === 0 ? '' : <section>
                <h2 className="title-h2  black-title">Potrebbero Piacerti Anche:</h2>
                <div className="container-trend">
                    <button onClick={nextSlide} className={`next-btn  ${filteredAccessories.length < 5 ? 'hidden' : ''}`}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    <div className="container-trend-cards">
                        {/* Estrae una porzione dell'array games, che va dall'indice index a index + 5. Quindi, ci saranno solo 5 giochi alla volta. */}
                        {filteredAccessories
                            .slice(index, index + 5)
                            .map((accessory) => (
                                <>
                                    <div key={accessory.id} className="container-img-console">
                                        <Link to={`/products/${accessory.id}`} onClick={() => window.scrollTo(0, 0)}>
                                            <img className="img-console"
                                                src={accessory.image_url}
                                                alt={accessory.name}
                                            />
                                        </Link>
                                    </div>
                                </>
                            ))}
                    </div>
                    <button onClick={prevSlide} className={`prev-btn  ${filteredAccessories.length < 5 ? 'hidden' : ''}`}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </div>

            </section>}
        </>
    )
}