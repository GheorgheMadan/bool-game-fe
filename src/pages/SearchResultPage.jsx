import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GlobalContextResults from '../contexts/GlobalContextResult';
import '../style/SearchResultsStyle.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Aggiungi questa importazione

export default function SearchResults() {
    const { results, setResults } = useContext(GlobalContextResults);
    const [searchParams, setSearchParams] = useSearchParams(); // Hook per gestire i parametri di query
    const selectedCategory = searchParams.get('category') || ''; // Leggi la categoria dall'URL
    const searchQuery = searchParams.get('name') || ''; // Leggi il nome cercato dall'URL
    const [sortType, setSortType] = useState('default'); // Nuovo stato per l'ordinamento

    // Effettua la chiamata API quando il componente viene caricato o i parametri cambiano
    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Costruisci l'URL con i parametri di query
                let url = 'http://localhost:3000/api/products/search';
                const params = [];
                if (searchQuery) params.push(`name=${searchQuery}`);
                if (selectedCategory) params.push(`category=${selectedCategory}`);
                if (params.length > 0) {
                    url += `?${params.join('&')}`;
                }
                const response = await axios.get(url);
                setResults(response.data);
            } catch (err) {
                console.error('Errore durante il recupero dei risultati:', err);
            }
        };
        // Esegui la chiamata API immediatamente al caricamento del componente
        fetchResults();
    }, [searchQuery, selectedCategory, setResults]);


    // Filtra i risultati in base alla categoria e al nome cercato
    const filteredResults = results.filter(result => {
        const matchesCategory = selectedCategory ? result.category_name === selectedCategory : true;
        const matchesSearchQuery = searchQuery ? result.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        return matchesCategory && matchesSearchQuery;
    });

    // Funzione per aggiornare i parametri di query
    const updateCategory = (category) => {
        const params = {};
        if (category) params.category = category; // Aggiungi la categoria ai parametri
        if (searchQuery) params.name = searchQuery; // Mantieni il parametro di ricerca
        setSearchParams(params); // Aggiorna i parametri di query senza ricaricare la pagina
    };

    // Funzione per ordinare i risultati
    const getSortedResults = (results) => {
        const sortedResults = [...results];

        switch (sortType) {
            case 'price-asc':
                return sortedResults.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sortedResults.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return sortedResults.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return sortedResults.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return sortedResults;
        }
    };

    // Applica prima il filtro e poi l'ordinamento
    const filteredAndSortedResults = getSortedResults(filteredResults);

    return (
        <div className='container-search-page'>
            <h2 className='search-title'>Risultati della ricerca</h2>

            {/* Sezione per i pulsanti di filtro */}
            <div className="filter-buttons">
                <button onClick={() => updateCategory('')}>Tutti</button>
                <button onClick={() => updateCategory('console')}>Console</button>
                <button onClick={() => updateCategory('gioco')}>Giochi</button>
                <button onClick={() => updateCategory('accessorio')}>Accessori</button>
            </div>

            {/* Nuova sezione ordinamento */}
            <div className="sort-container">
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="sort-select"
                >
                    <option value="default">Ordina per</option>
                    <option value="price-asc">Prezzo: dal più basso</option>
                    <option value="price-desc">Prezzo: dal più alto</option>
                    <option value="name-asc">Nome: A-Z</option>
                    <option value="name-desc">Nome: Z-A</option>
                </select>
            </div>

            <div className='container-results'>
                {filteredAndSortedResults.map(result => (
                    <div key={result.id} className='card-result'>
                        <div>
                            <Link to={`/products/${result.id}`}>
                                <img src={result.image_url} alt={result.name} />
                            </Link>
                        </div>

                        <div className='search-card-result-info'>
                            <span className='search-card-name'>{result.name}</span>
                            <div className='prezzo'>{result.price}€</div>

                            {result.category_name === 'gioco' && result.supported_consoles && (
                                <div className='search-supported-console'>
                                    Compatibile con: <br />
                                    <span className='search-supported-console-list'>
                                        {JSON.parse(result.supported_consoles || '[]').join(', ')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}