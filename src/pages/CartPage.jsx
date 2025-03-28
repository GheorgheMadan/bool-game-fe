import React from 'react';
import { useCart } from '../contexts/CartContext'; // Importiamo il contesto del carrello per gestire lo stato del carrello

const CartPage = () => {
    // Estraiamo le funzioni e lo stato del carrello dal contesto
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

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
        removeFromCart(productId);
    };

    // Funzione per calcolare il totale del carrello
    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };

    return (
        <div>
            <h2>Il tuo Carrello</h2>
            {cart.length === 0 ? ( // Se il carrello è vuoto, mostra un messaggio
                <p>Il carrello è vuoto.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((product) => ( // Mappa ogni prodotto nel carrello
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
                        <button>Procedi al checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
