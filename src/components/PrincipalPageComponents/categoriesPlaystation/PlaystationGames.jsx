import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/PlaystationPageStyle.css';


export default function PlaystationGames() {
    const [sortedRange3, setSortedRange3] = useState([]);
    // Stato per il genere selezionato dal menu a tendina
    const [selectedGenre, setSelectedGenre] = useState('');
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

    // Gestione onChange che filtrerà i giochi in base alla scelta 
    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    }

    // filtro i giochi 
    const filteredGames = selectedGenre ? sortedRange3.filter(game => game.game_genre && game.game_genre.includes(selectedGenre)) : sortedRange3

    return (
        <>
            {/* Sezione per giochi */}
            < div className="playstation-product-section" >
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
                <div className="playstation-product-list">
                    {filteredGames.length === 0 ? <h3>Nessun gioco trovato</h3> : filteredGames
                        .map(product => (
                            <div key={product.id} className="playstation-product-card">
                                <Link to={`/products/${product.id}`} className='playstation-product-link'>
                                    <img src={product.image_url} alt={product.name} />
                                    <h3>{product.name}</h3>
                                </Link>
                                <span>€{product.price}</span>
                            </div>
                        ))}
                </div>
            </div >
        </>
    )
}