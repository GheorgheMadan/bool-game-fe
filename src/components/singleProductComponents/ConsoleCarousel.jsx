import { useState } from "react"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // < e >
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function ConsoleCrousel({ product }) {
    //stato dell'indice di scorriemento
    const [index, setIndex] = useState(0);
    const images = product.images;
    console.log(images);

    // Funzione per lo scorrimento in avanti di una sola immagine 
    function nextSlide() {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }

    // Funzione per lo scorrimento indietro di una sola immagine 
    function prevSlide() {
        setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }


    return (
        <>
            {images.length === 0 ? '' : <section>
                <div className="container-carousel-product">
                    {/* Immagine principale */}
                    <div className="main-image">
                        <button onClick={prevSlide} className={` ${images.length === 1 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <img src={images[index]} alt={`Immagine ${index + 1}`} />
                        <button onClick={nextSlide} className={`btn-right ${images.length === 1 ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    {/* Thumbnail delle immagini */}
                    <div className="container-thumbnails">

                        {images
                            .slice(index, index + 5)
                            .map((image, idx) => (
                                <div
                                    key={idx}
                                    className={`container-thumbnails-image ${idx === index ? "active" : ""}`}
                                    onClick={() => setIndex(idx)}
                                >
                                    <img src={image} alt={`Thumbnail ${idx + 1}`} />
                                </div>
                            ))}
                    </div>
                </div>
            </section>}
        </>
    )
}
