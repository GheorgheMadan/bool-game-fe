import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

// Carica la chiave pubblica di Stripe (deve essere la tua chiave pubblica)
const stripePromise = loadStripe("pk_test_51R4oHoBsHKjTjOb27pKcmH1YbaCbCgSSrIWcwXGnYGMnBiGhcO1zJFfurj9MEEjKGmTYO6EK8AHnrEd4j7yhFfYw00KFdjDfmf");

const CheckoutForm = () => {
    // Carica il carrello dal contesto globale e prepara lo stato per il pagamento
    const { cart, clearCart } = useCart();
    const [loading, setLoading] = useState(false); // Stato per monitorare se il pagamento è in corso
    const [total, setTotal] = useState(0); // Totale da pagare
    const [clientSecret, setClientSecret] = useState(null); // Secret client per Stripe
    const [userDetails, setUserDetails] = useState({  // Dettagli dell'utente da inviare al backend
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        fiscalCode: ''
    });
    const stripe = useStripe();  // Hook per accedere a Stripe
    const elements = useElements();  // Hook per accedere agli elementi di Stripe
    const navigate = useNavigate();  // Hook per navigare tra le pagine

    // Calcola il totale ogni volta che cambia il carrello
    useEffect(() => {
        setTotal(cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2));
    }, [cart]);

    // Crea la sessione di pagamento con Stripe quando il carrello o i dettagli dell'utente cambiano
    useEffect(() => {
        if (cart.length > 0) {
            axios.post('http://localhost:3000/api/payment/create-checkout-session', { cartItems: cart, userDetails })
                .then(response => {
                    console.log(response.data);
                    if (response.data.clientSecret) {
                        setClientSecret(response.data.clientSecret);  // Memorizza il client secret ricevuto
                    } else {
                        console.error('Client Secret mancante');
                    }
                })
                .catch(error => {
                    console.error('Errore nella creazione della sessione:', error);
                });
        }
    }, [cart, userDetails]);  // Riprova ogni volta che cart o userDetails cambiano

    // Gestisce l'input dell'utente per aggiornare i dettagli del form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Funzione che viene chiamata quando si invia il modulo di pagamento
    const handlePayment = async (e) => {
        e.preventDefault(); // Impedisce il comportamento predefinito del form
        setLoading(true); // Imposta lo stato di caricamento

        // Verifica che Stripe sia stato caricato correttamente
        if (!stripe || !elements) {
            console.error('Stripe non è caricato');
            setLoading(false);
            return;
        }

        // Conferma il pagamento con Stripe
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Redirect alla home dopo il pagamento
                return_url: window.location.origin,
            },
            // Redirige solo se necessario
            redirect: "if_required",
        });

        // Verifica che il pagamento sia stato effettuato con successo
        if (!error && paymentIntent?.status === "succeeded") {
            clearCart();
            navigate('/');

            // Invia le informazioni al backend per inviare le email
            try {
                const response = await axios.post('http://localhost:3000/api/payment/send-order-emails', {
                    userDetails,       // Dati dell'utente
                    cartItems: cart,   // Dettagli degli articoli nel carrello
                    total: total,      // Totale dell'ordine
                });
                console.log('Email inviate con successo', response.data);
            } catch (error) {
                console.error('Errore nell\'invio delle email:', error.response || error);
            }
        } else {
            // Gestisce eventuali errori nel pagamento
            console.error('Errore durante il pagamento:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <h3>Totale: €{total}</h3>
            <form>
                <input type="text" name="firstName" value={userDetails.firstName} onChange={handleInputChange} placeholder="Nome" required />
                <input type="text" name="lastName" value={userDetails.lastName} onChange={handleInputChange} placeholder="Cognome" required />
                <input type="email" name="email" value={userDetails.email} onChange={handleInputChange} placeholder="Email" required />
                <input type="text" name="address" value={userDetails.address} onChange={handleInputChange} placeholder="Indirizzo" required />
                <input type="text" name="city" value={userDetails.city} onChange={handleInputChange} placeholder="Città" required />
                <input type="text" name="state" value={userDetails.state} onChange={handleInputChange} placeholder="Stato" required />
                <input type="text" name="fiscalCode" value={userDetails.fiscalCode} onChange={handleInputChange} placeholder="Codice Fiscale" required />
            </form>
            {clientSecret && (
                <form onSubmit={handlePayment}>
                    <PaymentElement />
                    <button type="submit" disabled={loading || !stripe || !elements}>
                        {loading ? 'Caricamento...' : 'Paga'}
                    </button>
                </form>
            )}
        </div>
    );
};

