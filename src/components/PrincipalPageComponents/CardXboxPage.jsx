import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/PrincipalPageStyle/XboxPageStyle.css';

const XboxProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                // Filtra i prodotti prima, poi ordina in base agli ID
                const filteredProducts = filterProducts(response.data);
                const sortedProducts = sortProductsById(filteredProducts);
                setProducts(sortedProducts);
            })
            .catch(error => console.error(error));
    }, []);

    // Funzione per filtrare i prodotti in base ai criteri specificati
    const filterProducts = (allProducts) => {
        return allProducts.filter(product => {
            const supportedConsoles = JSON.parse(product.supported_consoles || '[]'); // Assicurati che supported_consoles sia un array

            return (
                (product.category_name === "console" && /Xbox/i.test(product.name)) ||
                /Xbox/i.test(product.compatibility) ||
                (Array.isArray(supportedConsoles) && supportedConsoles.some(console => /Xbox/i.test(console)))
            );
        });
    };

    // Funzione per ordinare i prodotti in base agli ID (dal 119-139, 101-118, 1-100)
    const sortProductsById = (filteredProducts) => {
        const range1 = filteredProducts.filter(product => product.id >= 119 && product.id <= 139);
        const range2 = filteredProducts.filter(product => product.id >= 101 && product.id <= 118);
        const range3 = filteredProducts.filter(product => product.id >= 1 && product.id <= 100);

        // Ordina ogni gruppo per ID
        const sortedRange1 = range1.sort((a, b) => a.id - b.id);
        const sortedRange2 = range2.sort((a, b) => a.id - b.id);
        const sortedRange3 = range3.sort((a, b) => a.id - b.id);

        // Combina i gruppi in ordine
        return [...sortedRange1, ...sortedRange2, ...sortedRange3];
    };

    return (
        <div className="xbox-products-container">
            <h2 className='xbox-h2'>Benvenuto nel mondo Xbox</h2>
            {products.length > 0 ? (
                <div className="xbox-product-list">
                    {products.map(product => (
                        <div key={product.id} className="xbox-product-card">
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
}

export default XboxProducts;
