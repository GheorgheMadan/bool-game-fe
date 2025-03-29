import axios from "axios";
import { useState, useEffect } from "react";
// Importa useParams
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/SingleProduct.css";

export default function SingleProduct() {
    // Ottieni l'ID del prodotto dai parametri dell'URL
    const { productId } = useParams();
    const [data, setData] = useState(null);
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (productId) {
            axios.get(`http://localhost:3000/api/products/${productId}`)
                // return axios.get(`http://localhost:3000/api/products/${productId}`)                   SECONDA CHIAMATA PER LE CATEGORIES
                .then(res => setData(res.data))
                // if (res.data && res.data.length > 0) {
                //     setCategory(res.data[0].category_name);
                // }
                .catch(err => setError("Errore nel recupero del prodotto o della categoria."));
        }
    }, [productId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Caricamento prodotto...</div>;
    }

    // Converti il prezzo in numero UNA VOLTA all'inizio
    const priceNumber = data.price ? Number(data.price) : 0;
    // Calcola il costo di spedizione (gratis se prezzo > 39.99)
    const shippingCost = priceNumber > 39.99 ? 0 : 9.99;
    // Calcola il prezzo totale (prezzo + tasse + spedizione)
    const totalPrice = (priceNumber + 1.50 + shippingCost).toFixed(2);

    // Determina se il prodotto è un gioco
    const isGame = category === "gioco";
    const isConsole = category === "console";
    const isAccessory = category === "accessorio";

    return (
        <>
            {/* // videogame card // */}
            <div className="container">
                <div className="card d-flex flex-row justify-content-between">
                    {/* Parte sinistra con titolo e prezzo */}
                    <div className="card-body-left">
                        <h5 className="card-title mb-2">{data.name}</h5>
                        <div className="image-try mb-5 mt-4">
                            <img className="image mr-4" src={data.image_url} alt={data.name} />
                        </div>

                        {/*  CATEGORIES CHECK
                       {isGame && (
                            <> */}

                        <p className="inline"> PEGI:
                            {data.pegi_rating === 3 ? (
                                <img className="pegi-image" src="/pegi/PEGI_3.png" alt="PEGI 3" />
                            ) : data.pegi_rating === 7 ? (
                                <img className="pegi-image" src="/pegi/PEGI_7.png" alt="PEGI 7" />
                            ) : data.pegi_rating === 12 ? (
                                <img className="pegi-image" src="/pegi/PEGI_12.png" alt="PEGI 12" />
                            ) : data.pegi_rating === 16 ? (
                                <img className="pegi-image" src="/pegi/PEGI_16.png" alt="PEGI 16" />
                            ) : data.pegi_rating === 18 ? (
                                <img className="pegi-image" src="/pegi/PEGI_18.png" alt="PEGI 18" />
                            ) : (
                                data.pegi_rating
                            )}
                        </p>
                        {/* 0 = no, 1 = si */}
                        <p className="inline">Online:  {data.online_mode === 1 ? (
                            <img className="pegi-image" src="/pegi/online.png" alt="online" />)
                            : data.online_mode === 0 ? (
                                <img className="pegi-image" src="/pegi/offline.png" alt="offline" />
                            ) : (
                                data.online_mode
                            )}
                        </p>
                        <p className="inline"> Modalità di gioco: {data.multiplayer === 1 ? (
                            <img className="pegi-image" src="/pegi/multiplayer.png" alt="multiplayer" />)
                            : data.multiplayer === 0 ? (
                                <img className="pegi-image" src="/pegi/singleplayer.png" alt="singleplayer" />
                            ) : (
                                data.multiplayer
                            )}
                        </p>
                        {/* )} */}
                        {/* </> */}
                        {/* 
                        {isAccessory && (
                            <p>Compatibilità: {data.compatibility}</p>
                        )} */}

                        <p>Descrizione: {data.description}</p>
                    </div>

                    {/* Parte destra con immagine e info extra */}
                    <div className="card-body-right justify-content-center d-flex-xl flex-wrap">
                        <div className="card-right-img">
                            <p className="card-text">
                                <strong>Prezzo: {data.price} €</strong></p>
                            <div className="total-price centered-price">Prezzo totale: {totalPrice} €</div>
                            <p>Compatibile con: {
                                data.supported_consoles
                                    ? JSON.parse(data.supported_consoles || "[]").map(console => console.trim()).join(", ")
                                    : "nessuna console specificata"
                            }</p>

                            {/* {isGame && (
                                <> */}

                            <p>Genere: {data.game_genre}</p>
                            <p>Publisher:  {data.publisher}</p>
                            {/* </> */}

                            {/* Mostra info specifiche per console */}
                            {/* {isConsole && (
            <p>Specifiche tecniche: {data.tech_specs}</p>
        )} */}

                            <p>Data di uscita: {new Date(data.release_date).toLocaleDateString('it-IT')}</p>
                            <div className="centered-price">    Costo spedizione: {shippingCost.toFixed(2)} €
                                {shippingCost === 0 && " (gratis)"}
                            </div>
                            <div className=" centered-price">Spedizione gratuita per ordini superiori a 40€</div>
                            <div className="tax centered-price">Tasse % 1,50</div>
                            <div className={`centered-price ${data.stock < 1 ? "hidden" : "available"}`}>
                                {data.stock < 1 ? "Non disponibile" : "Disponibile"}</div>
                            <div className={`centered-price ${data.stock > 0 ? "hidden" : "not-available"}`}>
                                Non Disponibile</div>
                            <button className="add-cart centered-price">Aggiungi al carrello</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
