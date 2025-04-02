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
        const filtered = accessories.filter((item) => {
            if (product.brand_console) {
                // Il prodotto è una console → Mostra console dello stesso brand
                return (item.brand_console === product.brand_console || item.brand === product.brand_console) && item.name !== product.name;
            } else {
                // Il prodotto è un accessorio → Mostra accessori dello stesso brand
                return (item.brand === product.brand) && item.name !== product.name;
            }
        });
        setFilteredAccessories(filtered) // Imposta i giochi filtrati
    }, [accessories])


    const getVisibleItems = () => {
        if (window.innerWidth >= 1024) return 5;  // Desktop
        if (window.innerWidth >= 768) return 4;   // Laptop
        if (window.innerWidth >= 480) return 2;   // Tablet
        return 1;  // Mobile
    };

    // Funzione per lo scorrimento in avanti di una sola immagine 
    function nextSlide() {
        const visibleItems = getVisibleItems();
        if (index + visibleItems < filteredAccessories.length) {
            setIndex((prev) => prev + 1);
        } else {
            setIndex(0); // Torna all'inizio se si raggiunge la fine
        }
    }

    function prevSlide() {
        if (index === 0) {
            setIndex(filteredAccessories.length - getVisibleItems()); // Vai all'ultima porzione di elementi visibili
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
            {filteredAccessories.length === 0 ? '' : <section>
                <h2 className="title-h2  black-title">Potrebbero Piacerti Anche:</h2>
                <div className="container-trend">

                    <div className="container-trend-cards">
                        {/* Estrae una porzione dell'array games, che va dall'indice index a index + 5. Quindi, ci saranno solo 5 giochi alla volta. */}
                        <button onClick={nextSlide} className={`next-btn  ${filteredAccessories.length < 5 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
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
                        <button onClick={prevSlide} className={`prev-btn  ${filteredAccessories.length < 5 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="container-trend-cards-laptop">
                        {/* Estrae una porzione dell'array games, che va dall'indice index a index + 5. Quindi, ci saranno solo 5 giochi alla volta. */}
                        <button onClick={nextSlide} className={`next-btn  ${filteredAccessories.length <= 4 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        {filteredAccessories
                            .slice(index, index + 4)
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
                        <button onClick={prevSlide} className={`prev-btn  ${filteredAccessories.length <= 4 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="container-trend-cards-tablet">
                        {/* Estrae una porzione dell'array games, che va dall'indice index a index + 5. Quindi, ci saranno solo 5 giochi alla volta. */}
                        <button onClick={nextSlide} className={`next-btn  ${filteredAccessories.length < 2 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        {filteredAccessories
                            .slice(index, index + 2)
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
                        <button onClick={prevSlide} className={`prev-btn  ${filteredAccessories.length < 2 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="container-trend-cards-mobile">
                        {/* Estrae una porzione dell'array games, che va dall'indice index a index + 5. Quindi, ci saranno solo 5 giochi alla volta. */}
                        <button onClick={nextSlide} className={`next-btn  ${filteredAccessories.length < 2 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        {filteredAccessories
                            .slice(index, index + 1)
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
                        <button onClick={prevSlide} className={`prev-btn  ${filteredAccessories.length < 2 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>

                </div>

            </section>}
        </>
    )
}