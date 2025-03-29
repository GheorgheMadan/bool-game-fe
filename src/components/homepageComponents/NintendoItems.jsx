import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function NintendoItems() {

    const [item, setItem] = useState({})
    const [item1, setItem1] = useState({})
    const [item2, setItem2] = useState({})

    function getNintendoItem() {
        axios.get('http://localhost:3000/api/products/131')
            .then(res => setItem(res.data))
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { getNintendoItem() }, [])

    function getNintendoItem1() {
        axios.get('http://localhost:3000/api/products/132')
            .then(res => setItem1(res.data))
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { getNintendoItem1() }, [])

    function getNintendoItem2() {
        axios.get('http://localhost:3000/api/products/133')
            .then(res => setItem2(res.data))
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { getNintendoItem2() }, [])

    return (
        <section>
            <Link>
                <h2 className="black-title title-h2">Scegli la tua Nintendo Switch Lite: Scopri le colorazioni disponibili!</h2>
            </Link>
            <div className="container-nintendo-items">
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