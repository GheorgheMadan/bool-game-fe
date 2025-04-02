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
        const filtered = consoles.filter((item) => {
            if (product.brand_console) {
                // Il prodotto è una console → Mostra altre console dello stesso brand
                return item.brand_console === product.brand_console && item.name !== product.name;
            } else {
                // Il prodotto è un accessorio → Mostra le console dello stesso brand dell'accessorio
                return item.brand_console === product.brand;
            }
        });
        setFilteredConsoles(filtered) // Imposta i giochi filtrati
    }, [consoles])

    const getVisibleItems = () => {
        if (window.innerWidth >= 1024) return 5;  // Desktop
        if (window.innerWidth >= 768) return 4;   // Laptop
        if (window.innerWidth >= 480) return 2;   // Tablet
        return 1;  // Mobile
    };

    // Funzione per lo scorrimento in avanti di una sola immagine 
    function nextSlide() {
        const visibleItems = getVisibleItems();
        if (index + visibleItems < filteredConsoles.length) {
            setIndex((prev) => prev + 1);
        } else {
            setIndex(0); // Torna all'inizio se si raggiunge la fine
        }
    }

    function prevSlide() {
        if (index === 0) {
            setIndex(filteredConsoles.length - getVisibleItems()); // Vai all'ultima porzione di elementi visibili
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
            {filteredConsoles.length === 0 ? '' : <section>
                <h2 className="title-h2  black-title">Potrebbero Piacerti Anche:</h2>
                <div className="container-trend">

                    <div className="container-trend-cards">
                        <button onClick={nextSlide} className={`next-btn  ${filteredConsoles.length < 5 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
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
                        <button onClick={prevSlide} className={`prev-btn  ${filteredConsoles.length < 5 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="container-trend-cards-laptop">
                        <button onClick={nextSlide} className={`next-btn  ${filteredConsoles.length < 4 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        {filteredConsoles
                            .slice(index, index + 4)
                            .map((console) => (
                                <>
                                    <div key={console.id} className="container-img-console">                    <Link to={`/products/${console.id}`} onClick={() => window.scrollTo(0, 0)}>
                                        <img className="img-console"
                                            src={console.image_url}
                                            alt={console.name}
                                        />
                                    </Link>
                                    </div>
                                </>
                            ))}
                        <button onClick={prevSlide} className={`prev-btn  ${filteredConsoles.length < 4 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="container-trend-cards-tablet">
                        <button onClick={nextSlide} className={`next-btn  ${filteredConsoles.length < 2 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        {filteredConsoles
                            .slice(index, index + 2)
                            .map((console) => (
                                <>
                                    <div key={console.id} className="container-img-console">                    <Link to={`/products/${console.id}`} onClick={() => window.scrollTo(0, 0)}>
                                        <img className="img-console"
                                            src={console.image_url}
                                            alt={console.name}
                                        />
                                    </Link>
                                    </div>
                                </>
                            ))}
                        <button onClick={prevSlide} className={`prev-btn  ${filteredConsoles.length < 2 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="container-trend-cards-mobile">
                        <button onClick={nextSlide} className={`next-btn  ${filteredConsoles.length < 2 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        {filteredConsoles
                            .slice(index, index + 1)
                            .map((console) => (
                                <>
                                    <div key={console.id} className="container-img-console">                    <Link to={`/products/${console.id}`} onClick={() => window.scrollTo(0, 0)}>
                                        <img className="img-console"
                                            src={console.image_url}
                                            alt={console.name}
                                        />
                                    </Link>
                                    </div>
                                </>
                            ))}
                        <button onClick={prevSlide} className={`prev-btn  ${filteredConsoles.length < 2 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                </div>
            </section>}
        </>
    )
}
