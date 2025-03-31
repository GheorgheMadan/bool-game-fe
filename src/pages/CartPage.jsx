import React from 'react';
import { useCart } from '../contexts/CartContext'; // Importiamo il contesto del carrello per gestire lo stato del carrello
import { Navigate, useNavigate } from 'react-router-dom';
import '../style/Cart.css'; // Importiamo lo stile per la pagina del carrello
import { Link } from 'react-router-dom'; // Importiamo il componente Link per la navigazione

const CartPage = () => {
    // Estraiamo le funzioni e lo stato del carrello dal contesto
    const { cart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
    console.log('prodotto nel carrello', cart);

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
    const calculateSubTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };

    // Calcola il costo di spedizione basato sul subtotale
    const calculateShippingCost = () => {
        const total = parseFloat(calculateSubTotal());
        return total > 199.99 ? 0 : 9.99;
    };

    const shippingCost = calculateShippingCost();

    // Funzione per calcolare il totale complessivo (subtotale + spedizione)
    const calculateTotal = () => {
        return (parseFloat(calculateSubTotal()) + shippingCost).toFixed(2);
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
        <div className="cart-container">
            <h2>Il tuo Carrello</h2>
            {cart.length === 0 ? ( // Se il carrello è vuoto, mostra un messaggio
                <p className='cart-empty'>😢 Il carrello è vuoto... perché non aggiungi qualcosa? <br /> <Link to={'/'} className="cart-link">🛒 Torna al negozio!</Link></p>
            ) : (
                <>
                    <div className="cart-content">
                        <ul className="cart-items">
                            {cart.map((product) => (
                                <li key={product.id} className="cart-item">

                                    <div className='cart-item-image'>
                                        <img src={product.image} alt={product.name} width="100" />
                                    </div>


                                    <div className="cart-item-info">
                                        <h3>{product.name}</h3>
                                        <p>{product.description}</p>
                                        <p>Prezzo: €{product.price}</p>
                                    </div>

                                    <div className="cart-buttons">
                                        {/* Bottone per aumentare la quantità */}
                                        <button onClick={() => handleIncrease(product.id)}> <i className="fas fa-plus"></i>
                                        </button>
                                        <p className="cart-quantity">{product.quantity}</p>

                                        {/* Bottone per diminuire la quantità */}
                                        <button onClick={() => handleDecrease(product.id)}> <i className="fas fa-minus"></i>
                                        </button>

                                        {/* Bottone per rimuovere il prodotto dal carrello */}
                                        <button className="btn-remove" onClick={() => handleRemove(product.id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>

                                </li>
                            ))}
                        </ul>
                        <div className="cart-summary">
                            <div className="cart-total">
                                {/* Mostriamo il totale del carrello */}
                                <div className="centered-price">Spedizione gratuita per ordini superiori a €200</div>

                                <h3>Sub totale: €{calculateSubTotal()}</h3>

                                <div className="centered-price">Costo spedizione: €{shippingCost.toFixed(2)}
                                    {shippingCost === 0 && " (gratis)"}
                                </div>
                                <h3 className='total-price'>Totale: €{calculateTotal()}</h3>
                            </div>

                            <div className="cart-actions">
                                {/* Bottone per procedere al checkout */}
                                <button className="btn-checkout" onClick={goToCheckout}>
                                    Procedi al checkout</button>
                                {/* Bottone per tornare alla home */}
                                <button className="btn-home" onClick={goToHome}>Torna alla home</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
