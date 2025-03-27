import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../contexts/GlobalContext';

const CartPage = () => {

    // Estrae le variabili e funzioni dal contesto globale
    const { cart, removeFromCart, updateQuantity } = useContext(GlobalContext);

    const navigate = useNavigate();

    // Funzioni per aumentare e diminuire la quantità
    const handleIncrease = (product) => {
        updateQuantity(product.id, product.quantity + 1);
    };

    // Funzione per diminuire la quantità di un prodotto nel carrello
    const handleDecrease = (product) => {
        if (product.quantity > 1) {
            updateQuantity(product.id, product.quantity - 1);
        }
    };

    // Funzione per calcolare il totale del carrello
    const calculateTotal = () => {
        return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    // Funzione per tornare alla home (pagina principale)
    const handleContinueShopping = () => {
        // Naviga alla home
        navigate('/');
    };

    return (
        <div>
            <h1>Carrello</h1>
            {cart.length === 0 ? (
                <p>Il carrello è vuoto</p>
            ) : (
                <ul>
                    {/* Mappa i prodotti nel carrello */}
                    {cart.map(product => (
                        <li key={product.id}>
                            <div>
                                {/* Mostra il nome, la quantità e il prezzo del prodotto */}
                                {product.name} - {product.quantity} x {product.price}€
                            </div>
                            <div>
                                {/* Bottone per diminuire la quantità del prodotto */}
                                <button onClick={() => handleDecrease(product)}>Diminuisci</button>
                                {/* Bottone per aumentare la quantità del prodotto */}
                                <button onClick={() => handleIncrease(product)}>Aumenta</button>
                                {/* Bottone per rimuovere il prodotto dal carrello */}
                                <button onClick={() => removeFromCart(product.id)}>Rimuovi</button>
                            </div>
                            {/* Visualizza il prezzo totale per prodotto */}
                            <div>Totale prodotto: €{(product.price * product.quantity).toFixed(2)}</div>
                        </li>
                    ))}
                </ul>
            )}
            {/* Se ci sono prodotti nel carrello, mostra il totale e il bottone per il checkout */}
            {cart.length > 0 && (
                <div>
                    <h3>Totale carrello: €{calculateTotal().toFixed(2)}</h3>
                    {/* Bottone per procedere al checkout */}
                    <button onClick={() => alert('Procedi al checkout')}>Vai al checkout</button>
                </div>
            )}
            {/* Bottone per tornare alla home page e continuare gli acquisti */}
            <div className="mt-3">
                <button
                    onClick={handleContinueShopping}
                    className="btn btn-secondary">
                    Continua ad acquistare
                </button>
            </div>
        </div>
    );
};

export default CartPage;
