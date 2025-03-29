import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../style/PrincipalPageStyle/XboxPageStyle.css';

const XboxProducts = () => {
    const [sortedRange1, setSortedRange1] = useState([]);
    const [sortedRange2, setSortedRange2] = useState([]);
    const [sortedRange3, setSortedRange3] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                const filteredProducts = filterProducts(response.data);
                const { range1, range2, range3 } = sortProductsById(filteredProducts);
                setSortedRange1(range1);
                setSortedRange2(range2);
                setSortedRange3(range3);
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
        const range1 = filteredProducts.filter(product => product.category_name === 'console');
        const range2 = filteredProducts.filter(product => product.category_name === 'accessorio');
        const range3 = filteredProducts.filter(product => product.category_name === 'gioco');

        return { range1, range2, range3 };
    };

    return (
        <div className="xbox-products-container">
            <div className='xbox-products-container-2'>
                <h2 className='xbox-h2'>Benvenuto nel mondo Xbox</h2>

                {/* Sezione per console */}
                <div className="xbox-product-section">
                    <h3>Console</h3>
                    <div className="xbox-product-list">
                        {sortedRange1.map(product => (
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

                {/* Sezione per giochi */}
                <div className="xbox-product-section">
                    <h3>Giochi</h3>
                    <div className="xbox-product-list">
                        {sortedRange3.map(product => (
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
            </div>
        </div>
    );
}

export default XboxProducts;
