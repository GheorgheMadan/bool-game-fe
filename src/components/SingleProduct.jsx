import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from "react-bootstrap";
import '../style/SingleProduct.css'

export default function SingleProduct({ productId }) {

    const [data, setData] = useState([])

    const productsData = () => {
        axios.get('http://localhost:3000/api/products')
            .then(res => {
                setData(res.data[0]);
                console.log(res.data)
            }
            )
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { productsData() }, [])

    // const [product, setProduct] = useState(null);

    // useEffect(() => {
    //     axios.get(`http://localhost:3000/api/products/${productId}`)
    //         .then(res => {
    //             console.log("Dati prodotto:", res.data); // Debug
    //             if (res.data && res.data.id) {  // Verifica che i dati siano validi
    //                 setProduct(res.data);
    //             } else {
    //                 console.error("Dati prodotto non validi:", res.data);
    //                 setError("Prodotto non trovato");
    //             }
    //         })
    //         .catch(err => console.error(err));
    //     setError("Errore nel caricamento del prodotto");
    // }, [productId]);

    // if (!product) return (<div>Caricamento...</div>);

    // Calcola il costo di spedizione (gratis se prezzo > 39.99)
    const shippingCost = data.price && Number(data.price) > 39.99 ? 0 : 9.99;

    // Calcola il prezzo totale (prezzo + tasse + spedizione)
    const totalPrice = data.price
        ? (Number(data.price) + 1.50 + shippingCost).toFixed(2)
        : "0.00";

    return (
        <>
            {/* // videogame card // */}
            <div className="card mb-1 d-flex flex-row justify-content-between">
                {/* Parte sinistra con titolo e prezzo */}
                <div className="card-body-left">
                    <p className="card-text">
                        <strong>Prezzo: {data.price} €</strong></p>
                    <p>Compatibile con: {data.supported_consoles}</p>
                    <p>Genere: {data.game_genre}</p>
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
                    <p>Publisher:  {data.publisher}</p>
                    <p>Data di uscita: {new Date(data.release_date).toLocaleDateString('it-IT')}</p>
                    <Accordion defaultActiveKey="0  ">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><strong>Scopri di più</strong></Accordion.Header>
                            <Accordion.Body>
                                {data.description}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>

                {/* Parte destra con immagine e info extra */}
                <div className="card-body-right justify-content-center d-flex-xl flex-wrap">
                    <h5 className="card-title font-bold text-xl mb-2">{data.name}</h5>
                    <div className="image-container">
                        <img className="image-small mr-4" src={data.image_url} alt={data.name} />
                    </div>
                    <div className="card-right-img">
                        <div className="total-price centered-price">Prezzo totale: {totalPrice} €</div>
                        <div className="shipping-cost centered-price">    Costo spedizione: {shippingCost.toFixed(2)} €
                            {shippingCost === 0 && " (gratis)"}
                        </div>
                        <div className="shipping-free centered-price">Spedizione gratuita per ordini superiori a 40€</div>
                        <div className="tax centered-price">Tasse % 1,50</div>
                        <div className={`centered-price ${data.stock < 1 ? "hidden" : "available"}`}>
                            {data.stock < 1 ? "Non disponibile" : "Disponibile"}</div>
                        <div className={`centered-price ${data.stock > 0 ? "hidden" : "not-available"}`}>
                            Non Disponibile</div>
                        <button className="add-cart centered-price">Aggiungi al carrello</button>
                    </div>
                </div>
            </div>

        </>
    )
}