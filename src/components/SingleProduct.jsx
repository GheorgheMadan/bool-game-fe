import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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

    const gamesData = () => {
        axios.get('http://localhost:3000/api/games/1')
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
        
            <div className="card d-flex col-2-xl flex-nowrap">
                <div className="card-body-sx">
                <h5 className="card-title">{query.name}</h5>
                <p className="card-text">{query.price}</p>
                </div>
                <div className="card-body-dx">
                        <img src={query.image_url}  alt={query.name} />
                    {/* <div className="image-container">
                    </div> */}
                </div>
            </div>
        
    )
}