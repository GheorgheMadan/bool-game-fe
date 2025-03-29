import { useContext, useState } from 'react';
import GlobalContextResults from '../contexts/GlobalContextResult';
import '../style/SearchResultsStyle.css';
import { Link } from 'react-router-dom';

export default function SearchResults() {
    const { results } = useContext(GlobalContextResults);
    const [selectedCategory, setSelectedCategory] = useState(''); // Stato per la categoria selezionata

    // Filtra i risultati in base alla categoria selezionata
    const filteredResults = selectedCategory
        ? results.filter(result => result.category_name === selectedCategory)
        : results;

    return (
        <div className='container-search-page'>
            <h2 className='search-title'>Risultati della ricerca</h2>

            {/* Sezione per i pulsanti di filtro */}
            <div className="filter-buttons">
                <button onClick={() => setSelectedCategory('')}>Tutti</button>
                <button onClick={() => setSelectedCategory('console')}>Console </button>
                <button onClick={() => setSelectedCategory('gioco')}>Giochi</button>
                <button onClick={() => setSelectedCategory('accessorio')}>Accessori</button>
            </div>

            <div className='container-results'>
                {filteredResults.map(result => {
                    console.log(result);
                    return (
                        <div key={result.id} className='card-result'>
                            <div>
                                <Link to={`/products/${result.id}`}>
                                    <img src={result.image_url} alt={result.name} />
                                </Link>
                            </div>

                            <div className='search-card-result-info'>
                                <span className='search-card-name'>{result.name}</span>
                                <div className='prezzo'>{result.price}€</div>

                                {/* Mostra il campo supported_consoles solo per i giochi */}
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
                    );
                })}
            </div>
        </div>
    );
}


