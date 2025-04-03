import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../style/SingleProduct.css";
// Per aggiungere i prodotti al carrello
import { useCart } from "../contexts/CartContext";
// import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import GenreFiltred from "./singleProductComponents/GenreFiltred";
import ConsoleCrousel from "./singleProductComponents/ConsoleCarousel";
import CorelatedConsole from "./singleProductComponents/CorelatedConsole";
import CorelatedAccessories from "./singleProductComponents/CorelatedAccessories";
// import ChatBot from "./ChatBot";

export default function SingleProduct() {

    // Estraggo la funzione addToCart dal contesto
    const { addToCart } = useCart();

    // Ottieni l'ID del prodotto dai parametri dell'URL
    const { productId } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     if (productId) {
    //         axios.get(`http://localhost:3000/api/products/${productId}`)
    //             .then(res => setData(res.data))
    //             .catch(err => setError("Errore nel recupero del prodotto o della categoria."));
    //     }
    // }, [productId]);

    useEffect(() => {
        // Verifica se il productId è disponibile
        if (productId) {
            // Esegui la richiesta API per ottenere i dettagli del prodotto tramite il productId
            axios.get(`http://localhost:3000/api/products/${productId}`)
                .then(res => {
                    // Salva i dati del prodotto nel state
                    setData(res.data);

                    // Funzione per verificare che l'API di Tidio sia pronta
                    const checkTidioReady = () => {
                        // Verifica se l'API di Tidio è disponibile
                        if (window.tidioChatApi && window.tidioChatApi.on) {
                            console.log("Tidio Chat API detected, attaching ready event...");

                            // Verifica se i dati del visitatore non sono già stati impostati
                            if (!window.tidioChatApi.isVisitorDataSet) {
                                console.log("Tidio Chat API is ready!");
                                window.tidioChatApi.on("ready", function () {
                                    console.log("Tidio Chat API is ready!");

                                    // Imposta i dati del visitatore con le informazioni del prodotto
                                    window.tidioChatApi.setVisitorData({
                                        productName: res.data.name,
                                        productPrice: res.data.price,
                                        productDescription: res.data.description
                                    });

                                    // Segna i dati come già impostati, evitando di impostarli nuovamente
                                    window.tidioChatApi.isVisitorDataSet = true;
                                    console.log("Dati del visitatore impostati:", {
                                        productName: res.data.name,
                                        productPrice: res.data.price,
                                        productDescription: res.data.description
                                    });

                                    // Ritardo prima di inviare il messaggio nel chat di Tidio
                                    setTimeout(() => {
                                        // Verifica se la funzione displayMessage è disponibile
                                        if (window.tidioChatApi.displayMessage) {
                                            // Invia un messaggio predefinito con i dettagli del prodotto
                                            window.tidioChatApi.displayMessage(
                                                `🔎 Stai guardando: ${res.data.name}\n
                                                💰 Prezzo: ${res.data.price}€\n
                                                📖 Descrizione: ${res.data.description}`
                                            );
                                            console.log("Messaggio inviato con successo");
                                        } else {
                                            console.log("Tidio displayMessage non disponibile.");
                                        }
                                    }, 2000); // Attendere un altro po' prima di inviare il messaggio
                                });
                            } else {
                                console.log("Dati visitatore già impostati.");
                            }
                        } else {
                            // Se Tidio non è pronto, riprova dopo 1 secondo
                            setTimeout(() => {
                                checkTidioReady(); // Riprovare se Tidio non è pronto
                            }, 1000);
                        }
                    };
                    // Chiama la funzione per verificare se Tidio è pronto
                    checkTidioReady();
                })
                .catch(err => {
                    // Gestione degli errori in caso di problemi con la richiesta API
                    console.error("Errore nel recupero del prodotto:", err);
                    setError("Errore nel recupero del prodotto o della categoria.");
                });
        }
    }, [productId]);   // Il codice verrà eseguito ogni volta che productId cambia

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
            <div className={`jumbo-container ${(isConsole || isAccessory) ? 'hidden' : ''}`} style={{ backgroundImage: `url(${data.image_url})` }}>
            </div>
            <div className="general-container-single-product">

                {/* Chatbot
                <div className="chatbot-container">
                    <ChatBot productId={productId} />
                </div> */}

                <div className={`container-box ${isConsole || isAccessory ? '' : 'container-box-game'}`}>
                    {/* Parte sinistra con titolo e dettagli */}
                    <div className="container-images">
                        {isGame && <div className="card-image">
                            <img src={data.image_url} alt={data.name} />
                        </div>}
                        {/* Sezione per giochi */}
                        {(isConsole || isAccessory) &&
                            <ConsoleCrousel product={data} />
                        }
                    </div>
                    {/* Parte destra con prezzo e acquisto */}
                    <div className={`card-payment-details ${isConsole || isAccessory ? 'card-payment-details-console' : 'card-payment-details'}`}>
                        <h5 className={` " " ${isConsole || isAccessory ? 'title-console' : ''}`}>{data.name}</h5>
                        <div >
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
                                <p>Brand: {data.brand_console}</p>
                            )}
                            {isAccessory && (
                                <p>Brand: {data.brand}</p>
                            )}

                            <p>
                                Data di uscita: {new Date(data.release_date).toLocaleDateString('it-IT')}
                            </p>
                        </div>

                        <div className="container-details-flex">
                            <div className="container-price-pegi">
                                {isGame && (
                                    <div className="container-pegi">
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
                                    </div>
                                )}
                                <p className="price">
                                    <strong>{data.price} €</strong>
                                </p>
                            </div>


                            <div className="container-buttons">
                                <div className={` ${data.stock === 0 ? "not-available" : "available"}`}>
                                    <div>{data.stock < 1 ? "Non disponibile" : "Disponibile"}</div>
                                </div>
                                <button
                                    onClick={() => addToCart({
                                        id: data.id,
                                        name: data.name,
                                        price: data.price,
                                        image: data.image_url
                                    })}
                                    className={`${data.stock === 0 ? 'hidden' : ''} `}
                                >
                                    <FaCartShopping />  Aggiungi al carrello
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-description-product">
                    <h5>Descrizione:</h5>
                    {/* Sezione per console */}
                    {isConsole && (
                        <>
                            <p>Specifiche hardware: {data.hardware_specs}</p>
                            <p>Colore: {data.color}</p>
                        </>
                    )}

                    <p>{data.description}</p>
                </div>
                {isGame &&
                    < div className="corelated-container">
                        <GenreFiltred product={data} />
                    </div>
                }
                {isConsole &&
                    <>
                        < div className="corelated-container">
                            <CorelatedConsole product={data} />
                        </div>
                        < div className="corelated-container">
                            <CorelatedAccessories product={data} />
                        </div>
                    </>
                }
                {isAccessory &&
                    <>
                        < div className="corelated-container">
                            <CorelatedConsole product={data} />
                        </div>
                        < div className="corelated-container">
                            <CorelatedAccessories product={data} />
                        </div>
                    </>
                }
            </div>
        </>
    )
}
