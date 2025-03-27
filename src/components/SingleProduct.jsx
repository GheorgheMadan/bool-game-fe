import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from "react-bootstrap";
import '../style/SingleProduct.css'

export default function SingleProduct() {

    const [query, setQuery] = useState({})
    const [query2, setQuery2] = useState({})

    const productsData = () => {
        axios.get('http://localhost:3000/api/products/1')
            .then(res => {
                setQuery(res.data);
                console.log(res.data)
            }
            )
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { productsData() }, [])

    // const gamesData = () => {
    //     axios.get('http://localhost:3000/api/products/search?category=gioco')
    //         .then(res => {
    //             setQuery2(res.data);
    //             console.log(res.data)
    //         }
    //         )
    //         .catch(err => console.error(err)
    //         )
    // }
    // useEffect(() => { gamesData() }, [])

    function fetchGames() {
        axios.get('http://localhost:3000/api/products/search?category=gioco')
            .then(res => {
                setQuery2(res.data[0]);
                // console.log(res.data)
            }
            )
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { fetchGames() }, [])

    return (
        // videogame card //


        <div className="card d-flex flex-row p-4 border rounded-lg shadow-lg items-start">
            {/* Parte sinistra con titolo e prezzo */}
            <div className="card-body-left flex flex-col items-start">
                <h5 className="card-title font-bold text-lg mb-2">{query.name}</h5>
                <p className="card-text font-semibold text-gray-700 text-lg">
                    {query.price}
                    <p>lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta excepturi ducimus architecto iure doloribus consequuntur animi corrupti fuga. Laborum aut magnam deleniti sequi expedita quod molestiae, animi atque repellat doloremque.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa non quod officia. Adipisci saepe fugiat, beatae illo rerum ipsa impedit, commodi blanditiis reprehenderit at officia odio odit, porro quibusdam dolorum.
                        lorem
                    </p>
                </p>
            </div>

            {/* Parte destra con immagine e info extra */}
            <div className="card-body-right flex-xl flex-row items-start px-4">
                <img className="image-small mr-4" src={query.image_url} alt={query.name} />

                <div className="card-right-img">
                    <div className="total-price">Prezzo totale: """"</div>
                    <div className="shipping-cost"> Costo spedizione $9.99</div>
                    <div className="tax">Tasse % 1,50</div>
                    <div className="shipping-free">Spedizione gratuita per ordini superiori a 40$</div>
                    <div className="available">Disponiblie</div>
                    <button className="add-cart">Aggiungi al carrello</button>
                </div>

                {/* <p>{query2.description}</p> */}
                <div>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Sezione 1</Accordion.Header>
                            <Accordion.Body>
                                {query2.description}
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Sezione 2</Accordion.Header>
                            <Accordion.Body>
                                Contenuto della seconda sezione.
                            </Accordion.Body>
                        </Accordion.Item>


                    </Accordion>
                </div>

            </div>
        </div>

    )
}