import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import '../style/Cart.css';
import { Link } from 'react-router-dom';

const CartPage = () => {
    // Ottiene i dati del carrello e le funzioni di gestione dal contesto CartContext
    const { cart, increaseQuantity, decreaseQuantity, clearCart, errorMessages } = useCart();
    const navigate = useNavigate();

    // Gestisce l'aumento della quantità di un prodotto nel carrello
    const handleIncrease = (productId) => {
        increaseQuantity(productId);
    };

    // Gestisce la diminuzione della quantità di un prodotto nel carrello
    const handleDecrease = (productId) => {
        decreaseQuantity(productId);
    };

    // Rimuove un prodotto dal carrello
    const handleRemove = (productId) => {
        clearCart(productId);
    };

    // Calcola il subtotale del carrello (senza considerare la spedizione)
    const calculateSubTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };

    // Calcola il costo della spedizione in base al totale del carrello
    const calculateShippingCost = () => {
        const total = parseFloat(calculateSubTotal());
        // Spedizione gratuita se il totale è maggiore di 199,99€
        return total > 199.99 ? 0 : 9.99;
    };

    // Ottieni il costo di spedizione
    const shippingCost = calculateShippingCost();

    // Funzione per andare alla home page
    const goToHome = () => {
        navigate('/');
    };

    // Funzione per andare alla pagina di checkout, passando il carrello come stato
    const goToCheckout = () => {
        navigate('/checkout', { state: { cart } });
    };

    return (
        <div className="cart-container">
            <h2>Il tuo Carrello</h2>

            {cart.length === 0 ? (
                <p className='cart-empty'>😢 Il carrello è vuoto... perché non aggiungi qualcosa? <br />
                    <Link to={'/'} className="cart-link">🛒 Torna al negozio!</Link></p>
            ) : (
                <>
                    <div className="cart-content">
                        <ul className="cart-items">
                            {cart.map((product) => (
                                <li key={product.id} className="cart-item">
                                    <div className='cart-item-image'>
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                    <div className="cart-item-info">
                                        <h3>{product.name}</h3>
                                        <p>Prezzo: €{product.price}</p>
                                    </div>
                                    <div className="cart-buttons">
                                        <button onClick={() => handleDecrease(product.id)}>
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <p className="cart-quantity">{product.quantity}</p>
                                        <button onClick={() => handleIncrease(product.id)}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                        <button className="btn-remove" onClick={() => handleRemove(product.id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                    {/* Mostra il messaggio di errore se presente per il prodotto */}
                                    {errorMessages[product.id] && <div className="error-message-cart">{errorMessages[product.id]}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="cart-summary">
                            <div className="cart-total">
                                <div className="centered-price">Spedizione gratuita per ordini superiori a €200</div>
                                <h3>Sub totale: €{calculateSubTotal()}</h3>
                                <div className="centered-price">
                                    Costo spedizione: €{shippingCost.toFixed(2)} {shippingCost === 0 && " (gratis)"}
                                </div>
                                <h3 className='total-price'>Totale: €{calculateTotal(cart)}</h3>
                            </div>
                            <div className="cart-actions">
                                <button className="btn-checkout" onClick={goToCheckout}>
                                    Procedi al checkout
                                </button>
                                <button className="btn-home" onClick={goToHome}>
                                    Torna alla home
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export const calculateTotal = (cart) => {
    const calculateSubTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const calculateShippingCost = () => {
        const total = parseFloat(calculateSubTotal());
        return total > 199.99 ? 0 : 9.99;
    };

    return (parseFloat(calculateSubTotal()) + calculateShippingCost()).toFixed(2);
};

export default CartPage;
