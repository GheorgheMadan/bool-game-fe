import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/NintendoPageStyle.css';

export default function NintendoGames() {
    const [sortedRange3, setSortedRange3] = useState([]);

    // Stato per il genere selezionato dal menu a tendina
    const [selectedGenre, setSelectedGenre] = useState('');

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

    // Gestione onChange che filtrerà i giochi in base alla scelta 
    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    }

    // filtro i giochi 
    const filteredGames = selectedGenre ? sortedRange3.filter(game => game.game_genre && game.game_genre.includes(selectedGenre)) : sortedRange3

    return (
        <>
            {/* Sezione per giochi */}
            <div className="nintendo-product-section">
                <h3>Giochi</h3>
                <label for="filter-game-genre">Filtra per:</label>
                <select name="game_genre" id="game-genre" onChange={handleGenreChange}>
                    <option value="">Scegli un opzione</option>
                    <option value="First-Person Shooter">First-Person Shooter</option>
                    <option value="Action-Adventure">Action-Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Platform">Platform</option>
                    <option value="Life Simulation">Life Simulation</option>
                    <option value="Action RPG">Action RPG</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Sport">Sport</option>
                    <option value="Sandbox">Sandbox</option>
                    <option value="Sopravvivenza e Crafting">Sopravvivenza e Crafting</option>
                    <option value="Racing">Racing</option>
                    <option value="Rogue-like">Rogue-like</option>
                    <option value="JRPG">JRPG</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Stealth">Stealth</option>
                    <option value="Music/Dance">Music/Dance</option>
                    <option value="Tactical RPG">Tactical RPG</option>
                    <option value="Survival Horror">Survival Horror</option>
                    <option value="MMORPG">MMORPG</option>
                    <option value="Third-person Shooter">Third-person Shooter</option>
                    <option value="Survival Horror, RPG">Survival Horror, RPG</option>
                    <option value="Party">Party</option>
                    <option value="Action-Adventure, Platform">Action-Adventure, Platform</option>
                    <option value="Shooter">Shooter</option>
                </select>
                <div className="nintendo-product-list">
                    {filteredGames.map(product => (
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