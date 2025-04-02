import axios from "axios"
import { useState, useEffect } from "react"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // < e >
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function GenreFiltred({ product }) {
    // stato dei giochi presi dal api 
    const [games, setGames] = useState([]);
    //stato dell'indice di scorriemento
    const [index, setIndex] = useState(0);
    // stato array di giochi filtrati
    const [filteredGames, setFilteredGames] = useState([])

    // Funzione per richimare i giochi dal api
    function fetchGames() {
        axios.get('http://localhost:3000/api/products/search?category=gioco')
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
        const filtered = games.filter((game) =>
            game.game_genre === product.game_genre && game.name !== product.name
        )
        setFilteredGames(filtered) // Imposta i giochi filtrati
    }, [games])

    const getVisibleItems = () => {
        if (window.innerWidth >= 1024) return 5;  // Desktop
        if (window.innerWidth >= 768) return 4;   // Laptop
        if (window.innerWidth >= 480) return 2;   // Tablet
        return 1;  // Mobile
    };

    // Funzione per lo scorrimento in avanti di una sola immagine 
    function nextSlide() {
        const visibleItems = getVisibleItems();
        if (index + visibleItems < filteredGames.length) {
            setIndex((prev) => prev + 1);
        } else {
            setIndex(0); // Torna all'inizio se si raggiunge la fine
        }
    }

    function prevSlide() {
        if (index === 0) {
            setIndex(filteredGames.length - getVisibleItems()); // Vai all'ultima porzione di elementi visibili
        } else {
            setIndex((prev) => prev - 1);
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setIndex(0); // Reset index quando cambia la viewport
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {filteredGames.length === 0 ? '' : <section>
                <h2 className="title-h2  black-title">Potrebbero Piacerti Anche:</h2>
                <div className="container-trend">
                    <div className="container-trend-cards">
                        {/* Estrae una porzione dell'array games, che va dall'indice index a index + 5. Quindi, ci saranno solo 5 giochi alla volta. */}
                        <button onClick={nextSlide} className={`next-btn  ${filteredGames.length < 5 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        {filteredGames
                            .slice(index, index + 5)
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
                        <button onClick={prevSlide} className={`prev-btn  ${filteredGames.length < 5 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="container-trend-cards-laptop">
                        {/* Estrae una porzione dell'array games, che va dall'indice index a index + 5. Quindi, ci saranno solo 5 giochi alla volta. */}
                        <button onClick={nextSlide} className={`next-btn  ${filteredGames.length < 4 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
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
                        <button onClick={prevSlide} className={`prev-btn  ${filteredGames.length < 4 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="container-trend-cards-tablet">
                        {/* Estrae una porzione dell'array games, che va dall'indice index a index + 5. Quindi, ci saranno solo 5 giochi alla volta. */}
                        <button onClick={nextSlide} className={`next-btn  ${filteredGames.length < 2 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
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
                        <button onClick={prevSlide} className={`prev-btn  ${filteredGames.length < 2 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="container-trend-cards-mobile">
                        {/* Estrae una porzione dell'array games, che va dall'indice index a index + 5. Quindi, ci saranno solo 5 giochi alla volta. */}
                        <button onClick={nextSlide} className={`next-btn  ${filteredGames.length < 1 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
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
                        <button onClick={prevSlide} className={`prev-btn  ${filteredGames.length < 1 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                </div>
            </section>}
        </>
    )
}