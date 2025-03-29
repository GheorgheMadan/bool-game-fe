import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/PlaystationPageStyle.css';


export default function PlaystationGames() {
    const [sortedRange3, setSortedRange3] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                const filteredProducts = filterProducts(response.data);
                console.log(response.data);

                const { range3 } = sortProductsById(filteredProducts);
                setSortedRange3(range3);
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
        const range3 = filteredProducts.filter(product => product.category_name === 'gioco');
        return { range3 };
    };
    return (
        <>
            <div className="playstation-products-container">
                {/* Sezione per giochi */}
                <div className='playstation-products-container-2'>
                    < div className="playstation-product-section" >
                        <h3>Giochi</h3>
                        <div className="playstation-product-list">
                            {sortedRange3.map(product => (
                                <div key={product.id} className="playstation-product-card">
                                    <Link to={`/products/${product.id}`} className='playstation-product-link'>
                                        <img src={product.image_url} alt={product.name} />
                                        <h3>{product.name}</h3>
                                    </Link>
                                    <span>${product.price}</span>
                                </div>
                            ))}
                        </div>
                    </div >
                </div>
            </div>
        </>
    )
}