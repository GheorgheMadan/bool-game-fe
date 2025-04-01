import axios from "axios";
import { useState, useEffect } from "react";
// Importa useParams
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/SingleProduct.css";
// Per aggiungere i prodotti al carrello
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function SingleProduct() {

    // Estraggo la funzione addToCart dal contesto
    const { addToCart } = useCart();

    // Ottieni l'ID del prodotto dai parametri dell'URL
    const { productId } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (productId) {
            axios.get(`http://localhost:3000/api/products/${productId}`)
                .then(res => setData(res.data))
                .catch(err => setError("Errore nel recupero del prodotto o della categoria."));
        }
    }, [productId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Caricamento prodotto...</div>;
    }

    const getProductCategory = (product) => {
        return {
            // Determina se il prodotto è un gioco
            isConsole: product.category_name === 'console',
            isGame: product.category_name === 'gioco',
            isAccessory: product.category_name === 'accessorio'
        }
    };
    const { isConsole, isGame, isAccessory } = getProductCategory(data);

    const pegiImages = {
        3: "/pegi/PEGI_3.png",
        7: "/pegi/PEGI_7.png",
        12: "/pegi/PEGI_12.png",
        16: "/pegi/PEGI_16.png",
        18: "/pegi/PEGI_18.png"
    };

    return (
        <>
            {/* Videogame card */}
            <div className="single-product-container sfondo">
                <div className="card d-flex flex-row justify-content-between">
                    {/* Parte sinistra con titolo e dettagli */}
                    <div className="card-body-left">
                        <h5 className="card-title mb-2">{data.name}</h5>
                        <div className="image-try">
                            <img className="image mr-4" src={data.image_url} alt={data.name} />
                        </div>

                        {/* Sezione per giochi */}
                        {isGame && (
                            <>
                                <p className="inline">
                                    PEGI: {pegiImages[data.pegi_rating] ? (
                                        <img className="pegi-image" src={pegiImages[data.pegi_rating]} alt={`PEGI ${data.pegi_rating}`} />
                                    ) : data.pegi_rating}
                                </p>

                                <p className="inline">Online: {data.online_mode === 1 ? (
                                    <img className="pegi-image" src="/pegi/online.png" alt="online" />
                                ) : data.online_mode === 0 ? (
                                    <img className="pegi-image" src="/pegi/offline.png" alt="offline" />
                                ) : (
                                    data.online_mode
                                )}
                                </p>
                                <p className="inline">Modalità di gioco: {data.multiplayer === 1 ? (
                                    <img className="pegi-image" src="/pegi/multiplayer.png" alt="multiplayer" />
                                ) : data.multiplayer === 0 ? (
                                    <img className="pegi-image" src="/pegi/singleplayer.png" alt="singleplayer" />
                                ) : (
                                    data.multiplayer
                                )}
                                </p>
                            </>
                        )}

                        {/* Sezione per console */}
                        {isConsole && (
                            <>
                                <p>Specifiche hardware: {data.hardware_specs}</p>
                                <p>Colore: {data.color}</p>
                            </>
                        )}

                        <p>Descrizione: {data.description}</p>
                    </div>

                    {/* Parte destra con prezzo e acquisto */}
                    <div className="card-body-right justify-content-center d-flex-xl flex-wrap">
                        <div className="card-right-img">
                            <p className="card-text">
                                <strong>Prezzo: {data.price} €</strong>
                            </p>
                            {/* Mostra "Compatibile con" solo se non è console o accessorio */}
                            {!isConsole && !isAccessory && (
                                <p>Compatibile con: {
                                    data.supported_consoles
                                        ? JSON.parse(data.supported_consoles || "[]").map(console => console.trim()).join(", ")
                                        : "nessuna console specificata"
                                }</p>
                            )}

                            {isGame && (
                                <>
                                    <p>Genere: {data.game_genre}</p>
                                    <p>Publisher: {data.publisher}</p>
                                </>
                            )}

                            {isConsole && (
                                <p>Specifiche tecniche: {data.hardware_specs}</p>
                            )}

                            <p>Data di uscita: {new Date(data.release_date).toLocaleDateString('it-IT')}</p>
                            <div className={`centered-price ${data.stock < 1 ? "hidden" : "available"}`}>
                                {data.stock < 1 ? "Non disponibile" : "Disponibile"}
                            </div>
                            <div className={`centered-price ${data.stock > 0 ? "hidden" : "not-available"}`}>
                                Non Disponibile
                            </div>
                            <button
                                onClick={() => addToCart({
                                    id: data.id,
                                    name: data.name,
                                    price: data.price,
                                    image: data.image_url
                                })}
                                className="add-cart centered-price"
                            >
                                Aggiungi al carrello
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
