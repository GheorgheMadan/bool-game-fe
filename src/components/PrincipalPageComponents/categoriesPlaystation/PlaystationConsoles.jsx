import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/PlaystationPageStyle.css';

export default function PlaystationConsoles() {
    const [sortedRange1, setSortedRange1] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                const filteredProducts = filterProducts(response.data);
                console.log(response.data);

                const { range1 } = sortProductsById(filteredProducts);
                setSortedRange1(range1);
            })
            .catch(error => console.error(error));
    }, []);

    const filterProducts = (allProducts) => {
        return allProducts.filter(product => {
            const supportedConsoles = JSON.parse(product.supported_consoles || '[]');
            return (
                (product.category_name === "console" && product.name.includes("Play")) ||
                product.compatibility === "PS5" ||
                (Array.isArray(supportedConsoles) && supportedConsoles.some(console => console.includes("PlayStation")))
            );
        });
    };

    const sortProductsById = (filteredProducts) => {
        const range1 = filteredProducts.filter(product => product.category_name === 'console');
        return { range1 };
    };

    return (
        <>
            {/* Sezione per console */}
            <div className="playstation-product-section">
                <h3>Console</h3>
                <div className="playstation-product-list">
                    {sortedRange1.map(product => (
                        <div key={product.id} className="playstation-product-card">
                            <Link to={`/products/${product.id}`} className='playstation-product-link'>
                                <img src={product.image_url} alt={product.name} />
                                <h3>{product.name}</h3>
                            </Link>
                            <span>${product.price}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}