import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/XboxPageStyle.css';

export default function XboxAccessories() {
    const [sortedRange2, setSortedRange2] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                const filteredProducts = filterProducts(response.data);
                const { range2 } = sortProductsById(filteredProducts);
                setSortedRange2(range2);
            })
            .catch(error => console.error(error));
    }, []);

    // Funzione per filtrare i prodotti in base ai criteri specificati
    const filterProducts = (allProducts) => {
        return allProducts.filter(product => {
            const supportedConsoles = JSON.parse(product.supported_consoles || '[]');
            return (
                (product.category_name === "console" && /Xbox/i.test(product.name)) ||
                /Xbox/i.test(product.compatibility) ||
                (Array.isArray(supportedConsoles) && supportedConsoles.some(console => /Xbox/i.test(console)))
            );
        });
    };

    // Funzione per ordinare i prodotti in base agli ID (dal 119-139, 101-118, 1-100)
    const sortProductsById = (filteredProducts) => {
        const range2 = filteredProducts.filter(product => product.category_name === 'accessorio');

        return { range2 };
    };

    return (
        <>
            {/* Sezione per accessori */}
            <div className="xbox-product-section">
                <h3>Accessori</h3>
                <div className="xbox-product-list">
                    {sortedRange2.map(product => (
                        <div key={product.id} className="xbox-product-card">
                            <Link to={`/products/${product.id}`} className='xbox-product-link'>
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