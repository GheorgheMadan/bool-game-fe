import '../../style/HeaderStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import GlobalContextResults from '../../contexts/GlobalContextResult';

export default function SearchBar() {
    const { setResults } = useContext(GlobalContextResults)
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')

    const navigate = useNavigate()
    // funzione per aprire la search bar 
    function toggleSearch() {
        setIsOpen(!isOpen);
    }

    function search(e) {
        e.preventDefault()
        axios.get(`http://localhost:3000/api/products/search?name=${input}`)
            .then(response => {
                setResults(response.data)
                navigate('/search')
                setInput('')
                // console.log(response.data);

            })
            .catch(err => console.error(err))
        setInput('')
    }
    // funzione per ricavare i dati dell'input
    function handleChange(e) {
        const value = e.target.value
        setInput(value)
    }
    console.log(input);

    return (
        <div className='container-icons'>
            <div className={`container-search ${isOpen ? 'open' : ''}`}>
                <form onSubmit={search}>
                    <input
                        type="text"
                        name='text'
                        value={input}
                        onChange={handleChange}
                        placeholder='Cerca...' />
                </form>
                <button onClick={toggleSearch}>
                    <FontAwesomeIcon icon={faSearch} className='icon' />
                </button>
            </div>
            <div className='container-cart'>
                <NavLink to='/cart'>
                    <FontAwesomeIcon icon={faShoppingCart} className='icon' />
                </NavLink>
            </div>
        </div>

    )
}