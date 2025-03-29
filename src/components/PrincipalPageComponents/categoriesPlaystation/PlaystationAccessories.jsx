import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/PlaystationPageStyle.css';

export default function PlaystationAccessories() {

    const [sortedRange2, setSortedRange2] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                const filteredProducts = filterProducts(response.data);
                console.log(response.data);

                const { range2 } = sortProductsById(filteredProducts);

                setSortedRange2(range2);
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
        const range2 = filteredProducts.filter(product => product.category_name === 'accessorio');

        return { range2 };
    };

    return (
        <>
            <div className="playstation-products-container">
                <div className='playstation-products-container-2 '>
                    < div className="playstation-product-section" >
                        {/* Sezione per accessori */}
                        <h3>Accessori</h3>
                        <div className="playstation-product-list">
                            {sortedRange2.map(product => (
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
                </div >
            </div>
        </>
    )
}