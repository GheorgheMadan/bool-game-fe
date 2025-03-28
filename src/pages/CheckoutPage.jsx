import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext'; // Importiamo il contesto del carrello
import { useNavigate } from 'react-router-dom'; // Per navigare alle pagine

const CheckoutPage = () => {
    // Estraiamo il carrello dal contesto
    const { cart, clearCart } = useCart();
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    // Calcola il totale del carrello
    useEffect(() => {
        const calculatedTotal = cart.reduce(
            (total, product) => total + product.price * product.quantity, 0
        );
        setTotal(calculatedTotal.toFixed(2)); // Impostiamo il totale con 2 decimali
    }, [cart]);

    // Funzione per gestire il pagamento (simulato)
    const handleCheckout = async () => {
        try {
            // Simuliamo una chiamata di pagamento (potresti voler usare Stripe qui)
            console.log('Processando il pagamento...');

            // Svuotiamo il carrello dopo il pagamento
            await clearCart();

            // Simuliamo una navigazione alla pagina di conferma
            navigate('/order-confirmation');
        } catch (error) {
            console.error('Errore nel pagamento:', error);
        }
    };

    return (
        <div>
            <h2>Dettagli Ordine</h2>
            {cart.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((product) => (
                            <li key={product.id}>
                                <div>
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        width="100"
                                    />
                                    <h3>{product.name}</h3>
                                    <p>Prezzo: €{product.price}</p>
                                    <p>Quantità: {product.quantity}</p>
                                    <p>Totale: €{(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div>
                        <h3>Totale: €{total}</h3>

                        {/* Bottone per procedere al pagamento */}
                        <button onClick={handleCheckout}>Procedi al pagamento</button>
                    </div>
                </div>
            )}

            {/* Bottone per tornare alla home */}
            <button onClick={() => navigate('/')}>Torna alla Home</button>
        </div>
    );
};

export default CheckoutPage;



// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import axios from 'axios';

// // Carica Stripe con la chiave pubblica
// const stripePromise = loadStripe('pk_test_51R4oHoBsHKjTjOb27pKcmH1YbaCbCgSSrIWcwXGnYGMnBiGhcO1zJFfurj9MEEjKGmTYO6EK8AHnrEd4j7yhFfYw00KFdjDfmf');

// const CheckoutPage = () => {
//     const [cartItems, setCartItems] = useState([]); // Stato per il carrello
//     const [clientSecret, setClientSecret] = useState(''); // Stato per il client secret
//     const [isProcessing, setIsProcessing] = useState(false); // Stato per il processo di pagamento
//     const [userInfo, setUserInfo] = useState({ name: '', email: '', address: '' }); // Stato per i dettagli dell'utente

//     const stripe = useStripe();
//     const elements = useElements();

//     // Recupera i dettagli del carrello dal localStorage e calcola il totale
//     useEffect(() => {
//         const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
//         setCartItems(savedCart);

//         const total = savedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         const shippingCost = 10; // Puoi calcolare o impostare una spedizione fissa

//         // Recupera il client secret per il pagamento
//         const fetchClientSecret = async () => {
//             try {
//                 const { data } = await axios.post('/api/payment/process', { order_id: savedCart }); // Cambia il parametro in base alla logica
//                 setClientSecret(data.clientSecret);
//             } catch (error) {
//                 console.error("Errore nel recuperare il client secret:", error);
//             }
//         };

//         if (savedCart.length > 0) {
//             fetchClientSecret();
//         }
//     }, []);

//     // Funzione per inviare il pagamento
//     const handlePaymentSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         setIsProcessing(true);

//         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//             },
//             receipt_email: userInfo.email, // Invia l'email dell'utente per la ricevuta
//         });

//         if (error) {
//             console.error('Pagamento fallito:', error);
//             alert('Pagamento fallito, riprova');
//         } else if (paymentIntent.status === 'succeeded') {
//             alert('Pagamento completato con successo!');
//             // Qui puoi inviare una conferma via email, se necessario
//         }

//         setIsProcessing(false);
//     };

//     // Funzione per gestire il cambiamento dei dati dell'utente
//     const handleUserInfoChange = (event) => {
//         setUserInfo({
//             ...userInfo,
//             [event.target.name]: event.target.value,
//         });
//     };

//     const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     const shippingCost = 10; // o calcolalo in base alla logica della tua app
//     const orderTotal = totalAmount + shippingCost;

//     if (!clientSecret) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Riepilogo Ordine</h2>
//             <ul>
//                 {cartItems.map((product, index) => (
//                     <li key={index}>
//                         {product.name} - {product.quantity} x {product.price}€
//                     </li>
//                 ))}
//             </ul>
//             <div>
//                 <h3>Totale: €{orderTotal}</h3>
//                 <h3>Spese di spedizione: €{shippingCost}</h3>
//             </div>

//             <h3>Dettagli di pagamento</h3>
//             <form onSubmit={handlePaymentSubmit}>
//                 <div>
//                     <label htmlFor="name">Nome</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={userInfo.name}
//                         onChange={handleUserInfoChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={userInfo.email}
//                         onChange={handleUserInfoChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="address">Indirizzo di spedizione</label>
//                     <input
//                         type="text"
//                         id="address"
//                         name="address"
//                         value={userInfo.address}
//                         onChange={handleUserInfoChange}
//                         required
//                     />
//                 </div>

//                 <CardElement />

//                 <button type="submit" disabled={!stripe || isProcessing}>
//                     {isProcessing ? 'Elaborazione...' : 'Paga'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// // Usa il provider per Stripe.js
// import { Elements } from '@stripe/react-stripe-js';

// const CheckoutPageWithStripe = () => (
//     <Elements stripe={stripePromise}>
//         <CheckoutPage />
//     </Elements>
// );

// export default CheckoutPageWithStripe;
