import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/XboxPageStyle.css';

export default function XboxConsoles() {
    // Stato per memorizzare le console filtrate e ordinate
    const [sortedRange1, setSortedRange1] = useState([]);
    // useEffect per caricare i dati dei prodotti una sola volta al caricamento del componente
    useEffect(() => {
        // Chiamata API per ottenere tutti i prodotti dal backend
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                // Filtra i prodotti in base alla compatibilità con Xbox
                const filteredProducts = filterProducts(response.data);
                // Ordina i prodotti filtrati in base alla categoria "console"
                const { range1 } = sortProductsById(filteredProducts);
                // Imposta lo stato con le console filtrate e ordinate
                setSortedRange1(range1);
            })
            .catch(error => console.error(error));
    }, []);

    // Funzione per filtrare i prodotti in base ai criteri specificati
    const filterProducts = (allProducts) => {
        return allProducts.filter(product => {
            // Parsiamo le console supportate come array
            const supportedConsoles = JSON.parse(product.supported_consoles || '[]');
            return (
                // Verifica se il prodotto è una console Xbox o è compatibile con Xbox
                (product.category_name === "console" && /Xbox/i.test(product.name)) ||
                /Xbox/i.test(product.compatibility) ||
                // Verifica le console supportate e se supportano Xbox
                (Array.isArray(supportedConsoles) && supportedConsoles.some(console => /Xbox/i.test(console)))
            );
        });
    };

    // Funzione per ordinare i prodotti in base agli ID (dal 119-139, 101-118, 1-100)
    const sortProductsById = (filteredProducts) => {
        // Filtra i prodotti appartenenti alla categoria "console"
        const range1 = filteredProducts.filter(product => product.category_name === 'console');

        return { range1 };
    };
    return (
        <>
            {/* Sezione per console */}
            <div className="xbox-product-section">
                <h3>Console</h3>
                {/* Lista delle console Xbox */}
                <div className="xbox-product-list">
                    {sortedRange1.map(product => (
                        <div key={product.id} className="xbox-product-card">
                            <Link to={`/products/${product.id}`} className='xbox-product-link'>
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