const CheckoutPage = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const { cart } = useCart();

    useEffect(() => {
        if (cart.length > 0) {
            axios.post('http://localhost:3000/api/payment/create-checkout-session', { cartItems: cart })
                .then(response => {
                    console.log(response.data);
                    if (response.data.clientSecret) {
                        setClientSecret(response.data.clientSecret);
                    } else {
                        console.error('Client Secret mancante');
                    }
                })
                .catch(error => {
                    console.error('Errore nella creazione della sessione:', error);
                });
        }
    }, [cart]);

    return (
        <>{clientSecret && <Elements stripe={stripePromise} options={{ clientSecret }}><CheckoutForm /></Elements>}</>
    );
};

export default CheckoutPage;



// import React, { useEffect, useState } from 'react';
// import { useCart } from '../contexts/CartContext';
// import axios from 'axios';
// import { loadStripe } from "@stripe/stripe-js";
// import { useNavigate } from 'react-router-dom';

// // Chiave pubblica Stripe
// const stripePromise = loadStripe("pk_test_51R4oHoBsHKjTjOb27pKcmH1YbaCbCgSSrIWcwXGnYGMnBiGhcO1zJFfurj9MEEjKGmTYO6EK8AHnrEd4j7yhFfYw00KFdjDfmf");

// const CheckoutPage = () => {
//     // Estraiamo il carrello e la funzione clearCart dal contesto
//     const { cart, clearCart } = useCart();
//     const [loading, setLoading] = useState(false);
//     const [total, setTotal] = useState(0);
//     const [paymentStatus, setPaymentStatus] = useState(null);

//     // Stato per gestire i dettagli dell'utente
//     const [userDetails, setUserDetails] = useState({
//         firstName: '',
//         lastName: '',
//         address: '',
//         city: '',
//         postalCode: '',
//         state: '',
//         email: '',
//         fiscalCode: '',
//     });
//     const navigate = useNavigate();

//     // Calcola il totale del carrello quando cambia
//     useEffect(() => {
//         const calculatedTotal = cart.reduce(
//             (total, product) => total + product.price * product.quantity, 0
//         );
//         setTotal(calculatedTotal.toFixed(2));
//         // Log del totale calcolato
//         console.log('Totale carrello:', calculatedTotal.toFixed(2));
//     }, [cart]);

//     // Funzione per gestire il pagamento
//     const handleCheckout = async () => {

//         setLoading(true);

//         // Controlla che tutti i campi siano compilati
//         for (let key in userDetails) {
//             if (!userDetails[key]) {
//                 alert(`Campo ${key} mancante`);
//                 setLoading(false);
//                 return;
//             }
//         }

//         try {
//             console.log('Avvio del pagamento...');

//             // Invia i dati al backend per creare la sessione di pagamento con Stripe
//             const { data } = await axios.post('http://localhost:3000/api/payment/create-checkout-session', {
//                 cartItems: cart,
//                 userDetails,
//             });
//             console.log('Sessione di pagamento creata:', data);

//             // Se la sessione è stata creata con successo, reindirizza alla pagina di pagamento Stripe
//             if (data.sessionId) {
//                 const stripe = await stripePromise;
//                 const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

