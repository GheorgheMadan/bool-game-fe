import '../../style/HeaderStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { NavLink } from 'react-router';
import axios from 'axios';

const initialInput = {
    text: ''
}

export default function SearchBar() {
    const [searchResults, setSearchResults] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState(initialInput)

    // funzione per aprire la search bar 
    function toggleSearch() {
        setIsOpen(!isOpen);
    }

    function search(e) {
        e.preventDefault()
        axios.get(`http://localhost:3000/api/products/search?name=${input.text}`)
            .then(res => {
                setSearchResults(res.data)
            })
            .catch(err => console.error(err)
            )
    }
    // funzione per ricavare i dati dell'input
    function handleChange(e) {
        const value = e.target.value
        setInput({ text: value })
    }
    console.log(searchResults);

    return (
        <div className='container-icons'>
            <div className={`container-search ${isOpen ? 'open' : ''}`}>
                <form onSubmit={search}>
                    <input
                        type="text"
                        name='text'
                        value={input.text}
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