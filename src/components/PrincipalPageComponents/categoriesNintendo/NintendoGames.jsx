import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/NintendoPageStyle.css';

export default function NintendoGames() {
    const [sortedRange3, setSortedRange3] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                // Filtra i prodotti prima, poi ordina in base agli ID
                const filteredProducts = filterProducts(response.data);
                const { range3 } = sortProductsById(filteredProducts);
                setSortedRange3(range3);
            })
            .catch(error => console.error(error));
    }, []);

    // Funzione per filtrare i prodotti in base ai criteri specificati
    const filterProducts = (allProducts) => {
        return allProducts.filter(product => {
            const supportedConsoles = JSON.parse(product.supported_consoles || '[]'); // Assicurati che supported_consoles sia un array
            return (
                (product.category_name === "console" && /Nintendo/i.test(product.name)) ||
                /Nintendo/i.test(product.compatibility) ||
                (Array.isArray(supportedConsoles) && supportedConsoles.some(console => /Nintendo/i.test(console)))
            );
        });
    };

    // Funzione per ordinare i prodotti in base agli ID (dal 119-139, 101-118, 1-100)
    const sortProductsById = (filteredProducts) => {
        const range3 = filteredProducts.filter(product => product.category_name === 'gioco');

        return { range3 };
    };
    return (
        <>
            {/* Sezione per giochi */}
            <div className="nintendo-product-section">
                <h3>Giochi</h3>
                <div className="nintendo-product-list">
                    {sortedRange3.map(product => (
                        <div key={product.id} className="nintendo-product-card">
                            <Link to={`/products/${product.id}`} className='nintendo-product-link'>
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