import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/PlaystationPageStyle.css';

export default function PlaystationConsoles() {
    // Stato per memorizzare le console PlayStation filtrate e ordinate
    const [sortedRange1, setSortedRange1] = useState([]);

    // useEffect per caricare i dati dei prodotti all'inizio
    useEffect(() => {
        // Chiamata API per ottenere tutti i prodotti dal backend
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                // Filtra i prodotti in base alla compatibilità con PlayStation
                const filteredProducts = filterProducts(response.data);
                console.log(response.data);
                // Ordina i prodotti filtrati per categoria "console"
                const { range1 } = sortProductsById(filteredProducts);
                // Imposta lo stato con le console filtrate e ordinate
                setSortedRange1(range1);
            })
            .catch(error => console.error(error));
    }, []);  // Esegui una sola volta al caricamento del componente

    // Funzione per filtrare i prodotti in base alla compatibilità con PlayStation
    const filterProducts = (allProducts) => {
        return allProducts.filter(product => {
            // Funzione per filtrare i prodotti in base alla compatibilità con PlayStation
            const supportedConsoles = JSON.parse(product.supported_consoles || '[]');
            return (
                (product.category_name === "console" && product.name.includes("Play")) ||
                product.compatibility === "PS5" ||
                (Array.isArray(supportedConsoles) && supportedConsoles.some(console => console.includes("PlayStation")))
            );
        });
    };


    // Funzione per ordinare i prodotti filtrati per categoria "console"
    const sortProductsById = (filteredProducts) => {
        // Filtra i prodotti appartenenti alla categoria "console"
        const range1 = filteredProducts.filter(product => product.category_name === 'console');
        // Restituisce solo le console filtrate
        return { range1 };
    };

    return (
        <>
            <div className="playstation-product-section">
                {/* Sezione per visualizzare le console PlayStation */}
                <h3>Console</h3>
                <div className="playstation-product-list">
                    {/* Mappatura dei prodotti filtrati e ordinati */}
                    {sortedRange1.map(product => (
                        <div key={product.id} className="playstation-product-card">
                            {/* Link al dettaglio del prodotto */}
                            <Link to={`/products/${product.id}`} className='playstation-product-link'>
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