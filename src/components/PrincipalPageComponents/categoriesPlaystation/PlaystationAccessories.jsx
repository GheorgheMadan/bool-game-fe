import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/PlaystationPageStyle.css';

export default function PlaystationAccessories() {

    // Stato per memorizzare gli accessori filtrati e ordinati
    const [sortedRange2, setSortedRange2] = useState([]);

    // useEffect per caricare i dati dei prodotti all'inizio
    useEffect(() => {

        // Chiamata API per ottenere tutti i prodotti
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                // Filtra i prodotti in base alla compatibilità con PlayStation
                const filteredProducts = filterProducts(response.data);
                console.log(response.data);
                // Ordina i prodotti filtrati per categoria accessorio
                const { range2 } = sortProductsById(filteredProducts);
                // Imposta lo stato con i prodotti filtrati e ordinati
                setSortedRange2(range2);
            })
            .catch(error => console.error(error));
    }, []);  // Esegui una sola volta al caricamento del componente

    // Funzione per filtrare i prodotti in base alla compatibilità con PlayStation
    const filterProducts = (allProducts) => {
        return allProducts.filter(product => {
            // Parsiamo i supporti delle console come array
            const supportedConsoles = JSON.parse(product.supported_consoles || '[]');
            return (
                (product.category_name === "console" && product.name.includes("Play")) ||
                product.compatibility === "PS5" ||
                (Array.isArray(supportedConsoles) && supportedConsoles.some(console => console.includes("PlayStation")))
            );
        });
    };
    // Funzione per ordinare i prodotti filtrati per categoria "accessorio"
    const sortProductsById = (filteredProducts) => {
        const range2 = filteredProducts.filter(product => product.category_name === 'accessorio');
        // Restituisce solo gli accessori filtrati
        return { range2 };
    };

    return (
        <>
            < div className="playstation-product-section" >
                {/* Sezione per accessori */}
                <h3>Accessori</h3>
                <div className="playstation-product-list">
                    {/* Mappatura dei prodotti filtrati e ordinati */}
                    {sortedRange2.map(product => (
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