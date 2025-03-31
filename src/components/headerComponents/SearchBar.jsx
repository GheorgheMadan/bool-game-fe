import '../../style/HeaderStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import GlobalContextResults from '../../contexts/GlobalContextResult';
import { useCart } from '../../contexts/CartContext'; // Importa il contesto del carrello

export default function SearchBar() {
    const { cart } = useCart(); // Ottieni il carrello dal contesto
    const { setResults } = useContext(GlobalContextResults); // Aggiorna i risultati nel contesto globale
    const [isOpen, setIsOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams(); // Hook per gestire i parametri di query
    const [input, setInput] = useState(searchParams.get('name') || ''); // Stato per il testo della ricerca
    const navigate = useNavigate();

    // Calcola il numero totale di prodotti nel carrello
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Funzione per aprire/chiudere la barra di ricerca
    function toggleSearch() {
        setIsOpen(!isOpen);
    }

    // Funzione per gestire il cambio di input
    function handleChange(e) {
        const value = e.target.value;
        setInput(value);
    }

    // Funzione per gestire la ricerca
    async function search(e) {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/products/search?name=${input}`);
            setResults(response.data); // Aggiorna i risultati nel contesto globale
            navigate(`/search?name=${input}`); // Naviga alla pagina dei risultati di ricerca mantenendo i parametri di query
            setInput(''); // Resetta l'input dopo la ricerca
        } catch (err) {
            console.error('Errore durante la ricerca:', err);
        }
    }

    return (
        <div className='container-icons'>
            <div className={`container-search ${isOpen ? 'open' : ''}`}>
                <form onSubmit={search}>
                    <input
                        type="text"
                        name="text"
                        value={input}
                        onChange={handleChange}
                        placeholder="Cerca..."
                    />
                </form>
                <button onClick={toggleSearch}>
                    <FontAwesomeIcon icon={faSearch} className='icon' />
                </button>
            </div>
            <div className='container-cart'>
                <NavLink to='/cart'>
                    <FontAwesomeIcon icon={faShoppingCart} className='icon' />
                    {totalItems > 0 && (
                        <span className='cart-count'>{totalItems}</span>
                    )}
                </NavLink>
            </div>
        </div>
    );
}