//                 if (error) {
//                     console.error('Errore Stripe:', error);
//                     setLoading(false);
//                     setPaymentStatus('error');
//                 }
//             }
//         } catch (error) {
//             console.error('Errore durante il checkout:', error);
//             setLoading(false);
//             setPaymentStatus('error');
//         }
//     };

//     // Aggiorna lo stato dei campi di input quando l'utente digita
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserDetails({ ...userDetails, [name]: value });
//     };

//     // Funzione per ripristinare lo stock dopo il pagamento
//     const adjustStock = async () => {
//         try {
//             console.log('Ripristino dello stock...');
//             await axios.post('http://localhost:3000/api/stock/adjust', {
//                 cartItems: cart,
//             });
//             console.log('Stock ripristinato con successo');
//         } catch (error) {
//             console.error('Errore durante il ripristino dello stock:', error);
//         }
//     };

//     // Se il pagamento è andato a buon fine, svuota il carrello, ripristina lo stock e reindirizza
//     useEffect(() => {
//         if (paymentStatus === 'success') {
//             clearCart();  // Pulisce il carrello dopo il pagamento
//             adjustStock(); // Ripristina lo stock
//             navigate('/'); // Reindirizza alla home appena il pagamento è completato
//         }
//     }, [paymentStatus, clearCart, navigate]);

//     // Mostra un messaggio di caricamento durante il processo di pagamento
//     if (loading) return <div>Caricamento...</div>;

//     return (

//         <div>
//             <h1>Checkout</h1>

//             {paymentStatus === 'error' && (
//                 <div>
//                     <h2>Errore nel pagamento. Riprova.</h2>
//                 </div>
//             )}

//             {/* Sezione riepilogo carrello */}
//             <div>
//                 <h2>Carrello</h2>
//                 {cart.length === 0 ? (
//                     <p>Il carrello è vuoto.</p>
//                 ) : (
//                     <ul>
//                         {cart.map((product) => (
//                             <li key={product.id}>
//                                 <div>
//                                     <img src={product.image_url || '/default-image.jpg'} alt={product.name || 'Prodotto'} width="100" />
//                                     <h3>{product.name || 'Nome prodotto non disponibile'}</h3>
//                                     <p>Prezzo: €{product.price}</p>
//                                     <p>Quantità: {product.quantity}</p>
//                                     <p>Totale: €{(product.price * product.quantity).toFixed(2)}</p>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>

//             {/* Form dati utente e pulsante per procedere al pagamento */}
//             <div>
//                 <h3>Totale: €{total}</h3>
//                 {cart.length > 0 && !paymentStatus && (
//                     <form onSubmit={handleCheckout}>
//                         <h2>Inserisci i tuoi dati</h2>
//                         <input
//                             type="text"
//                             name="firstName"
//                             value={userDetails.firstName}
//                             onChange={handleInputChange}
//                             placeholder="Nome"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="lastName"
//                             value={userDetails.lastName}
//                             onChange={handleInputChange}
//                             placeholder="Cognome"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="address"
//                             value={userDetails.address}
//                             onChange={handleInputChange}
//                             placeholder="Indirizzo"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="city"
//                             value={userDetails.city}
//                             onChange={handleInputChange}
//                             placeholder="Città"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="postalCode"
//                             value={userDetails.postalCode}
//                             onChange={handleInputChange}
//                             placeholder="CAP"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="state"
//                             value={userDetails.state}
//                             onChange={handleInputChange}
//                             placeholder="Stato"
//                             required
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             value={userDetails.email}
//                             onChange={handleInputChange}
//                             placeholder="Email"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="fiscalCode"
//                             value={userDetails.fiscalCode}
//                             onChange={handleInputChange}
//                             placeholder="Codice Fiscale"
//                             required
//                         />
//                         <button type="submit" disabled={loading}>
//                             {loading ? 'Caricamento...' : 'Procedi al pagamento'}
//                         </button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CheckoutPage;
