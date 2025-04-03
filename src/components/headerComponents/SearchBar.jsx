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
    const { cart } = useCart();  // Ottieni il carrello dal contesto globale
    const { setResults } = useContext(GlobalContextResults); // Aggiorna i risultati nel contesto globale
    const [isOpen, setIsOpen] = useState(false);   // Stato per gestire l'apertura e la chiusura della barra di ricerca
    const [searchParams, setSearchParams] = useSearchParams();  // Hook per gestire i parametri di query nell'URL
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
    async function search(e) {  // Impedisce il comportamento predefinito del form (refresh della pagina)
        e.preventDefault();
        try {
            // Effettua una richiesta GET al server per cercare i prodotti con il nome inserito nell'input
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
            {/* Contenitore della barra di ricerca */}
            <div className={`container-search-header ${isOpen ? 'open' : ''}`}>
                <form onSubmit={search}>
                    <input
                        className='input-search-header'
                        type="text"
                        name="text"
                        value={input}
                        onChange={handleChange}
                        placeholder="Cerca..."
                    />
                </form>
                {/* Icona per aprire/chiudere la ricerca */}
                <button onClick={toggleSearch}>
                    <FontAwesomeIcon icon={faSearch} className='icon' />
                </button>
            </div>
            {/* Contenitore del carrello */}
            <div className='container-cart'>
                <NavLink to='/cart'>
                    <FontAwesomeIcon icon={faShoppingCart} className='icon' />
                    {/* Mostra il numero di articoli nel carrello se maggiore di zero */}
                    {totalItems > 0 && (
                        <span className='cart-count'>{totalItems}</span>
                    )}
                </NavLink>
            </div>
        </div>
    );
}