import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../style/PrincipalPageStyle/PlaystationPageStyle.css';


export default function PlaystationGames() {
    // Stato per memorizzare i giochi filtrati e ordinati
    const [sortedRange3, setSortedRange3] = useState([]);
    // Stato per il genere selezionato dal menu a tendina
    const [selectedGenre, setSelectedGenre] = useState('');
    // useEffect per caricare i dati dei prodotti all'inizio
    useEffect(() => {
        // Chiamata API per ottenere tutti i prodotti dal backend
        axios.get('http://localhost:3000/api/products/')
            .then(response => {
                // Filtra i prodotti in base alla compatibilità con PlayStation
                const filteredProducts = filterProducts(response.data);
                console.log(response.data);
                // Ordina i prodotti filtrati per categoria "gioco"
                const { range3 } = sortProductsById(filteredProducts);
                // Imposta lo stato con i giochi filtrati e ordinati
                setSortedRange3(range3);
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

    // Funzione per ordinare i prodotti filtrati per categoria "gioco"
    const sortProductsById = (filteredProducts) => {
        // Filtra i prodotti appartenenti alla categoria "gioco"
        const range3 = filteredProducts.filter(product => product.category_name === 'gioco');
        // Restituisce solo i giochi filtrati
        return { range3 };
    };

    // Gestione onChange che filtrerà i giochi in base alla scelta 
    const handleGenreChange = (e) => {
        // Imposta il genere selezionato
        setSelectedGenre(e.target.value);
    }

    // Filtra i giochi in base al genere selezionato
    const filteredGames = selectedGenre ? sortedRange3.filter(game => game.game_genre && game.game_genre.includes(selectedGenre)) : sortedRange3

    return (
        <>
            {/* Sezione per giochi */}
            < div className="playstation-product-section" >
                <h3>Giochi</h3>
                {/* Menu a tendina per selezionare il genere di gioco */}
                <label className='playstation-product-genre' for="filter-game-genre">Filtra per:</label>
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
                {/* Lista dei giochi filtrati */}
                <div className="playstation-product-list">
                    {/* Se non ci sono giochi filtrati, mostra un messaggio */}
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