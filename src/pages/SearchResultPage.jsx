
// import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import GlobalContextResults from '../contexts/GlobalContextResult';
import '../style/SearchResultsStyle.css'
export default function SearchResults() {
    const { results } = useContext(GlobalContextResults)
    console.log(results);

    return (
        <div className='container-search-page'>
            <h2>Risultati della ricerca</h2>
            <div className='container'>
                {results.map(result => {
                    return (
                        <div key={result.id}>
                            <img src={result.image_url} alt={result.name} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}



