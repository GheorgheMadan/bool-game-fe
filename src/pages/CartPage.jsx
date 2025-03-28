import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, aggiornaTotale } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleIncrease = (productId, currentQuantity) => {
        // Aumenta la quantità
        updateQuantity(productId, currentQuantity + 1);
    };

    const handleDecrease = (productId, currentQuantity) => {
        if (currentQuantity > 1) {
            // Diminuisci la quantità solo se è maggiore di 1
            updateQuantity(productId, currentQuantity - 1);
        }
    };

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    const navigateToHome = () => {
        navigate('/'); // Naviga alla home
    };

    const navigateToCheckout = () => {
        navigate('/checkout'); // Naviga alla pagina di checkout
    };

    return (
        <div>
            <h1>Il tuo carrello</h1>
            {cart.length === 0 ? (
                <p>Il tuo carrello è vuoto.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((product) => (
                            <li key={product.id}>
                                <img src={product.image} alt={product.name} style={{ width: 100, height: 100 }} />
                                <div>
                                    <span>{product.name}</span>
                                    <span>{product.price}€</span>
                                    <div>
                                        <button onClick={() => handleDecrease(product.id, product.quantity)}>-</button>
                                        <span>{product.quantity}</span>
                                        <button onClick={() => handleIncrease(product.id, product.quantity)}>+</button>
                                    </div>
                                    <button onClick={() => handleRemove(product.id)}>Rimuovi</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <h2>Totale Carrello:  {aggiornaTotale()}€</h2>
                    </div>
                </div>
            )}

            <button onClick={navigateToHome}>Torna alla Home</button>
            <button onClick={navigateToCheckout}>Vai al Checkout</button>
        </div>
    );
};

export default CartPage;



// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import GlobalContext from '../contexts/GlobalContext';
// import { aggiornaQuantitaProdotto } from '../productService';

// const CartPage = () => {
//     // Estrae il carrello e le funzioni di gestione dal contesto globale
//     const { cart, removeFromCart, updateQuantity } = useContext(GlobalContext);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     // Aumenta la quantità di un prodotto nel carrello e aggiorna lo stock nel database
//     const handleIncrease = async (product) => {
//         try {
//             const newQuantity = product.quantity + 1;
//             const success = await aggiornaQuantitaProdotto(product.id, newQuantity, product.quantity);

//             if (success) {
//                 updateQuantity(product.id, newQuantity);
//                 setError(null);
//             } else {
//                 setError('Stock insufficiente.');
//             }
//         } catch {
//             setError('Errore durante l\'aggiornamento della quantità.');
//         }
//     };

//     // Diminuisce la quantità di un prodotto nel carrello e aggiorna lo stock nel database
//     const handleDecrease = async (product) => {
//         if (product.quantity > 1) {
//             try {
//                 const newQuantity = product.quantity - 1;
//                 const success = await aggiornaQuantitaProdotto(product.id, newQuantity, product.quantity);

//                 if (success) {
//                     updateQuantity(product.id, newQuantity);
//                     setError(null);
//                 } else {
//                     setError('Errore durante la diminuzione della quantità.');
//                 }
//             } catch {
//                 setError('Errore durante la diminuzione della quantità.');
//             }
//         }
//     };

//     // Rimuove completamente un prodotto dal carrello e aggiorna lo stock nel database
//     const handleRemoveFromCart = async (product) => {
//         try {
//             const success = await aggiornaQuantitaProdotto(product.id, 0, product.quantity);

//             if (success) {
//                 removeFromCart(product.id);
//                 setError(null);
//             } else {
//                 setError('Errore durante la rimozione del prodotto.');
//             }
//         } catch {
//             setError('Errore durante la rimozione del prodotto.');
//         }
//     };

//     // Calcola il totale del carrello sommando il prezzo di ogni prodotto moltiplicato per la quantità
//     const calculateTotal = () => {
//         return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
//     };

//     // Reindirizza l'utente alla home page per continuare gli acquisti
//     const handleContinueShopping = () => {
//         navigate('/');
//     };

//     return (
//         <div>
//             <h1>Carrello</h1>
//             {/* Mostra un messaggio di errore se presente */}
//             {error && <div className="error-message">{error}</div>}
//             {/* Se il carrello è vuoto, mostra un messaggio, altrimenti lista i prodotti */}
//             {cart.length === 0 ? (
//                 <p>Il carrello è vuoto</p>
//             ) : (
//                 <ul>
//                     {cart.map(product => (
//                         <li key={product.id}>
//                             <div>
//                                 {product.name} - {product.quantity} x {product.price}€
//                             </div>
//                             <div>
//                                 <button onClick={() => handleDecrease(product)}>Diminuisci</button>
//                                 <button onClick={() => handleIncrease(product)}>Aumenta</button>
//                                 <button onClick={() => handleRemoveFromCart(product)}>Rimuovi</button>
//                             </div>
//                             <div>Totale prodotto: €{(product.price * product.quantity).toFixed(2)}</div>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//             {/* Se il carrello ha prodotti, mostra il totale e il pulsante per il checkout */}
//             {cart.length > 0 && (
//                 <div>
//                     <h3>Totale carrello: €{calculateTotal().toFixed(2)}</h3>
//                     <button onClick={() => alert('Procedi al checkout')}>Vai al checkout</button>
//                 </div>
//             )}
//             {/* Pulsante per tornare alla home e continuare lo shopping */}
//             <div className="mt-3">
//                 <button onClick={handleContinueShopping} className="btn btn-secondary">
//                     Continua ad acquistare
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CartPage;
