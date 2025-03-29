import React from 'react';
import { useCart } from '../contexts/CartContext'; // Importiamo il contesto del carrello per gestire lo stato del carrello
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    // Estraiamo le funzioni e lo stato del carrello dal contesto
    const { cart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

    const navigate = useNavigate();

    // Funzione per aumentare la quantità di un prodotto nel carrello
    const handleIncrease = (productId) => {
        increaseQuantity(productId);
    };

    // Funzione per diminuire la quantità di un prodotto nel carrello
    const handleDecrease = (productId) => {
        decreaseQuantity(productId);
    };

    // Funzione per rimuovere un prodotto dal carrello
    const handleRemove = (productId) => {
        clearCart(productId);
    };

    // Funzione per calcolare il totale del carrello
    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };

    // Funzione per andare alla home
    const goToHome = () => {
        navigate('/');
    };

    // Funzione per andare al checkout e passare il carrello
    const goToCheckout = () => {
        navigate('/checkout', { state: { cart } });
    };



    return (
        <div>
            <h2>Il tuo Carrello</h2>
            {cart.length === 0 ? ( // Se il carrello è vuoto, mostra un messaggio
                <p>Il carrello è vuoto.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((product) => (
                            <li key={product.id}>
                                <div>
                                    {/* Immagine del prodotto */}
                                    <img src={product.image_url} alt={product.name} width="100" />
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p>Prezzo: €{product.price}</p>
                                    <p>Quantità: {product.quantity}</p>

                                    {/* Bottone per aumentare la quantità */}
                                    <button onClick={() => handleIncrease(product.id)}>Aumenta quantità</button>

                                    {/* Bottone per diminuire la quantità */}
                                    <button onClick={() => handleDecrease(product.id)}>Diminuisci quantità</button>

                                    {/* Bottone per rimuovere il prodotto dal carrello */}
                                    <button onClick={() => handleRemove(product.id)}>Rimuovi dal carrello</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div>
                        {/* Mostriamo il totale del carrello */}
                        <h3>Totale: €{calculateTotal()}</h3>
                        {/* Bottone per procedere al checkout */}
                        <button onClick={goToCheckout}>Procedi al checkout</button>
                        {/* Bottone per tornare alla home */}
                        <button onClick={goToHome}>Torna alla home</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
