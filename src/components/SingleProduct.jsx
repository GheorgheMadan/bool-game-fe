import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SingleProduct() {

    const [query, setQuery] = useState({})
    const [query2, setQuery2] = useState({})

    const productsData = () => {
        axios.get('http://localhost:3000/api/products/')
            .then(res => {
                setQuery(res.data);
                console.log(res.data)
            }
            )
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { productsData() }, [])

    const gamesData = () => {
        axios.get('http://localhost:3000/api/games/')
            .then(res => {
                setQuery2(res.data);
                console.log(res.data)
            }
            )
            .catch(err => console.error(err)
            )
    }
    useEffect(() => { gamesData() }, [])

    return (
        // videogame card //
        <div className="card">
            <div className="d-flex col-2-xl">
                <div className="card-body-sx">
                <h5 className="card-title">{query.name}</h5>
                <p className="card-text">{query.description}</p>
                </div>
                <div className="card-body-dx"></div>
            </div>
            <img src={query.image_url} className="card-img-top" alt={query.name} />
        </div>
    )
}