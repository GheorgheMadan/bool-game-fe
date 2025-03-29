
// import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import GlobalContextResults from '../contexts/GlobalContextResult';
import '../style/SearchResultsStyle.css'
import { Link } from 'react-router-dom';
export default function SearchResults() {
    const { results } = useContext(GlobalContextResults)
    console.log(results);

    return (
        <div className='container-search-page'>
            <h2>Risultati della ricerca</h2>
            <div className='container-results'>
                {results.map(result => {
                    return (
                        <div key={result.id} className='card-result'>
                            <div>
                                <Link to={`/products/${result.id}`}>
                                    <img src={result.image_url} alt={result.name} />
                                </Link>
                            </div>
                            <span>{result.name}</span>
                            <div className='prezzo'>{result.price}€</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}



