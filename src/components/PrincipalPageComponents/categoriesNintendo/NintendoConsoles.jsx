import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/NintendoPageStyle.css';



export default function NintendoConsoles() {
    // Stato per memorizzare le console ordinate
    const [sortedRange1, setSortedRange1] = useState([]);

    // useEffect per caricare i dati dei prodotti all'inizio
    useEffect(() => {
        // Chiamata API per ottenere tutti i prodotti
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                // Filtra i prodotti prima, poi ordina in base agli ID
                const filteredProducts = filterProducts(response.data);
                const { range1 } = sortProductsById(filteredProducts);
                setSortedRange1(range1);
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
        const range1 = filteredProducts.filter(product => product.category_name === 'console');

        return { range1 };
    };

    return (
        <>
            {/* Sezione per console */}
            <div className="nintendo-product-section">
                <h3>Console</h3>
                <div className="nintendo-product-list">
                    {/* Mappa i prodotti e mostra ogni console */}
                    {sortedRange1.map(product => (
                        <div key={product.id} className="nintendo-product-card">
                            <Link to={`/products/${product.id}`} className='nintendo-product-link'>
                                <img src={product.image_url} alt={product.name} />
                                <h3>{product.name}</h3>
                            </Link>
                            <span>€{product.price}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}