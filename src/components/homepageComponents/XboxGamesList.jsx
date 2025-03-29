import axios from "axios"
import { useState, useEffect } from "react"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // < e >
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function XboxGamesList() {
    // stato dei giochi presi dal api 
    const [games, setGames] = useState([]);
    //stato dell'indice di scorriemento
    const [index, setIndex] = useState(0);
    // stato array di giochi filtrati
    const [filteredGames, setFilteredGames] = useState([])

    // Funzione per richimare i giochi dal api
    function fetchGames() {
        axios.get('http://localhost:3000/api/products')
            .then(res => {
                setGames(res.data);
                // console.log(res.data)
            }
            )
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { fetchGames() }, [])
    useEffect(() => {
        // Applica il filtro quando i giochi sono cambiati
        const filtered = games.filter((game) => {
            // Dato che supported_consoles è una stringa (tipo '["Xbox One", "Xbox Series X/S"]'), lo converto
            const consoles = JSON.parse(game.supported_consoles);
            return game.category_name === 'gioco' &&
                (consoles.includes("Xbox One") || consoles.includes("Xbox Series X/S"));
        });
        setFilteredGames(filtered) // Imposta i giochi filtrati
    }, [games])

    // Funzione per lo scorrimento in avanti di una sola immagine 
    function nextSlide() {
        if (index + 1 < filteredGames.length - 3) {
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
            setIndex(filteredGames.length - 4); // Torna all'ultimo gruppo di 4 immagini
        } else {
            setIndex(index - 1); // Riduci l'indice di 1
        }
    }

    return (
        <>
            <section>
                <h2 className="title-h2">GIOCHI XBOX</h2>
                <div className="container-trend">
                    <button onClick={nextSlide} className="next-btn">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                    <div className="container-trend-cards">
                        {/* Estrae una porzione dell'array games, che va dall'indice index a index + 5. Quindi, ci saranno solo 5 giochi alla volta. */}
                        {filteredGames
                            .slice(index, index + 5)
                            .map((game) => (
                                <>
                                    <div key={game.id} className="container-img">
                                        <Link>
                                            <img className="img-gioco "
                                                src={game.image_url}
                                                alt={game.name}
                                            />
                                        </Link>
                                    </div>
                                </>
                            ))}
                    </div>
                    <button onClick={prevSlide} className="prev-btn">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </div>
            </section>
        </>
    )
}