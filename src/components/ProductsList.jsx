import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleProduct from './SingleProduct';
import "../style/SingleProduct.css";

export default function ProductsList() {

    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios.get('http://localhost:3000/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error("Errore nel fetch dei prodotti:", error));
    };

    useEffect(() => { fetchProducts() }, []);

    return (
        <div className="sfondo">
            <h1 className="text-center">Videogiochi</h1>
            <div className="row">
                {products.map((product) => {
                    console.log("Passando ID:", product.id); // Debug
                    return (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <SingleProduct productId={product.id} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}