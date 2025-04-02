import axios from "axios"
import { useState, useEffect } from "react"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // < e >
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function CorelatedConsole({ product }) {
    // stato dei giochi presi dal api 
    const [consoles, setConsoles] = useState([]);
    //stato dell'indice di scorriemento
    const [index, setIndex] = useState(0);
    // stato array di giochi filtrati
    const [filteredConsoles, setFilteredConsoles] = useState([])

    // Funzione per richimare i giochi dal api
    function fetchConsoles() {
        axios.get('http://localhost:3000/api/products')
            .then(res => {
                setConsoles(res.data);
                // console.log(res.data)
            }
            )
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { fetchConsoles() }, [])
    useEffect(() => {
        // Applica il filtro quando i giochi sono cambiati
        const filtered = consoles.filter((console) =>
            console.brand_console === product.brand_console && console.name !== product.name
        )
        setFilteredConsoles(filtered) // Imposta i giochi filtrati
    }, [consoles])

    // Funzione per lo scorrimento in avanti di una sola immagine 
    function nextSlide() {
        if (index + 1 < filteredConsoles.length - 3) {
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
            setIndex(filteredConsoles.length - 4); // Torna all'ultimo gruppo di 4 immagini
        } else {
            setIndex(index - 1); // Riduci l'indice di 1
        }
    }

    return (
        <>
            {filteredConsoles.length === 0 ? '' : <section>
                <h2 className="title-h2  black-title">Potrebbero Piacerti Anche:</h2>
                <div className="container-trend">
                    <button onClick={nextSlide} className={`next-btn  ${filteredConsoles.length < 5 ? 'hidden' : ''}`}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    <div className="container-trend-cards">
                        {/* Estrae una porzione dell'array games, che va dall'indice index a index + 5. Quindi, ci saranno solo 5 giochi alla volta. */}
                        {filteredConsoles
                            .slice(index, index + 5)
                            .map((console) => (
                                <>
                                    <div key={console.id} className="container-img-console">
                                        <Link to={`/products/${console.id}`} onClick={() => window.scrollTo(0, 0)}>
                                            <img className="img-console"
                                                src={console.image_url}
                                                alt={console.name}
                                            />
                                        </Link>
                                    </div>
                                </>
                            ))}
                    </div>
                    <button onClick={prevSlide} className={`prev-btn  ${filteredConsoles.length < 5 ? 'hidden' : ''}`}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </div>

            </section>}
        </>
    )
}

{/* <div className="container-trend-cards-laptop">

    {filteredConsoles
        .slice(index, index + 5)
        .map((console) => (
            <>
                <div key={console.id} className="container-img-console">
                    <Link to={`/products/${console.id}`} onClick={() => window.scrollTo(0, 0)}>
                        <img className="img-console"
                            src={console.image_url}
                            alt={console.name}
                        />
                    </Link>
                </div>
            </>
        ))}
</div> */}
{/* <div className="container-trend-cards-laptop">
                
{filteredGames
    .slice(index, index + 4)
    .map((game) => (
        <>
            <div key={game.id} className="container-img">
                <Link to={`/products/${game.id}`} onClick={() => window.scrollTo(0, 0)}>
                    <img className="img-gioco "
                        src={game.image_url}
                        alt={game.name}
                    />
                </Link>
            </div>
        </>
    ))}
</div>
<div className="container-trend-cards-tablet">

{filteredGames
    .slice(index, index + 2)
    .map((game) => (
        <>
            <div key={game.id} className="container-img">
                <Link to={`/products/${game.id}`} onClick={() => window.scrollTo(0, 0)}>
                    <img className="img-gioco "
                        src={game.image_url}
                        alt={game.name}
                    />
                </Link>
            </div>
        </>
    ))}
</div>
<div className="container-trend-cards-mobile">

{filteredGames
    .slice(index, index + 1)
    .map((game) => (
        <>
            <div key={game.id} className="container-img">
                <Link to={`/products/${game.id}`} onClick={() => window.scrollTo(0, 0)}>
                    <img className="img-gioco "
                        src={game.image_url}
                        alt={game.name}
                    />
                </Link>
            </div>
        </>
    ))}
</div> */}