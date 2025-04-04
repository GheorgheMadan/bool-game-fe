import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function NintendoItems() {

    // Stati per memorizzare i dettagli dei 3 prodotti
    const [item, setItem] = useState({})
    const [item1, setItem1] = useState({})
    const [item2, setItem2] = useState({})

    // Funzione per recuperare il primo prodotto Nintendo Switch Lite
    function getNintendoItem() {
        axios.get('http://localhost:3000/api/products/131')
            .then(res => setItem(res.data))  // Salva il prodotto ricevuto nello stato 'item'
            .catch(err => console.error(err)
            )
    }
    // Esegui la chiamata per il primo prodotto quando il componente viene caricato
    useEffect(() => { getNintendoItem() }, [])

    // Funzione per recuperare il secondo prodotto Nintendo Switch Lite
    function getNintendoItem1() {
        axios.get('http://localhost:3000/api/products/132')
            .then(res => setItem1(res.data))
            .catch(err => console.error(err)
            )
    }
    // Esegui la chiamata per il secondo prodotto quando il componente viene caricato
    useEffect(() => { getNintendoItem1() }, [])

    // Funzione per recuperare il terzo prodotto Nintendo Switch Lite
    function getNintendoItem2() {
        axios.get('http://localhost:3000/api/products/133')
            .then(res => setItem2(res.data))
            .catch(err => console.error(err)
            )
    }
    // Esegui la chiamata per il terzo prodotto quando il componente viene caricato
    useEffect(() => { getNintendoItem2() }, [])

    return (
        <section>
            {/* Titolo della sezione */}
            <Link>
                <h2 className="black-title title-h2 nintendo-title">Scegli la tua Nintendo Switch Lite: Scopri le colorazioni disponibili!</h2>
            </Link>
            <div className="container-nintendo-items">
                {/* Box per il primo prodotto */}
                <div className="box-nintendo">
                    <div>
                        <Link to={`/products/${item.id}`}>
                            <img src={item.image_url} alt={item.name} className="img-nintendo" />
                        </Link>
                    </div>
                    <div className="container-details-nintendo">
                        <Link to={`/products/${item.id}`}>
                            <h4>{item.name}</h4>
                        </Link>
                        <span>€ {item.price}</span>
                        <Link to={`/products/${item.id}`}>
                            <button className="btn-blue">Acquista ora!</button>
                        </Link>
                    </div>
                </div>
                {/* Box per il secondo prodotto */}
                <div className="box-nintendo">
                    <div className="container-details-nintendo">
                        <Link to={`/products/${item1.id}`}>
                            <h4>{item1.name}</h4>
                        </Link>
                        <span>€ {item1.price}</span>
                        <Link to={`/products/${item1.id}`}>
                            <button className="btn-pink">Acquista ora!</button>
                        </Link>
                    </div>
                    <div>
                        <Link>
                            <img src={item1.image_url} alt={item1.name} className="img-nintendo" />
                        </Link>
                    </div>

                </div>
                {/* Box per il terzo prodotto */}
                <div className="box-nintendo">
                    <div>
                        <Link to={`/products/${item2.id}`}>
                            <img src={item2.image_url} alt={item2.name} className="img-nintendo" />
                        </Link>
                    </div>
                    <div className="container-details-nintendo">
                        <Link to={`/products/${item2.id}`}>
                            <h4>{item2.name}</h4>
                        </Link>
                        <span>€ {item2.price}</span>
                        <Link to={`/products/${item2.id}`}>
                            <button>Acquista ora!</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}