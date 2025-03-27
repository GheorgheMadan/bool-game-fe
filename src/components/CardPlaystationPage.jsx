import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/PlaystationPageStyle.css';

const PlaystationProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                setProducts(response.data);
                filterProducts(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const filterProducts = (allProducts) => {
        const filtered = allProducts.filter(product => {
            // Converte la stringa JSON di supported_consoles in un array
            let supportedConsoles = [];
            if (product.supported_consoles) {
                try {
                    supportedConsoles = JSON.parse(product.supported_consoles);
                } catch (error) {
                    console.error("Errore nel parsing di supported_consoles:", error);
                }
            }

            return (
                (Array.isArray(supportedConsoles) && supportedConsoles.some(console => console.includes("PlayStation"))) ||
                product.compatibility === "PS5" ||
                (product.category_name === "console" && product.name.includes("Play"))
            );
        });

        setFilteredProducts(filtered);
    };

    return (
        <div className="products-container">
            {filteredProducts.length > 0 ? (
                <div className="product-list">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image_url} alt={product.name} />
                            <h3>{product.name}</h3>
                            <span>${product.price}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Caricamento prodotti...</p>
            )}
        </div>
    );
};

export default PlaystationProducts;
